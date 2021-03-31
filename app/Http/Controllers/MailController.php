<?php


namespace App\Http\Controllers;


use App\Http\Requests\SendHTMLMailRequest;
use App\Http\Requests\SendMailRequest;
use App\Http\Requests\WriteMailSettingsRequest;
use App\Mail;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Jackiedo\DotenvEditor\Facades\DotenvEditor;

class MailController extends Controller
{
    static $keys = [
      'MAIL_DRIVER',
      'MAIL_HOST',
      'MAIL_PORT',
      'MAIL_USERNAME',
      'MAIL_PASSWORD',
      'MAIL_ENCRYPTION',
      'MAIL_FROM_ADDRESS',
      'MAIL_FROM_NAME',
      'MAIL_TO_NEW_USERS'
    ];

    /**
     * @param Request $request
     * @throws \Jackiedo\DotenvEditor\Exceptions\KeyNotFoundException
     */
    public function getSettings( Request $request){
      $settings = [];

      foreach ( self::$keys as $key ) {
        if( DotenvEditor::keyExists( $key ) ){
          $settings[Str::lower( $key )] = DotenvEditor::getValue( $key );
        } else {
          $settings[Str::lower( $key )] = '';
        }
      }
      return response()->json(['success' => true, 'data'=>$settings], 200, [], JSON_UNESCAPED_UNICODE);
    }
    /**
     * Отправить письмо
     *
     * @param SendMailRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendMail( SendMailRequest $request )
    {
      $data = $request->all();
      $from_email = $request->get('email') ? $request->get('email') : config('mail.from.address');
      $subject = $request->get('subject', '');
      $from_name = $request->get('name') ? $request->get('name') : config('mail.from.name');
      $data['email'] = $from_email;
      $data['name'] = $from_name;
      $adminEmail = config('mail.from.address');
      $mail = new Mail($data);
      try {
          $mail->save();
          \Mail::send('emails.feedback', $data,
            function($message) use ($adminEmail, $from_email , $from_name, $subject) {
              $message->from( $from_email , $from_name );
              $message->to( $adminEmail )
                  ->subject( $subject );
          });
      } catch (\Exception $e) {
          $mail->delete();
          return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
      }

      return response()->json(['success' => true, 'message' => 'Message sent!'], 200);
    }
    /**
     * Отправить письмо
     *
     * @param SendMailRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendMailHTML( SendHTMLMailRequest $request )
    {
      $data = $request->all();
      $to_email = $request->get('to') ? $request->get('to') : config('mail.from.address');
      $subject = $request->get('subject', '');
      $attachments = $request->get('attachments', '');
      $from_name = $request->get('from') ? $request->get('from') : config('mail.from.name');
      $html = $request->get('html', '');
      $data['email'] = $to_email;
      $data['name'] = $from_name;
      $data['html'] = $html;
      $adminEmail = config('mail.from.address');
      $mail = new Mail($data);
      try {
          $mail->save();

          \Mail::html( $html,
            function( \Illuminate\Mail\Message $message ) use ( $adminEmail, $to_email, $from_name, $subject, $attachments ) {
              $message->from( $adminEmail , $from_name );
              $message->to( $to_email )
                  ->subject( $subject );
              if( $attachments ){
                $attachments = explode( "\n", $attachments );
                foreach ( $attachments as $attachment ) {
                  if( Storage::exists( $attachment ) ){
                    $message->attach( Storage::path( $attachment ) );
                  }
                }
              }
          });
      } catch (\Exception $e) {
        $mail->status = 'error';
        $mail->save();
        return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
      }
      data_get('', '');
      return response()->json(['success' => true, 'message' => 'Message sent!'], 200);
    }

    /**
     * Записать настройки почты в .env файл
     *
     * @param WriteMailSettingsRequest $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function writeSettingsToEnv(WriteMailSettingsRequest $request)
    {
        $data = $request->all();
        $file = base_path('.env');
        if (!file_exists($file))
            throw new \Exception('File .env not found!', 500);



      foreach ( $data as $key => $value ) {
        try{
          DotenvEditor::setKey( Str::upper( $key ), $value );
          DotenvEditor::save();
        } catch (\Exception $e){
          return response()->json(['success' => false, 'message' => 'Failed to write mail setting ' . $key], 500);
        }
      }

      return response()->json(['success' => true, 'message' => 'Mail settings configure successfully.'], 200);
    }
}
