<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller

{
    public function index(){

       
        $all_posts = Post::all();

        return Inertia::render('Blog',[
            'all_posts'=>$all_posts,



        ]);

        


    }



}
