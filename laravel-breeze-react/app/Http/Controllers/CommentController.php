<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;



class CommentController extends Controller
{


    public function store(Request $request, Post $post)
    {

        $data = $request->validate([
            'content' => 'required|string',
        ]);
    
       
        if ($post->comments()->where('user_id', Auth::id())->exists()) {
            return redirect()
                ->route('posts.show', $post->id)
                ->withErrors(['content' => 'Вы уже оставили комментарий.']);
        }
    
        $post->comments()->create([
            'user_id'     => auth()->id(),
            'content'     => $data['content'],
            'is_approved' => false,
        ]);
    
        return redirect()
            ->route('posts.show', $post->id)
            ->with('success', 'Ваш комментарий отправлен на модерацию.');

        // return back()->with('success', 'Ваш комментарий отправлен на модерацию.');
        
      
    }


   
    public function index()
    {
        $comments = Comment::with(['user', 'post'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Comments/Index', [
            'comments' => $comments,
        ]);
    }

    // PATCH /comments/{comment}
    public function update(Request $request, Comment $comment)
    {
        $validated = $request->validate([
            'is_approved' => 'required|boolean',
        ]);

        $comment->update(['is_approved' => $validated['is_approved']]);

        return back()->with('success', 'Статус комментария обновлён.');
    }


    public function destroy(Comment $comment)
    {
        $comment->delete();
        return back()->with('success', 'Комментарий удалён.');
    }
}
