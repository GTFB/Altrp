<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Broadcaster
    |--------------------------------------------------------------------------
    |
    | This option controls the default broadcaster that will be used by the
    | framework when an event needs to be broadcast. You may set this to
    | any of the connections defined in the "connections" array below.
    |
    | Supported: "pusher", "redis", "log", "null"
    |
    */

    'default' => env('BROADCAST_DRIVER', 'null'),

    /*
    |--------------------------------------------------------------------------
    | Broadcast Connections
    |--------------------------------------------------------------------------
    |
    | Here you may define all of the broadcast connections that will be used
    | to broadcast events to other systems or over websockets. Samples of
    | each available type of connection are provided inside this array.
    |
    */

    'connections' => [

        'pusher' => [
            'driver' => 'pusher',
            'key' => env('ALTRP_SETTING_PUSHER_APP_KEY', '12345678'),
            'secret' => env('PUSHER_APP_SECRET', '12345678'),
            'app_id' => env('PUSHER_APP_ID', '12345678'),
            'options' => [
                'cluster' => env('PUSHER_APP_CLUSTER', 'mt1'),
                // 'useTLS' => true,
                // 'encrypted' => true,
                'host' => env('ALTRP_SETTING_PUSHER_HOST', '127.0.0.1'),
                'port' => env('ALTRP_SETTING_WEBSOCKETS_PORT', 6001),
                'scheme' => 'http'
            ],
        ],

        'redis' => [
            'driver' => 'redis',
            'connection' => 'default',
        ],

        'log' => [
            'driver' => 'log',
        ],

        'null' => [
            'driver' => 'null',
        ],

    ],

];
