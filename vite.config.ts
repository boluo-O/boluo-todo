import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [
            {
                find: '@p',
                replacement: resolve(__dirname, 'public')
            },
            {
                find: '@a',
                replacement: resolve(__dirname, 'src/assets')
            },
            {
                find: '@c',
                replacement: resolve(__dirname, 'src/components')
            },
            {
                find: '@s',
                replacement: resolve(__dirname, 'src/service')
            },
            {
                find: '@u',
                replacement: resolve(__dirname, 'src/utils')
            },
            {
                find: '/images',
                replacement: '/src/assets/images'
            },
        ]
    }

})
