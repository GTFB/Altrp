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
        return is_array($this->start_config) && isset($this->start_config['bot_token']) ? $this->start_config['bot_token'] : "";
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
		    \$start_config = json_decode(\$robot->start_config, true);
		    \$bot_token = \$start_config['bot_token'];
		    \$chart = json_decode(\$robot->chart, true);
		    \$edges = array_column(\$chart, 'source', 'target');
		    \$chart_ids = array_column(\$chart, 'type', 'id');

		    \$user_id = null;
				\$telegram_chat_id = null;
				\$target_node = null;

				//Bot Start
				if ( isset(\$data['message']) && \$data['message']['text'] == '/start') {
				  if (\$data['message']['chat']['type'] == 'private') {

				    \$user = \$robot->getUserOnStartTelegramBot(\$data['message']['chat']['username'], \$data['message']['chat']['first_name']);

				    \$user_id = \$user->id;
				    
				  }

				  \$telegram_chat_id = \$data['message']['chat']['id'];
				  \$chart_id = array_search('start', \$chart_ids);
				  \$chat = \$robot->createTelegramChat(\$telegram_chat_id, \$chart_id, \$user_id);

				}

			  //Search target node if buttons
		    if ( isset(\$data['callback_query']) && isset(\$data['callback_query']['from']['id'])) {

		      \$telegram_chat_id = \$data['callback_query']['from']['id'];

		      \$button_value = \$data['callback_query']['data'];//node shortcode

		      foreach (\$chart as \$key => \$value) {

		        if (isset(\$value['data']) && isset(\$value['data']['props']['nodeData']['data']) && \$value['data']['props']['nodeData']['data']['shortcode'] == \$button_value) {

		          \$target_node = \$value;
		          break;
		        }
		      }

		      \$chat = \$robot->getTelegramChat(\$telegram_chat_id);

		    } else {

		      //Search target node if start or not buttons
		      \$current_chart_id = \$chat->chart_id;
		      \$target_id = array_search(\$current_chart_id, \$edges);
		      \$node_key = array_search(\$target_id, array_column(\$chart, 'id'));
		      \$target_node = \$chart[\$node_key];

		    }

		      //Prepare message
			    if (!isset(\$target_node['data']['props']['nodeData']['data'])) {
			      return;
			    }

			    \$content = \$target_node['data']['props']['nodeData']['data']['content'];
			    \$message = '';
			    \$buttons = [];
			    foreach (\$content as \$value) {

			      if (\$value['type'] == 'content') {
			        \$message .= \$value['data']['text'] . ' ';
			      }
			      if (\$value['type'] == 'link') {
			        \$message .= '<a href=\"'.\$value['data']['url'].'\">'.\$value['data']['text'].'</a> ';
			      }
			      if (\$value['type'] == 'button' && \$value['data']['text'] && \$value['data']['shortcode'] ) {
			        \$buttons[] = [
			            'text' => \$value['data']['text'],
			            'callback_data' => \$value['data']['shortcode'],
			        ];
			      }
			      if (\$value['type'] == 'document') {
			        \$document = \$value['data']['url'];
			        \$filename = \$value['data']['text'];
			      }

			    }

			    //Send message
			    if (!empty(\$buttons)) {
			      \$reply_markup['inline_keyboard'] = [\$buttons];
			      \$content = \$this->telegram->sendButtons(\$bot_token, \$telegram_chat_id, \$message, \$reply_markup);
			    } else if(\$document) {
			      \$content = \$this->telegram->sendPhoto(\$bot_token, \$telegram_chat_id, \$document, \$filename);
			    } else {
			      \$content = \$this->telegram->sendMessage(\$bot_token, \$telegram_chat_id, \$message);
			    }

			    //Update chat state
			    \$chat->chart_id = \$target_node['id'];
			    \$chat->save();

			    \$result = json_decode(\$content->getBody()->getContents(), true);
			    return \$result;
    }";

   //  $content .= "\tpublic function " . $this->getMethodName() . "( ApiRequest \$request ){

	  //   \$data = \$request->all();
	  //   \$robot = Robot::find(".$this->id.");
	  //   \$start_config = json_decode(\$robot->start_config, true);
	  //   \$bot_token = \$start_config['bot_token'];
	  //   \$chart = json_decode(\$robot->chart, true);
	  //   \$edges = array_column(\$chart, 'source', 'target');
	  //   \$chart_ids = array_column(\$chart, 'type', 'id');

	    // \$user_id = null;
	    // \$telegram_chat_id = null;
	    // \$target_node = null;

	    // //Bot Start
	    // if ( isset(\$data['message']) && \$data['message']['text'] == '/start') {
	    //   if (\$data['message']['chat']['type'] == 'private') {

	    //     \$user = \$robot->getUserOnStartTelegramBot(\$data['message']['chat']['username'], \$data['message']['chat']['first_name']);

	    //     \$user_id = \$user->id;
	        
	    //   }

	    //   \$telegram_chat_id = \$data['message']['chat']['id'];
	    //   \$chart_id = array_search('start', \$chart_ids);
	    //   \$chat = \$robot->createTelegramChat(\$telegram_chat_id, \$chart_id, \$user_id);
	  
	    // }

	    //Search target node if buttons
	    // if ( isset(\$data['callback_query']) && isset(\$data['callback_query']['from']['id'])) {

	    //   \$telegram_chat_id = \$data['callback_query']['from']['id'];

	    //   \$button_value = \$data['callback_query']['data'];//node shortcode

	    //   foreach (\$chart as \$key => \$value) {

	    //     if (isset(\$value['data']) && isset(\$value['data']['props']['nodeData']['data']) && \$value['data']['props']['nodeData']['data']['shortcode'] == \$button_value) {

	    //       \$target_node = \$value;
	    //       break;
	    //     }
	    //   }

	    //   \$chat = \$robot->getTelegramChat(\$telegram_chat_id);

	    // } else {

	    //   //Search target node if start or not buttons
	    //   \$current_chart_id = \$chat->chart_id;
	    //   \$target_id = array_search(\$current_chart_id, \$edges);
	    //   \$node_key = array_search(\$target_id, array_column(\$chart, 'id'));
	    //   \$target_node = \$chart[\$node_key];

	    // }

	    //Prepare message
	    // if (!isset(\$target_node['data']['props']['nodeData']['data'])) {
	    //   return;
	    // }

	    // \$content = \$target_node['data']['props']['nodeData']['data']['content'];
	    // \$message = '';
	    // \$buttons = [];
	    // foreach (\$content as \$value) {

	    //   if (\$value['type'] == 'content') {
	    //     \$message .= \$value['data']['text'] . ' ';
	    //   }
	    //   if (\$value['type'] == 'link') {
	    //     \$message .= '<a href=\"'.\$value['data']['url'].'\">'.\$value['data']['text'].'</a> ';
	    //   }
	    //   if (\$value['type'] == 'button' && \$value['data']['text'] && \$value['data']['shortcode'] ) {
	    //     \$buttons[] = [
	    //         'text' => \$value['data']['text'],
	    //         'callback_data' => \$value['data']['shortcode'],
	    //     ];
	    //   }

	    // }

	    //Send message
	    // if (!empty(\$buttons)) {
	    //   \$reply_markup['inline_keyboard'] = [\$buttons];
	    //   \$content = \$this->telegram->sendButtons(\$bot_token, \$telegram_chat_id, \$message, \$reply_markup);
	    // } else {
	    //   \$content = \$this->telegram->sendMessage(\$bot_token, \$telegram_chat_id, \$message);
	    // }

	    // //Update chat state
	    // \$chat->chart_id = \$target_node['id'];
	    // \$chat->save();

	    // \$result = json_decode(\$content->getBody()->getContents(), true);
	    // return \$result;
  	// }";



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
  public function createTelegramChat($telegram_chat_id, $chart_id, $user_id = null)
  {
    
  	$chat = Chat::where('telegram_chat_id', $telegram_chat_id)
            ->where('robot_id', $this->id)
            ->when($user_id, function ($query, $user_id) {
                return $query->where('user_id', $user_id);
            })
            ->first();

    if (!$chat) {
      $chat = new Chat([
        'telegram_chat_id' => $telegram_chat_id,
        'robot_id' => $this->id,
        'user_id' => $user_id,
        //'chart_id' => $chart_id
      ]);
    }
    $chat->chart_id = $chart_id;
    $chat->save();
    return $chat;

  }


  /**
   * @return Object
   */
  public function getTelegramChat($telegram_chat_id, $user_id = null)
  {
    
  	return Chat::where('telegram_chat_id', $telegram_chat_id)
            ->where('robot_id', $this->id)
            ->when($user_id, function ($query, $user_id) {
                return $query->where('user_id', $user_id);
            })
            ->first();

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
