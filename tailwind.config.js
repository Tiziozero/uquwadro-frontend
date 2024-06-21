/** @type {import('tailwindcss').Config} */
    export default {
        content: [
            "./src/**/*.{html,js,jsx,ts,tsx}",
            "./src/*.{html,js,jsx,ts,tsx}",
            "./index.html"
        ],
        theme: {
            extend: {
                colors: {
                    'uquwadro-main-blue': '#0a1c2b',
                    'uquwadro-bg': '#383838',

                    'uquwadro-bg-highlight': '#3f3f3f',
                },
                boxShadow: {
                    'white-blur': '0 4px 6px rgba(255, 255, 255, 0.5)',
                },
            },
        },
        plugins: [],
    }

