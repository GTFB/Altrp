<?php

namespace App\Http\Controllers\Auth;

use App\Helpers\Classes\CurrentEnvironment;
use App\Http\Controllers\Controller;
use App\Jobs\RunRobotsJob;
use App\Providers\RouteServiceProvider;
use App\Services\ChatService;
use App\Services\Robots\RobotsService;
use App\Traits\AuthenticatesUsers;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Http\Request;
use App\Altrp\Facades\CacheService;

class LoginController extends Controller
{
    use DispatchesJobs;

    /*
  |--------------------------------------------------------------------------
  | Login Controller
  |--------------------------------------------------------------------------
  |
  | This controller handles authenticating users for the application and
  | redirecting them to your home screen. The controller uses a trait
  | to conveniently provide its functionality to your applications.
  |
  */

    use AuthenticatesUsers;

    /**
   * Where to redirect users after login.
   *
   * @var string
   */
  protected $redirectTo = RouteServiceProvider::ADMIN;

    private $robotsService;

    /**
     * Create a new controller instance.
     *
     * @param RobotsService $robotsService
     */
  public function __construct(RobotsService $robotsService)
  {
    $this->middleware( 'guest' )->except( 'logout' );
    $this->robotsService = $robotsService;
  }

    /**
   * Log the user out of the application.
   *
   * @param  \Illuminate\Http\Request $request
   * @return \Illuminate\Http\JsonResponse
   */
  public function logout( Request $request )
  { 

    unset($_COOKIE['uid']);
    setcookie('uid', null, -1, '/');

    $this->guard()->logout();

    $request->session()->invalidate();

    $request->session()->regenerateToken();
    $this->loggedOut( $request );

    return  response( )->json( [
      'success' => true,
      'reload' => true,
      '_token' => csrf_token(),
    ] );
  }

  /**
   * Handle a login request to the application.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse|\Illuminate\Http\Response|\Symfony\Component\HttpFoundation\Response|void
   *
   * @throws \Illuminate\Validation\ValidationException
   */
  public function login(Request $request)
  {
    $this->validateLogin($request);

    // If the class is using the ThrottlesLogins trait, we can automatically throttle
    // the login attempts for this application. We'll key this by the username and
    // the IP address of the client making these requests into this application.
    if (method_exists($this, 'hasTooManyLoginAttempts') &&
      $this->hasTooManyLoginAttempts($request)) {
      $this->fireLockoutEvent($request);

      return $this->sendLockoutResponse($request);
    }

    if ($this->attemptLogin($request)) {
      
      CacheService::setUserCookie();

      return $this->sendLoginResponse($request);
    }

    // If the login attempt was unsuccessful we will increment the number of attempts
    // to login and redirect the user back to the login form. Of course, when this
    // user surpasses their maximum number of attempts they will get locked out.
    $this->incrementLoginAttempts($request);
    return $this->sendFailedLoginResponse($request);
  }

  /**
   * Send the response after the user was authenticated.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse
   */
  protected function sendLoginResponse(Request $request)
  {
    $request->session()->regenerate();

    $this->clearLoginAttempts($request);

    if ($this->guard()->user()) {
        $res = ChatService::authInChat($this->guard()->user()->email);
    }

    if( ( ! $this->authenticated( $request, $this->guard()->user() ) ) && $request->get( 'altrpLogin' ) ){

      return response()->json([
        'success' => true,
        '_token' => csrf_token(),
      ]);
    }

    $robots = $this->robotsService->getStartConditionRobots('logged_in');

      $this->dispatch(new RunRobotsJob(
          $robots,
          $this->robotsService,
          [],
          'logged_in',
          CurrentEnvironment::getInstance()
      ));

    return $this->authenticated( $request, $this->guard()->user() )
      ? : ( ( $request->get( 'altrp_ajax' ) ) ? response()->json([
        'success' => true,
        'reload' => true,
      ] ) : redirect( )->intended('/'));
  }
}
