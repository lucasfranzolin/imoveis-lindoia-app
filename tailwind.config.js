/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{jsx,tsx}', './public/index.html'],
    theme: {
        colors: {
            transparent: 'transparent',
            primary: {
                DEFAULT: 'var(--color-primary)',
                dark: 'var(--color-primary-dark)',
                light: 'var(--color-primary-light)',
                'washed-out': 'var(--color-primary-washed-out)',
            },
            secondary: {
                DEFAULT: 'var(--color-secondary)',
                dark: 'var(--color-secondary-dark)',
                light: 'var(--color-secondary-light)',
            },
            'title-active': 'var(--color-title-active)',
            body: 'var(--color-body)',
            label: 'var(--color-label)',
            placeholder: 'var(--color-placeholder)',
            line: 'var(--color-line)',
            'input-bg': 'var(--color-input-bg)',
            bg: 'var(--color-bg)',
            'off-white': 'var(--color-off-white)',
            error: 'var(--color-error)',
            success: 'var(--color-success)',
            white: '#fff',
            black: '#000',
        },
        ringWidth: {
            0: '0px',
            DEFAULT: '2px',
        },
        borderWidth: {
            0: '0px',
            DEFAULT: '1px',
        },
        borderColor: {
            DEFAULT: 'var(--color-line)',
            primary: 'var(--color-primary)',
        },
        letterSpacing: {
            tightest: '-.075em',
            tighter: '-.050em',
            tight: '-.025em',
            normal: '0',
            wide: '.025em',
            wider: '.050em',
            widest: '.075em',
        },
        extend: {
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
