import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import { defineConfig } from 'vitest/config';
import { loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  if (mode === 'production' && !env.VITE_SERVER_URL) {
    throw new Error('VITE_SERVER_URL is not set');
  }
  return {
    plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
    test: {
      environment: 'jsdom',
      include: ['src/**/*.test.{ts,tsx}'],
    },
  };
});
