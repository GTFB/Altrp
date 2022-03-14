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
        //return json_decode($this->start_config, true)['bot_token'];
        return $this->start_config['bot_token'];
    }


    /**
   * @return string
   */
  public function getWebhookContent()
  {

    $content = "";

    // if (isset(\$data) && isset(\$data['message']) && isset(\$data['message']['text']) && \$data['message']['text'] == '/start') {
    //   \$chatData = \$data['message'];
    // }
    $content .= "\tpublic function " . $this->getMethodName() . "( ApiRequest \$request ){

      \$data = \$request->all();

      \$chatData = null;

      if (isset(\$data) && isset(\$data['message']) && isset(\$data['message']['text'])) {
        \$chatData = \$data['message'];
      }

      if (isset(\$data) && isset(\$data['callback_query'])) {
        \$chatData = \$data['callback_query'];
      }

      \$robotsService = new RobotsService(new RobotsRepository());
    
      \$currentEnvironment = CurrentEnvironment::getInstance();

      \$model = Model::where('name', '" . $this->altrp_model->name . "')->first();
      \$source = \$model->altrp_sources->where('type', 'add')->first();
      \$columns = explode(',',\$model->table->columns->implode('name',','));

      \$modelName = new " . $this->altrp_model->name . "();

      \$data = [
          'model' => \$model,
          'source' => \$source,
          'columns' => \$columns,
          'record' => \$modelName,
          'action_type' => 'telegram_bot'
      ];

      \$robots = \$robotsService->getCurrentModelRobots(\$model);
      \$this->dispatch(new RunRobotsJob(
          \$robots,
          \$robotsService,
          \$data,
          'telegram_bot',
          \$currentEnvironment,
          \$chatData
      ));
      
      return response()->json(\"['success' => true]\", 200, [], JSON_UNESCAPED_UNICODE);

    }";

    return $content;
  }


  /**
   * @return Object
   */
  public function getUser($telegram_user_id, $first_name)
  {
  	$user = User::where('telegram_user_id', $telegram_user_id)->first();
    if (!$user) {
      $user = new User([
        'name' => $first_name,
        'password' => Hash::make( base_convert(rand(), 10, 36) ),
        'telegram_user_id' => $telegram_user_id,
      ]);
      $user->save();
    }
    return $user;
  }

  /**
   * @return Object
   */
  public function getChat($chat_id, $node_id = null, $user_id = null)
  {
    $chat = Chat::where('chat_id', $chat_id)->where('robot_id', $this->id)->first();
    if (!$chat) {
      $chat = new Chat([
        'chat_id' => $chat_id,
        'robot_id' => $this->id,
        'user_id' => $user_id,
      ]);
      $chat->save();
    }
    $node_id ? $chat->node_id = $node_id : true;
    $user_id ? $chat->user_id = $user_id : true;
    $chat->save();
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
