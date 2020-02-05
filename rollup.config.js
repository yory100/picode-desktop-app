import { terser } from "rollup-plugin-terser";
import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import copy from 'rollup-plugin-copy'

const config = {
  input: './src/index.js',
  output: {
    file: './dist/bundle.js',
    name: 'SomeModule',
    format: 'iife',
    sourcemap: 'inline',
  },
  plugins: [
    babel({
      exclude: /node_modules/
    }),
    resolve(),
    commonjs({ include: /node_modules/ }),
    copy({
      targets: [
        { src: 'src/styles', dest: 'dist/' },
      ]
    }),
    terser()
  ],
  external: ['react', 'react-dom', 'electron'],
}

export default config;
