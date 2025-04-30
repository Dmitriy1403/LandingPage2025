<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SpeakerController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\PostImageController;
use App\Http\Middleware\AdminMiddleware;


use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\EventDayController;

use App\Http\Controllers\RegisterController;
use PHPUnit\Framework\Attributes\Ticket;



Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/registration', [HomeController::class, 'showRegistrationForm'])->name('registration');
Route::post('/registration', [RegisterController::class, 'store'])->name('registration.store');
Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');

Route::resource('posts', PostController::class)

    ->whereNumber('post')->only(['index', 'show']);
    Route::post('/posts/{post}/comments', [CommentController::class,'store'])
    ->middleware('auth')
    ->name('posts.comments.store');

    Route::middleware('auth')->post('/posts/{post}/like', [PostController::class, 'toggleLike'])
     ->name('posts.like');


Route::get('/login', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

    Route::middleware(['auth', AdminMiddleware::class])->group(function () {

        Route::get('/dashboard', [RegisterController::class, 'index'])->name('dashboard');
    
        Route::delete('/post-images/{image}', [PostImageController::class, 'destroy'])
        ->name('post-images.destroy');    

    Route::delete('/participants/{id}',[RegisterController::class,'destroy'])->name('participants.destroy');

    Route::resource('posts',PostController::class)->except(['index', 'show']);

    // Route::post('/posts/{post}/comments', [CommentController::class, 'store'])->name('comments.store');


Route::get('/events', [EventDayController::class, 'index'])->name('events.index');
Route::post('/events/days', [EventDayController::class, 'storeDay'])->name('events.storeDay');
Route::get('/events/speakers',[SpeakerController::class,'getSpeakers'])->name('events.getSpeakers');

Route::post('/events/schedule', [EventDayController::class, 'storeSchedule'])->name('events.storeSchedule');


Route::put('/events/day/{id}', [EventDayController::class, 'updateDay'])->name('events.updateDay');
Route::put('/events/schedule/{id}', [EventDayController::class, 'updateSchedule'])->name('events.updateSchedule');
Route::delete('/events/schedule/{id}', [EventDayController::class, 'destroy'])->name('events.destroySchedule');
Route::delete('/events/destroyAll', [EventDayController::class, 'destroyAll'])->name('events.destroyAll');
Route::delete('/events/deleteDay{id}', [EventDayController::class, 'deleteDay'])->name('events.deleteDay');
Route::patch('/registration/{id}', [RegisterController::class, 'update'])->name('registration.update');

Route::resource('speakers', SpeakerController::class)->except('show');
Route::resource('tickets',TicketController::class);

Route::get('/comments', [CommentController::class, 'index'])
     ->name('comments.index');
Route::patch('/comments/{comment}', [CommentController::class, 'update'])
     ->name('comments.update');

     Route::delete('/comments/{comment}', [CommentController::class, 'destroy'])
     ->name('comments.destroy');     


    
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
