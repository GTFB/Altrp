<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Template;

class TemplateController extends Controller
{
    public function create(Request $request)
    {
   //     if(!auth()->user()->hasRole('admin')){
   //         return 'you are not admin';
   //     }
    $template = new Template();
        $template->name = $request->name;
        $template->title = $request->title;
        $template->data = $request->data;
        $template->type = 'template';
        $template->author = $request->author; // связано ли с auth()->user()?
        // $template->parent = $request->parent;
    $template->save();

        return 'template created';
        //return view('home');
    }

    public function update(Request $request, $id)
    {
   //     if(!auth()->user()->hasRole('admin')){
   //         return 'you are not admin';
   //     }

        $parentTemplate = Template::find($id);
    $template = new Template();
        $template->name = $request->name;
        $template->title = $request->title;
        $template->data = $parentTemplate->data;
        $template->type = 'revision';
        $template->author = $parentTemplate->author; // связано ли с auth()->user()?
        $template->parent = $parentTemplate->id;
    $template->save();

        return 'template updated';
      //  return view('home');
    }

    public function templates()
    {
        //     if(!auth()->user()->hasRole('admin')){
        //         return 'you are not admin';
        //     }
        $templates = Template::all();

        dd($templates);
        return 'template';
        //return view('home');
    }

    public function template($id)
    {
   //     if(!auth()->user()->hasRole('admin')){
   //         return 'you are not admin';
   //     }
        $template = Template::find($id);

        $templates = Template::where('parent', $template->id)->get();
        /*
        $templates_ids = [];
        while($template->parent){
            $template = Template::find($template->parent);
            $templates_ids[] = $template->id;
        }
        $templates = Template::find($templates_ids);
        */
        dd($templates);
        return 'template created';
        //return view('home');
    }

}
