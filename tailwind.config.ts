import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                green: {
                    dark: '#00252f',
                    fluor: '#71ff54',
                },
                orange: '#d4a05b',
                orange_opacity: '#d4a05b10',
            },
        },
    },
    plugins: [],
};
export default config;
