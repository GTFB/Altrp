<?php


namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Intervention\Image\ImageManagerStatic;
use Jackiedo\DotenvEditor\Facades\DotenvEditor;

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

        $directory_path = storage_path('app/public/media') .'/favicons';

        if(!File::exists($directory_path)) {
            File::makeDirectory($directory_path);
        }

        $file = $request->file('favicon');

        $source = $file->getRealPath();

        ImageManagerStatic::configure(["driver" => "imagick"]);

        $ico_image = new \PHP_ICO($source, [[16,16], [32,32], [48,48]]);
        $save_ico = $ico_image->save_ico($directory_path ."/favicon.ico");

        $png_sizes = [16, 32, 96, 120, 57, 60, 72, 76, 114, 120, 144, 152, 180, 192];

        foreach ($png_sizes as $png_size) {
            $png_image = ImageManagerStatic::make($source)->resize($png_size, $png_size)->encode("png");

            $png_image->save($directory_path ."/" .$png_size ."_favicon.png");

        }

        DotenvEditor::setKey("ALTRP_CUSTOM_ICON", 1);
        DotenvEditor::save();


        return response()->json(['success' => $save_ico], $save_ico ? 200 : 500);
    }
}
