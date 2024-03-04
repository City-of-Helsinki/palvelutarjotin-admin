import viteConfig from './vite.config';
import { defineConfig, mergeConfig } from 'vitest/config';

export default defineConfig((configEnv) =>
  mergeConfig(
    viteConfig(configEnv),
    defineConfig({
      test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './tests/vitest-setup.ts',
        reporters: ['json', 'verbose', 'vitest-sonar-reporter'],
        outputFile: {
          json: 'sonar-report.json',
          'vitest-sonar-reporter': 'sonar-report.xml',
        },
        coverage: {
          provider: 'v8',
          reporter: ['lcov', 'html'],
          exclude: [
            'node_modules/',
            'src/index.tsx',
            'src/domain/api/generatedTypes',
            'public/mockServiceWorker.js',
            'src/setupTests.ts',
          ],
        },
      },
    }),
  ),
);
