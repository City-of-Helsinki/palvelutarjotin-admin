const path = require('path');
const CracoSwcPlugin = require('craco-swc');

module.exports = {
  plugins: [
    {
      plugin: CracoSwcPlugin,
      options: {
        swcLoaderOptions: {
          jsc: {
            externalHelpers: true,
            target: 'es2021',
            parser: {
              syntax: 'typescript',
              tsx: true,
              dynamicImport: true,
              exportDefaultFrom: true,
            },
            transform: {
              react: {
                runtime: 'automatic',
              }
            }
          },
        },
      },
    },
  ],
  style: {
    sass: {
      loaderOptions: (sassLoaderOptions, { env, paths }) => {
        const includePaths = [
            path.resolve(__dirname, `src/styles/`)
        ];
        return { 
          ...sassLoaderOptions, 
          sassOptions: {
            ...sassLoaderOptions.sassOptions,
            includePaths 
          }
        };
      }
    }
  }
};