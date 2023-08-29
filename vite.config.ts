/* eslint-disable no-undef */
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(() => ({
  base: '/apps/appname/',
  build: {
    sourcemap: true,
  },
  plugins: [react()],
}));
