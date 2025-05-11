<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';




    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string


    {

        // Путь до Vite‑манифеста
    $manifest = public_path('build/manifest.json');

    // Если файла нет (т.е. вы в режиме `npm run dev`), возвращаем null → механика версий отключена
     if (! file_exists($manifest)) {
        return null;
                 
     }

    

   
     return md5_file($manifest);

   


    //   return null;

        // $manifestPath = public_path('build/manifest.json');

        // return file_exists($manifestPath) ? md5_file($manifestPath) : null;

      

    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            
            'auth' => [
                'user' => $request->user(),
            ],
            
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error'   => fn () => $request->session()->get('error'),
                
            ],
        ]);
    }
}
