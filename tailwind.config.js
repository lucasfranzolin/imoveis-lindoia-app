/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{jsx,tsx}', './public/index.html'],
    theme: {
        colors: {
            button: 'var(--color-button-text)',
            transparent: 'transparent',
            primary: {
                100: 'var(--color-primary-100)',
                200: 'var(--color-primary-200)',
                300: 'var(--color-primary-300)',
                600: 'var(--color-primary-600)',
                700: 'var(--color-primary-700)',
                800: 'var(--color-primary-800)',
                900: 'var(--color-primary-900)',
            },
            secondary: {
                DEFAULT: 'var(--color-secondary)',
                'washed-out': 'var(--color-secondary-washed-out)',
            },
            accent: {
                DEFAULT: 'var(--color-accent)',
                hover: 'var(--color-accent-hover)',
                disabled: 'var(--color-accent-disabled)',
            },
            borders: {
                DEFAULT: 'var(--color-primary-100)',
            },
            black: '#000',
            white: '#fff',
        },
        extend: {
            borderRadius: {
                5: '5px',
                8: '8px',
                20: '20px',
                40: '40px',
            },
            keyframes: {
                breathe: {
                    '0%, 100%': {
                        boxShadow:
                            '0 0 20px 2px var(--color-primary-100-translucent)',
                        borderColor: 'var(--color-primary-300)',
                    },
                    '50%': {
                        boxShadow: '0 0 20px 2px transparent',
                        borderColor: 'var(--color-primary-700)',
                    },
                },
            },
            animation: {
                'breathe-slow': 'breathe 5s infinite ease-in-out',
            },
        },
    },
    variants: {
        backgroundColor: ({ after }) => after(['disabled']),
        textColor: ({ after }) => after(['disabled']),
        extend: {
            borderWidth: ['last'],
            cursor: ['disabled', 'hover'],
        },
    },
    plugins: [],
};
