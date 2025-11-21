/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#f5f3ff',
                    100: '#ede9fe',
                    500: '#6d28d9', // Purple
                    600: '#5b21b6', // Deep Purple
                    700: '#4c1d95',
                    800: '#2e1065', // Very Dark Purple (Background)
                    900: '#1e0a45', // Almost Black
                },
                secondary: {
                    400: '#facc15', // Yellow
                    500: '#eab308', // Gold
                    600: '#ca8a04', // Dark Gold
                },
                accent: {
                    500: '#ef4444', // Red
                    600: '#dc2626',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Outfit', 'sans-serif'], // For headings if available, else fallback
            },
            backgroundImage: {
                'hero-pattern': "url('https://www.transparenttextures.com/patterns/stardust.png')",
            },
            animation: {
                marquee: 'marquee 25s linear infinite',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-100%)' },
                }
            }
        },
    },
    plugins: [],
}
