<?php

namespace App\Http\Controllers;

use App\Constructor\Template;
use Illuminate\Http\Request;
use App\GlobalTemplateStyle as GlobalStyle;

class GlobalTemplateStylesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $styles = GlobalStyle::all();
        $styles = $styles->groupBy('type');

        return response()->json($styles, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        /**
         * @var Array $data
         */
        $data = $request->validate([
            'type' => 'required',
            'settings' => 'required',
        ]);
        try {
            $style = new GlobalStyle($data);
            $style->save();
            //just for guid
            $style = GlobalStyle::find($style->id);
            return response()->json($style, 201);
        } catch (\Throwable $th) {
            dd($th);
            return response()->json([
                'message' => $th,
                'trace' => $th->getTraceAsString()
            ], 409);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = GlobalStyle::findOrFail($id);
        return response()->json($data);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $style = GlobalStyle::find($id);

        if (!$style) {
            return response()->json(['message' => 'Not found'], 404);
        }

        switch ($style->type) {
            case 'color':
                $data = $style->settings;
                $data['name'] = $request->settings['name'] ?? $data['name'];
                $data['color'] = $request->settings['color'] ?? $data['color'];
                $data['colorPickedHex'] = $request->settings['colorPickedHex'] ?? $data['colorPickedHex'];
                $data['colorRGB'] = $request->settings['colorRGB'] ?? $data['colorRGB'];
                $style->settings = json_encode($data);
                break;
            case 'effect':
                $data = $style->settings;
                $data['name'] = $request->settings['name'] ?? $data['name'];
                $data['color'] = $request->settings['color'] ?? $data['color'];
                $data['colorPickedHex'] = $request->settings['colorPickedHex'] ?? $data['colorPickedHex'];
                $data['colorRGB'] = $request->settings['colorRGB'] ?? $data['colorRGB'];
                $data['blur'] = $request->settings['blur'] ?? $data['blur'];
                $data['horizontal'] = $request->settings['horizontal'] ?? $data['horizontal'];
                $data['opacity'] = $request->settings['opacity'] ?? $data['opacity'];
                $data['spread'] = $request->settings['spread'] ?? $data['spread'];
                $data['type'] = $request->settings['type'] ?? $data['type'];
                $data['vertical'] = $request->settings['vertical'] ?? $data['vertical'];
                $style->settings = json_encode($data);
                break;
            case 'font':
                $data = $style->settings;
                $data['name'] = $request->settings['name'] ?? $data['name'];
                $data['decoration'] = $request->settings['decoration'] ?? $data['decoration'];
                $data['family'] = $request->settings['family'] ?? $data['family'];
                $data['lineHeight'] = $request->settings['lineHeight'] ?? $data['lineHeight'];
                $data['size'] = $request->settings['size'] ?? $data['size'];
                $data['spacing'] = $request->settings['spacing'] ?? $data['spacing'];
                $data['sizeUnit'] = $request->settings['sizeUnit'] ?? $data['sizeUnit'];
                $data['weight'] = $request->settings['weight'] ?? $data['weight'];
                $data['style'] = $request->settings['style'] ?? $data['style'];
                $data['transform'] = $request->settings['transform'] ?? $data['transform'];
                $style->settings = json_encode($data);
                break;
        }
        if (!$style->save()) {
            return response()->json(['message' => 'Save failed'], 409);
        }


        $this->updateStylesInAllTemplates($style);

        return response()->json($style, 201);
    }


    private function updateStylesInAllTemplates($style)
    {
        $templates = Template::all();
        $templates->each(function ($template) use ($style) {
            $this->replaceGlobalStyles($template, $style->guid, $style->settings);
        });
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $color = GlobalStyle::find($id);

        if (!$color) {
            return response()->json(['message' => 'Not found'], 404);
        }
        if (!$color->delete()) {
            return response()->json(['message' => 'Delete failed'], 409);
        }
        return response()->json($color, 201);
    }

    /** 
     * @param  App\Constructor\Template $element
     * @param string $guid
     * @param * $style
     */
    public function replaceGlobalStyles($element, $guid, $style)
    {
        $elementData = json_decode($element->data, true);
        $elementData = self::recursiveReplaceGlobalStyles($elementData, $guid, $style);
        $element->data = json_encode($elementData);
        $element->save();
    }

    /** 
     * @param App\Constructor\Template $element
     * @param string $guid
     * @param $style
     * @return 
     */
    static public function recursiveReplaceGlobalStyles($element, $guid, $style)
    {
        $globalStyleList = data_get($element, 'settings.global_styles_storage.' . $guid, []);
        if (count($globalStyleList) > 0) {
            foreach ($globalStyleList as $item) {
                if (!is_null($item)) {
                    data_set($element, 'settings.' . $item, $style);
                }
            }
        }
        foreach ($element['children'] as $idx => $child) {
            $element['children'][$idx] = self::recursiveReplaceGlobalStyles($child, $guid, $style);
        }
        return $element;
    }
}
