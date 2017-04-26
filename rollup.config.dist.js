import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-js-harmony';

export default {
    entry: 'src/parsecnp.js',
    format: 'umd',
    plugins: [
        babel({
            exclude: 'node_modules/**',
            presets: [ 'es2015-rollup' ],
            babelrc: false,
        }),
        uglify({}, minify),
    ],
    moduleName: 'ParseCNP',
    dest: 'dist/parsecnp.min.js',
};
