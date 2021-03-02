<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class WriteServiceProvider extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'provider:write
                            {classname : Service provider class name.}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Write provider class to app.php config file.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $spClassName = $this->argument('classname');
        $spClassName = str_replace('/', '\\', $spClassName);
        $configContent = $this->getConfigFileContent();
        foreach ($configContent as $line => $content) {
            if (Str::contains($content, "'providers' => [")) {
                $start = $line;
                $begin = false;
                $providerExist = false;
                for ($i = $start; true; $i++) {
                    if (Str::contains($configContent[$i], $spClassName)
                        && !Str::contains($configContent[$i], '//')) {
                        $providerExist = true;
                    }
                    if (Str::contains($configContent[$i], '],')) {
                        $begin = $i;
                        break;
                    }
                }
                if ($begin && !$providerExist) {
                    array_splice($configContent, $begin, 0, '        ' . $spClassName . '::class,');
                    File::put($this->getConfigFile(), implode(PHP_EOL, $configContent));
                    $this->info('Service provider ' . $spClassName . ' written!');
                } else {
                    $this->info('Service provider class already exists in app.php file!');
                }
                break;
            }
        }
    }

    /**
     * Get config file content
     * @return array|false
     */
    protected function getConfigFileContent()
    {
        return file($this->getConfigFile(), 2);
    }

    /**
     * Get config file path
     * @return string
     */
    protected function getConfigFile()
    {
        return config_path('app.php');
    }
}
