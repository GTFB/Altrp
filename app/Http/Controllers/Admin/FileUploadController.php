<?php


namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class FileUploadController extends Controller
{
    public function loadFavicon(Request $request)
    {
        $validator = \Validator::make($request->all(), [
            'favicon' => 'required|max:4096|mimes:jpg,jpeg,png,gif'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->first('favicon')
            ], 422, [], JSON_UNESCAPED_UNICODE);
        }

        $file = $request->file('favicon');
        $source = $file->getRealPath();

        $destination = public_path('favicon.ico');
        $phpIco = new \PHP_ICO($source, [[32,32], [64,64], [128,128]]);
        $result = $phpIco->save_ico($destination);

        return response()->json(['success' => $result], $result ? 200 : 500);
    }
}
