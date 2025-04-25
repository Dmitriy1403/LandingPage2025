<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;
use Illuminate\Support\Facades\File;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void

    {

        
        Inertia::version(function () {
            // Предположим, что Vite создает файлик манифеста по пути public/build/manifest.json
             $manifestPath = public_path('build/manifest.json');
             return File::exists($manifestPath)
                 ? md5_file($manifestPath)
            : null;

           

        });

        Inertia::share([
            'flash' => function () {
                return [
                    'success' => session('success'),
                    'error'   => session('error'),
                ];
            },
        ]);
        


        Schema::defaultStringLength(191);
        Vite::prefetch(concurrency: 3);
    }
}
