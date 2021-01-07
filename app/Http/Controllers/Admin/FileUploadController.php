<?php


namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class FileUploadController extends Controller
{
    const PWA_ICON_SIZES = [
        [
            'width' => 32,
            'height' => 32
        ],
        [
            'width' => 64,
            'height' => 64
        ],
        [
            'width' => 96,
            'height' => 96
        ],
        [
            'width' => 128,
            'height' => 128
        ],
        [
            'width' => 192,
            'height' => 192
        ]
    ];

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

        try {
            $this->makePWAicons($source, $file);
        } catch (\Throwable $th) {
            print_r($th);
        }

        $destination = public_path('favicon.ico');

        $phpIco = new \PHP_ICO($source, [[32, 32], [64, 64], [128, 128]]);
        $result = $phpIco->save_ico($destination);

        return response()->json(['success' => $result], $result ? 200 : 500);
    }

    private function makePWAicons(string $realPath, UploadedFile $file): void
    {
        File::copy($realPath, public_path('favicon.png'));
        $file = public_path('favicon.png');
        foreach ($this::PWA_ICON_SIZES as $size) {
            $this->resizeImage($file, $size['width'], $size['height'], true);
        }
    }

    private function resizeImage(string $file, int $w, int $h, bool $crop = FALSE): bool
    {
        list($width, $height) = getimagesize($file);
        $r = $width / $height;
        if ($crop) {
            if ($width > $height) {
                $width = ceil($width - ($width * abs($r - $w / $h)));
            } else {
                $height = ceil($height - ($height * abs($r - $w / $h)));
            }
            $newwidth = $w;
            $newheight = $h;
        } else {
            if ($w / $h > $r) {
                $newwidth = $h * $r;
                $newheight = $h;
            } else {
                $newheight = $w / $r;
                $newwidth = $w;
            }
        }
        $ext = pathinfo($file, PATHINFO_EXTENSION);
        switch ($ext) {
            case 'png':
                $src = imagecreatefrompng($file);
                break;
            case 'jpeg' || 'jpg':
                $src = imagecreatefromjpeg($file);
                break;
            case 'gif':
                $src = imagecreatefromgif($file);
                break;
        }

        $dst = imagecreatetruecolor($newwidth, $newheight);
        imagesavealpha($dst, true);
        $color = imagecolorallocatealpha($dst, 0, 0, 0, 127);
        imagefill($dst, 0, 0, $color);
        imagecolortransparent($dst, $color);
        imagecopyresampled($dst, $src, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);

        $name = "favicon-$w.png";
        // $sizeManifest = $w . 'x' . $h;
        // $mime = 'image/png';

        $result = imagepng($dst, $name);

        return $result;
    }
}
