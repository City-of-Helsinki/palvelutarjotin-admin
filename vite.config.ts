import path from 'path';

import react from '@vitejs/plugin-react-swc';
import { loadEnv } from 'vite';
import eslint from 'vite-plugin-eslint';
import tsconfigPaths from 'vite-tsconfig-paths';
import { configDefaults, defineConfig } from 'vitest/config';

const viteConfig = ({ mode }) => {
  // Load app-level env vars to node-level env vars.
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    define: {
      'process.env': '{}',
    },
    envPrefix: 'VITE_',
    resolve: {
      alias: {
        '~hds-core': path.resolve(__dirname, './node_modules/hds-core'),
        '~hds-design-tokens': path.resolve(
          __dirname,
          './node_modules/hds-design-tokens'
        ),
        '~styles': path.resolve(__dirname, './src/styles'),
      },
    },
    build: {
      outDir: 'build',
      sourcemap: true,
    },
    test: {
      exclude: [...configDefaults.exclude, '**/playwright/**'],
    },
    server: {
      port: parseInt(process.env.PORT ?? '3000'),
      open: true,
    },
    preview: {
      port: parseInt(process.env.PORT ?? '3000'),
    },
    plugins: [react(), eslint(), tsconfigPaths()],
  });
};

export default viteConfig;
