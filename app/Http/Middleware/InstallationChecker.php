<?php

namespace App\Http\Middleware;

use App\Helpers\Classes\Curl;
use Closure;
use Illuminate\Support\Facades\File;

class InstallationChecker
{
	/**
	 * Handle an incoming request.
	 *
	 * @param \Illuminate\Http\Request $request
	 * @param \Closure $next
	 *
	 * @return mixed
	 */
	public function handle($request, Closure $next)
	{
		if ($request->segment(1) == 'install') {
			// Check if installation is processing
			$InstallInProgress = false;
			if (
				!empty($request->session()->get('database_imported'))
				|| !empty($request->session()->get('cron_jobs'))
				|| !empty($request->session()->get('install_finish'))
			) {
				$InstallInProgress = true;
			}
			if ($this->alreadyInstalled($request) && !$InstallInProgress) {
				return redirect('/');
			}
		} else {
			// Check if the website is installed
			if (!$this->alreadyInstalled($request)) {
				return redirect(getRawBaseUrl() . '/install');
			}
			
		}
		
		return $next($request);
	}
	
	/**
	 * If application is already installed.
	 *
	 * @param \Illuminate\Http\Request $request
	 * @return bool|\Illuminate\Http\RedirectResponse
	 */
	public function alreadyInstalled($request)
	{
		// Check if installation has just finished
    if( env( 'APP_ENV' ) === 'local' ){
      return true;
    }
		if (!empty($request->session()->get('install_finish'))) {
			// Write file
			File::put(storage_path('installed'), '');
			
			$request->session()->forget('install_finish');
			$request->session()->flush();
			
			// Redirect to the homepage after installation
			return redirect('/');
		}
		
		// Check if the app is installed
		return appIsInstalled();
	}

}
