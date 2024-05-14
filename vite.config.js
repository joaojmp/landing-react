import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";

import react from "@vitejs/plugin-react";

export default defineConfig({
    base: "./",
    plugins: [
        laravel({
            input: [
                "/app/Web/resources/js/app.tsx",
                "/app/Cms/resources/js/app.tsx",
            ],
            ssr: [
                "/app/Web/resources/js/ssr.tsx",
                "/app/Cms/resources/js/ssr.tsx",
            ],
            refresh: true,
        }),
        react(),
    ],
    build: { chunkSizeWarningLimit: 2000 },
    resolve: {
        alias: {
            "@web": "/app/Web/resources/js",
            "@cms": "/app/Cms/resources/js",
        },
    },
});
