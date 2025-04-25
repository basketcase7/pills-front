import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),  // Короткий алиас для src/
        },
    },
    root: path.resolve(__dirname, 'src'),  // Корень — папка src/
    server: {
        open: '/index.html',           // Автооткрываемая страница
    },
    build: {
        outDir: '../dist',                  // Папка для сборки
    },
});