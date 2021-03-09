<?php

namespace App\Providers;

use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\ServiceProvider;

class AltrpBroadcastServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Broadcast::routes(["middleware"=>["auth"]]);

        $channelsFile = base_path('routes/AltrpChannels.php');

        if (!file_exists($channelsFile)) {
            file_put_contents($channelsFile, '<?php'
                . PHP_EOL . PHP_EOL . '/**' . PHP_EOL . '* Custom channels'
                . PHP_EOL . '*/' . PHP_EOL);
        }
        require $channelsFile;
    }
}
