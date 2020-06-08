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
			// Check if an update is available
			if (updateIsAvailable()) {
				return headerLocation(getRawBaseUrl() . '/upgrade');
			}
			
			// Check if the website is installed
			if (!$this->alreadyInstalled($request)) {
				return redirect(getRawBaseUrl() . '/install');
			}
			
			$this->checkPurchaseCode($request);
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
	
	/**
	 * Check Purchase Code
	 * ===================
	 * Checking your purchase code. If you do not have one, please follow this link:
	 * https://codecanyon.net/item/laraclassified-geo-classified-ads-cms/16458425
	 * to acquire a valid code.
	 *
	 * IMPORTANT: Do not change this part of the code to prevent any data losing issue.
	 *
	 * @param \Illuminate\Http\Request $request
	 */
	private function checkPurchaseCode($request)
	{
		$tab = [
			'install',
			admin_uri(),
		];
		
		// Don't check the purchase code for these areas (install, admin, etc. )
		if (!in_array($request->segment(1), $tab)) {
			// Make the purchase code verification only if 'installed' file exists
			if (file_exists(storage_path('installed')) && !config('settings.error')) {
				// Get purchase code from 'installed' file
				$purchaseCode = file_get_contents(storage_path('installed'));
				
				// Send the purchase code checking
				if (
					$purchaseCode == ''
					|| config('settings.app.purchase_code') == ''
					|| $purchaseCode != config('settings.app.purchase_code')
				) {
					$apiUrl = config('larapen.core.purchaseCodeCheckerUrl') . config('settings.app.purchase_code') . '&item_id=' . config('larapen.core.itemId');
					$data = Curl::fetch($apiUrl);
					
					// Check & Get cURL error by checking if 'data' is a valid json
					if (!isValidJson($data)) {
						$data = json_encode(['valid' => false, 'message' => 'Invalid purchase code. ' . strip_tags($data)]);
					}
					
					// Format object data
					$data = json_decode($data);
					
					// Check if 'data' has the valid json attributes
					if (!isset($data->valid) || !isset($data->message)) {
						$data = json_encode(['valid' => false, 'message' => 'Invalid purchase code. Incorrect data format.']);
						$data = json_decode($data);
					}
					
					// Checking
					if ($data->valid == true) {
						file_put_contents(storage_path('installed'), $data->license_code);
					} 
				}
			}
		}
	}
}
