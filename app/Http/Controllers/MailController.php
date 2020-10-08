<?php


namespace App\Http\Controllers;


use App\Http\Requests\SendMailRequest;
use App\Http\Requests\WriteMailSettingsRequest;
use App\Mail;
use Illuminate\Support\Str;

class MailController extends Controller
{
    /**
     * Отправить письмо
     *
     * @param SendMailRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendMail(SendMailRequest $request)
    {
        $data = $request->all();
        $adminEmail = config('mail.username');
        $mail = new Mail($data);
        try {
            $mail->save();
            \Mail::send('emails.feedback', $data, function($message) use ($data, $adminEmail) {
                $message->from($data['email'], $data['name']);
                $message->to($adminEmail)
                    ->subject($data['subject']);
            });
        } catch (\Exception $e) {
            $mail->delete();
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }

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

        $fileContent = file($file, 2);
        foreach ($fileContent as $line => $content) {
            if (Str::contains($content,'MAIL')) {
                for ($i = $line; true; $i++) {
                    if (!Str::contains($fileContent[$i],'MAIL')) break;
                    $var = explode('=', $fileContent[$i]);
                    $key = strtolower($var[0]);
                    if (isset($data[$key]))
                        $fileContent[$i] = $var[0] . '=' . $data[$key];
                }
                break;
            }
        }

        $result = file_put_contents($file, implode(PHP_EOL, $fileContent));

        if (! $result)
            return response()->json(['success' => false, 'message' => 'Failed to write mail settings.'], 500);

        return response()->json(['success' => true, 'message' => 'Mail settings configure successfully.'], 200);
    }
}
