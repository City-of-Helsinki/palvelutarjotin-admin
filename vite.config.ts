import path from 'path';

import react from '@vitejs/plugin-react-swc';
import eslint from 'vite-plugin-eslint';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default ({ mode }) => {
  // Load app-level env vars to node-level env vars.
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    define: {
      'process.env': process.env,
    },
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
    },
    server: {
      port: 3000,
      open: true,
    },
    preview: {
      port: 3000,
    },
    plugins: [react(), eslint(), tsconfigPaths()],
  });
};
