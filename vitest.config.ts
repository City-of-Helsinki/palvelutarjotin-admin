// eslint-disable-next-line import/no-unresolved
import { defineConfig, mergeConfig } from 'vitest/config';

import viteConfig from './vite.config';

export default defineConfig((configEnv) =>
  mergeConfig(
    viteConfig(configEnv),
    defineConfig({
      test: {
        testTimeout: 5_000, // ms
        css: {
          modules: {
            // Set class name strategy to 'non-scoped' so tests can easily test
            // for class names, e.g. 'hds-button' instead of 'hds-button-1af82':
            classNameStrategy: 'non-scoped',
          },
        },
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/test/vitest-setup.ts',
        reporters: ['json', 'verbose', 'vitest-sonar-reporter'],
        outputFile: {
          json: 'sonar-report.json',
          'vitest-sonar-reporter': 'sonar-report.xml',
        },
        coverage: {
          provider: 'v8',
          reporter: ['lcov', 'html'],
          exclude: [
            '**/__snapshots__/**',
            '**/__tests__/**',
            '**/node_modules/**',
            'src/generated/**',
            'src/setupTests.ts',
          ],
        },
      },
    })
  )
);
