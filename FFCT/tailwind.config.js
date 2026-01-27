/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Coastal Sunset Palette
                'bg-deep': '#0f172a', // Slate 900
                'bg-glass': 'rgba(255, 255, 255, 0.05)',
                'amber-glow': '#f59e0b', // Amber 500
                'text-main': '#ffffff',
                'text-muted': 'rgba(255, 255, 255, 0.6)',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            animation: {
                'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
            }
        },
    },
    plugins: [],
}
