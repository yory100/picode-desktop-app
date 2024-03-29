import { terser } from "rollup-plugin-terser";
import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import copy from 'rollup-plugin-copy';

const config = {
  input: './src/index.js',
  output: {
    file: './dist/bundle.js',
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
    format: 'iife',
    sourcemap: 'inline',
  },
  plugins: [
    resolve(),
    babel({ exclude: 'node_modules/**' }),
    commonjs({
      include: 'node_modules/**',
      exclude: [
        'node_modules/process-es6/**',
      ],
      namedExports: {
        'node_modules/react/index.js': [
          'Children', 'Component', 'createElement', 'PropTypes', 'useState', 'useEffect'
        ],
        'node_modules/react-dom/index.js': ['render'],
      }
    }),
    copy({
      targets: [
        { src: 'render_process/*', dest: 'dist/' },
        { src: 'src/store/*', dest: 'dist/' }
      ]
    }),
    terser()
  ]
}

export default config;
