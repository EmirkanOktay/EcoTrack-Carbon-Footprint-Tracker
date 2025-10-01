/** @type {import('tailwindcss').Config} */
export default {
    theme: {
        extend: {
            keyframes: {
                shake: {
                    '0%': { transform: 'translate(1px, 1px) rotate(0deg)' },
                    '25%': { transform: 'translate(-1px, -2px) rotate(-1deg)' },
                    '50%': { transform: 'translate(-3px, 0px) rotate(1deg)' },
                    '75%': { transform: 'translate(2px, 2px) rotate(0deg)' },
                    '100%': { transform: 'translate(1px, -1px) rotate(1deg)' },
                },
            },
            animation: {
                shake: 'shake 0.5s ease-in-out infinite',
            },
        },
    },
    plugins: [],
}

