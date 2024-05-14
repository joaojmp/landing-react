const plugin = require('tailwindcss/plugin');
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],

    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./app/Web/resources/views/**/*.blade.php",
        "./app/Web/resources/js/**/*.tsx",
        "./app/Cms/resources/views/**/*.blade.php",
        "./app/Cms/resources/js/**/*.tsx",
    ],

    theme: {
        container: {
            center: true,
            padding: "0.75rem",
        },
        screens: {
            sm: "540px",
            md: "720px",
            lg: "960px",
            xl: "1140px",
            "2xl": "1320px",
        },
        fontFamily: {
            sans: ["DM Sans", "sans-serif"],
        },
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "#004089",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "#DC171E",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: 0 },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: 0 },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },

    plugins: [
        forms,
        require("tailwindcss-animate"),
        require("tailwind-scrollbar-hide"),
        plugin(function ({ addUtilities }: any) {
            addUtilities({
                ".flip-x": {
                    transform: "rotateX(180deg)",
                },
                ".flip-y": {
                    transform: "rotateY(180deg)",
                },
            });
        }),
    ],
};
