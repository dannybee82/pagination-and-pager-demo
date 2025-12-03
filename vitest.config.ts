import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    watch: false,
    environment: 'jsdom',
    include: ['src/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.ts'],
      exclude: [
        'src/main.ts',
        'src/**/*.spec.ts',
        'src/**/*.test.ts',
        'src/**/*.d.ts'
      ]
    }
  }
});

// Minimal file for trouble shooting
// vitest.config.ts at project root  
// export default defineConfig({  
//   test: {  
//     environment: 'jsdom'  
//   }  
// });