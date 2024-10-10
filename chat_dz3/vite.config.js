import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: './src/index.html',
                messenger: './src/messages_page/messenger.html',
                chat: './src/chat_page/chat.html',
            }
        }
    },
    server: {
        port: 3000,
        open: true,
    },
    root: './src',
    base: './',
    pages: [
        {
            src: 'index.html',
            entry: 'index.js',
        },
        {
            src: 'chat_page/chat.html',
            entry: 'chat_page/chat.js',
        },
        {
            src: 'messages_page/messenger.html',
            entry: 'messages_page/messenger.js',
        },
    ],
});
