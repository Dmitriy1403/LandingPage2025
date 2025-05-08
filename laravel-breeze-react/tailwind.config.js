import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },

            textAlign: {
                'justify': 'justify',
              },

            backgroundImage: {
                
                'linear-65': 'linear-gradient(65deg, var(--tw-gradient-stops))',
              },

            screens: {
                'mobile':{ 'max': '375px' },
                'custom': '609px',
                '2k': '2048px',
                '4k': '3840px', 
              },
        },
    },

    plugins: [forms,require('@tailwindcss/typography')],
    

};
