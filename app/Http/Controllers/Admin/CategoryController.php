<?php

namespace App\Http\Controllers\Admin;

use App\Category;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index( Request $request )
    {
        if( $request->get( 's' ) ){
          $сategories = Category::where( 'title', 'like', '%' . $request->get( 's' ) . '%' )->get();
          $сategories = $сategories->sortByDesc( 'title' )->values()->toArray();
          return response()->json( $сategories, 200, [], JSON_UNESCAPED_UNICODE);
        }
        return response()->json( Category::all()->sortByDesc( 'id' )->values()->toArray(), 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'title' => 'required'
          ]
        );

        if ($validator->fails()) {
          return response()->json( ['success' => false, 'message' => $validator->messages(), 'data' => []], 500, [], JSON_UNESCAPED_UNICODE);
        }

        $сategory = new Category( $request->all() );
        $сategory->guid = Str::uuid();

        try {
            $сategory->save();
            return response()->json( ['success' => true, 'message' => 'success', 'data' => $сategory->toArray()], 200, [], JSON_UNESCAPED_UNICODE);
        } catch (\Throwable $t) {
            return response()->json(['success' => false, 'message' => $t->errorInfo, 'data' => []], 500, [], JSON_UNESCAPED_UNICODE);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

        $сategory = Category::find($id);

        if (!$сategory) {
          return response()->json( ['success' => true, 'message' => 'Category Not Found', 'data' => []], 404, [], JSON_UNESCAPED_UNICODE);
        }

        return response()->json( ['success' => true, 'message' => 'success', 'data' => $сategory->toArray()], 200, [], JSON_UNESCAPED_UNICODE);

    }


    public function options(Request $request)
    {

        $сategories = Category::all();

        $сategories = $сategories->map( function( $сategory ) use ( $request ){
          $result = [];
          if( $request->value && data_get( $сategory, $request->value ) ){
            $result['value'] = data_get( $сategory, $request->value );
            $result['label'] = data_get( $сategory, 'title' );
          } else {

            $result['value'] = data_get( $сategory, 'guid' );
            $result['label'] = data_get( $сategory, 'title' );
          }
          return $result;
        } );

        return response()->json( ['success' => true, 'message' => 'success', 'data' => $сategories->toArray()], 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update($id, Request $request)
    {

        $сategory = Category::find($id);

        if (!$сategory) {
          return response()->json( ['success' => true, 'message' => 'Category Not Found', 'data' => []], 404, [], JSON_UNESCAPED_UNICODE);
        }

        $сategory->fill( $request->all() );
        $сategory->save();

        try {
            $сategory->save();
            return response()->json( ['success' => true, 'message' => 'success', 'data' => $сategory->toArray()], 200, [], JSON_UNESCAPED_UNICODE);
        } catch (\Throwable $t) {
            return response()->json(['success' => false, 'message' => $t->errorInfo, 'data' => []], 500, [], JSON_UNESCAPED_UNICODE);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy( $id )
    {

        $сategory = Category::find($id);

        if (!$сategory) {
          return response()->json( ['success' => true, 'message' => 'Category Not Found', 'data' => []], 404, [], JSON_UNESCAPED_UNICODE);
        }

        try {
            $сategory->delete();
            return response()->json( ['success' => true, 'message' => 'success', 'data' => []], 200, [], JSON_UNESCAPED_UNICODE);
        } catch (\Throwable $t) {
            return response()->json( ['success' => false, 'message' => 'error', 'data' => []], 500 );
        }
    }

}
