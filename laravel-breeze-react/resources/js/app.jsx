import React from 'react'


import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';



import '../css/app.css';
import './bootstrap';
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);


        

        root.render(<App {...props} />);

       
    },
    progress: {
        color: '#4B5563',
    },
});



