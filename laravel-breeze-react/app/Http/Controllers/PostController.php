<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\PostImage;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::orderBy('created_at', 'desc')->paginate(10);

        return Inertia::render('Posts/Index', [
            'posts' => $posts,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Posts/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

       
        //  dd($request->file('background_image'));

        // Валидация запроса, включая изображение
        $validated = $request->validate([
            'title'         => 'required|string|max:255',
            'description'   => 'required|string',
            'background_image'=> 'nullable|image|max:2048',
            'is_published'  => 'sometimes|boolean',
            'published_at'  => 'sometimes|nullable|date',
            'images.*'      => 'nullable|image|max:2048', // максимум 2 МБ на файл
        ]);

        $validated['is_published'] = isset($validated['is_published'])
        ? filter_var($validated['is_published'], FILTER_VALIDATE_BOOLEAN)
        : false;

        $validated['user_id'] = auth()->id();


        $bgFile = $request->file('background_image');

        // Извлекаем файлы
        $images = $request->file('images');

        if ($bgFile) {
            // сохранит на диске `public` → storage/app/public/posts/backgrounds/...
            $dest     = public_path('img/posts');
            $fileName = uniqid().'_'.$bgFile->getClientOriginalName();
            $bgFile->move($dest, $fileName);
            $validated['background_image'] = 'img/posts/'.$fileName;
        }

        // Удаляем ключ images из валидационных данных, чтобы не пытаться массово заполнить модель Post
        if (isset($validated['images'])) {
            unset($validated['images']);
        }

       
        $validated['is_published'] = filter_var($validated['is_published'], FILTER_VALIDATE_BOOLEAN);


        if (!empty($validated['published_at'])) {
            $validated['published_at'] = Carbon::parse($validated['published_at']);
        }

        // Создаём запись поста
        $post = Post::create($validated);

        // Обрабатываем и сохраняем файлы в директорию public/posts
        if ($images) {
            foreach ($images as $image) {
                $destinationPath = public_path('img/posts');
                // Генерируем уникальное имя файла
                $filename = time() . '_' . $image->getClientOriginalName();
                // Перемещаем файл
                $image->move($destinationPath, $filename);
                // Сохраняем относительный путь в базе
                $path = 'img/posts/' . $filename;
                
                PostImage::create([
                    'post_id'    => $post->id,
                    'image_path' => $path,
                ]);
            }
        }
        

        return redirect()->route('posts.index')
                         ->with('success', 'Пост успешно создан.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
    $post->load([
        'images',
         'comments' => fn($q) => $q->where('is_approved', true)->with('user')]);

    $hasCommented = $post->comments()->where('user_id', auth()->id())->exists();

    $post->loadCount('likers');

    $isLiked = auth()->check()
        ? $post->likers()->where('user_id', auth()->id())->exists()
        : false;


   
    return Inertia::render('Posts/Show', [
        'post'         => $post,
        'hasCommented' => $hasCommented,
        'likesCount'   => $post->likers_count,
        'isLiked'      => $isLiked,
    ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        return Inertia::render('Posts/Edit', [
            'post' => $post,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
{
    $validated = $request->validate([
        'title'             => 'required|string|max:255',
        'description'       => 'required|string',
        'background_image'  => 'nullable|image|max:2048',
        'is_published'      => 'sometimes|boolean',
        'published_at'      => 'sometimes|nullable|date',
        'images.*'          => 'nullable|image|max:2048',
        'delete_images.*'   => 'integer|exists:post_images,id',
    ]);

    // Обновляем поля
    $post->fill([
        'title'        => $validated['title'],
        'description'  => $validated['description'],
        'is_published' => $request->boolean('is_published'),
        'published_at' => $validated['published_at']
            ? Carbon::parse($validated['published_at'])
            : null,
    ]);

    // Фоновое изображение
    if ($request->hasFile('background_image')) {
        if ($post->background_image) {
            @unlink(public_path($post->background_image));
        }
        $file = $request->file('background_image');
        $name = uniqid().'_'.$file->getClientOriginalName();
        $file->move(public_path('img/posts'), $name);
        $post->background_image = 'img/posts/'.$name;
    }

    $post->save();

    // Удаляем отмеченные старые картинки
    if ($request->filled('delete_images')) {
        foreach ($request->input('delete_images') as $imgId) {
            $img = PostImage::find($imgId);
            if ($img) {
                @unlink(public_path($img->image_path));
                $img->delete();
            }
        }
    }

    // Сохраняем новые картинки
    if ($request->hasFile('images')) {
        foreach ($request->file('images') as $image) {
            $name = time().'_'.$image->getClientOriginalName();
            $image->move(public_path('img/posts'), $name);
            PostImage::create([
                'post_id'    => $post->id,
                'image_path' => 'img/posts/'.$name,
            ]);
        }
    }

    // ← теперь редирект всегда отработает
    return redirect()
        ->route('posts.index')
        ->with('success', 'Пост успешно обновлен.');
}


// в PostController
public function toggleLike(Post $post)
{
    $user = auth()->user();
    $result = $post->likers()->toggle($user->id);
    $action = count($result['attached']) ? 'liked' : 'unliked';
    return response()->json([
        'action'      => $action,
        'likes_count' => $post->likers()->count(),
    ]);
} 

}
