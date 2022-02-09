<?php


namespace App\Altrp;

use App\User;
use App\Chat;
use App\CategoryObject;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;

class Robot extends Model
{
    protected $table = 'altrp_robots';

    protected $fillable = [
        'name',
        'title',
        'model_id',
        'user_id',
        'start_condition',
        'start_config',
        'enabled',
        'chart',
        'guid',
        'is_active'
    ];

    protected $with = ['sources'];

    public function altrp_model()
    {
        return $this->belongsTo(\App\Altrp\Model::class, 'model_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function sources()
    {
        return $this->belongsToMany(Source::class, 'altrp_robot_source')->withPivot(['parameters']);
    }

    public function categories()
    {
        return $this->hasMany(CategoryObject::class, 'object_guid', 'guid');
    }
  
    public function categoryOptions()
    {
        return CategoryObject::select('altrp_categories.guid as value', 'altrp_categories.title as label')->leftJoin('altrp_categories', 'altrp_categories.guid', '=', 'altrp_category_objects.category_guid')
            ->where('altrp_category_objects.object_guid', $this->guid)->get();
    }


    public function getTelegramBotToken()
    {
        return json_decode($this->start_config, true)['bot_token'];
    }


    /**
   * @return string
   */
  public function getWebhookContent()
  {
    $content = "";
    $content .= "\tpublic function " . $this->getMethodName() . "( ApiRequest \$request ){

	      \$data = \$request->all();
	      \$robot = Robot::find(".$this->id.");
	  	  \$bot_token = \$robot->getTelegramBotToken();
		    \$chart = \$robot->getChartAsArray();

		    \$chat_id = null;
		    \$current_node_id = null;

		    //Start Bot
		    if ( isset(\$data['message']) && \$data['message']['text'] == '/start') {
		      if (\$data['message']['chat']['type'] == 'private') {

		        \$user = \$robot->getUserOnStartTelegramBot(\$data['message']['chat']['username'], \$data['message']['chat']['first_name']);
		        \$user_id = \$user->id;
		        
		      }

		      \$chat_id = \$data['message']['chat']['id'];
		      \$current_node_id = (string)array_search('start', \$robot->getNodeIdTypes());
		      \$chat = \$robot->getTelegramChat(\$chat_id, \$current_node_id, \$user_id);

		    }

		    //Call node button
		    if ( isset(\$data['callback_query']) && isset(\$data['callback_query']['from']['id'])) {

		      \$chat_id = \$data['callback_query']['from']['id'];
		      \$button_value = \$data['callback_query']['data'];//node shortcode

		      foreach (\$chart as \$node) {
		        if (isset(\$node['data']) && isset(\$node['data']['props']['nodeData']['data']) && \$node['data']['props']['nodeData']['data']['shortcode'] == \$button_value) {

		          \$current_node_id = \$value['id'];
		          break;
		        }
		      }

		      \$chat = \$robot->getTelegramChat(\$chat_id, \$current_node_id);
		    } 

		    if (!\$chat_id || !\$current_node_id) {
		      return;
		    }

		    \$following_nodes = \$robot->getFollowingNodes((string)\$current_node_id);

		    //Sending messages
		    foreach (\$following_nodes as \$node) {

		      \$node_key = array_search(\$node, array_column(\$chart, 'id'));

		      \$current_node = \$chart[\$node_key];

		      if (!isset(\$current_node['data']['props']['nodeData']['data'])) {
		        continue;
		      }

		      \$message = '';
		      \$buttons = [];
		      \$document = null;

		      \$node_content = \$current_node['data']['props']['nodeData']['data']['content'];
		      foreach (\$node_content as \$content) {

		        if (\$content['type'] == 'content') {
		          \$message .= \$content['data']['text'] . ' ';
		        }
		        if (\$value['type'] == 'link') {
			        \$message .= '<a href=\"'.\$value['data']['url'].'\">'.\$value['data']['text'].'</a> ';
			      }
		        if (\$content['type'] == 'button' && \$content['data']['text'] && \$content['data']['shortcode'] ) {
		          \$buttons[] = [
		              'text' => \$content['data']['text'],
		              'callback_data' => \$content['data']['shortcode'],
		          ];
		        }
		        if (\$content['type'] == 'document') {
		          \$document = \$content['data']['url'];
		          \$filename = \$content['data']['text'];
		        }

		      }

		      //Send message
		      if (!empty(\$buttons)) {
		        \$reply_markup['inline_keyboard'] = [\$buttons];
		        \$res = \$this->telegram->sendButtons(\$bot_token, \$chat_id, \$message, \$reply_markup);
		      } else if(\$document) {
		        \$res = \$this->telegram->sendPhoto(\$bot_token, \$chat_id, \$document, \$filename);
		      } else {
		        \$res = \$this->telegram->sendMessage(\$bot_token, \$chat_id, \$message);
		      }

		    }

		    //Update chat state
		    \$chat->node_id = \$current_node['id'];
		    \$chat->save();

		    \$result = json_decode(\$res->getBody()->getContents(), true);
		    return \$result;
    }";

    return $content;
  }


  /**
   * @return Object
   */
  public function getUserOnStartTelegramBot($telegram_user_id, $first_name)
  {
    
  	$user = User::where('telegram_user_id', $telegram_user_id)->first();
    if (!$user) {
      $user = new User([
        'name' => $first_name,
        'password' => Hash::make( base_convert(rand(), 10, 36) ),
      ]);
      $user->telegram_user_id = $telegram_user_id;
      $user->save();
    }
    return $user;

  }

  /**
   * @return Object
   */
  public function getTelegramChat($chat_id, $node_id = null, $user_id = null)
  {
    
  	$chat = Chat::where('chat_id', $chat_id)
            ->where('robot_id', $this->id)
            ->when($user_id, function ($query, $user_id) {
                return $query->where('user_id', $user_id);
            })->first();

    if (!$chat) {
      $chat = new Chat([
        'chat_id' => $chat_id,
        'robot_id' => $this->id,
        'user_id' => $user_id,
        'node_id' => $node_id,
      ]);
      $chat->save();
    }
    if ($chat && $node_id) {
    	$chat->node_id = $node_id;
    	$chat->save();
    }
    
    return $chat;
  }

  public function getChartAsArray()
  {
    return json_decode($this->chart, true);
  }

  // public function getBotToken()
  // {
  //   return json_decode($this->start_config, true)['bot_token'];
  // }

  public function getTargetSourceEdges()
  {
	  	return array_column($this->getChartAsArray(), 'source', 'target');
  }

  public function getNodeIdTypes()
  {
	  return array_column($this->getChartAsArray(), 'type', 'id');
  }

  /**
   * @return Array
   */
  public function getFollowingNodes($current_node_id)
  {
	  
  	$target_source_edges = $this->getTargetSourceEdges();
	  $following_nodes = [(string)$current_node_id];
	  $chart = $this->getChartAsArray();

    foreach ($target_source_edges as $target_node => $source_node) {

        $last_node_id = $following_nodes[array_key_last($following_nodes)];

        $target_node_id = array_search($last_node_id, $target_source_edges);
        if ($target_node_id) {
          $following_nodes[] = (string)$target_node_id;
        }
    }

    $count_targets = array_count_values($target_source_edges);
    
    $arr = [];
    foreach ($following_nodes as $node_id) {
 
      $arr[] = $node_id;

      //button check
      $node_key = array_search($node_id, array_column($chart, 'id'));

      if (isset($chart[$node_key]['data']['props']['nodeData']['data'])) {
        $node_content = array_column($chart[$node_key]['data']['props']['nodeData']['data']['content'], 'type');
        $key_button = array_search("button", $node_content);
        if (gettype($key_button) == "integer") {
          break;
        }
      }

      //branching check
      if ($count_targets[(string)$node_id] > 1) {
        break;
      }

    }

    return $arr;

  }

  /**
   * @return string
   */
  private function getMethodName(): string
  {
    return $this->getName();
  }

  /**
   * @return string
   */
  private function getName(): string
  {
    return $this->name;
  }
}
