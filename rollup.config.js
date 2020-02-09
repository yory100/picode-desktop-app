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
    babel({ exclude: /node_modules/ }),
    resolve(),
    commonjs({ include: /node_modules/ }),
    copy({
      targets: [
        { src: 'main_process/*', dest: 'dist/' },
        { src: 'render_process/*', dest: 'dist/' },
        { src: 'src/resources/*', dest: 'dist/' },
        { src: 'src/store/*', dest: 'dist/' }
      ]
    }),
    terser()
  ],
  external: ['react', 'react-dom', 'electron'],
}

export default config;
