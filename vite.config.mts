/// <reference types="vitest" />

import angular from '@analogjs/vite-plugin-angular';

import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      angular(),
      
    ],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['src/test-setup.ts'],
      include: ['**/*.spec.ts'],
      reporters: ['default', 'html'], //add: 'html' = to see the code coverage in the browser.
      coverage: {
        provider: "v8",
        reporter: ["text", "json", "html"],
      },

    },
    define: {
      'import.meta.vitest': mode !== 'production',
    },
  };
});
