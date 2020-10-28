<?php


namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class FileUploadController extends Controller
{
    public function loadFavicon(Request $request)
    {
        $validator = \Validator::make($request->all(), [
            'favicon' => 'required|mimes:jpg,jpeg,png,gif,ico|max:4096'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->first('favicon')
            ], 422);
        }

        $file = $request->file('favicon');
        $source = $file->getRealPath();

        $destination = public_path('favicon.ico');
        $phpIco = new \PHP_ICO($source);
        $result = $phpIco->save_ico($destination);

        return response()->json(['success' => $result], $result ? 200 : 500);
    }
}
