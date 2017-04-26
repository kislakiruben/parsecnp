import babel from 'rollup-plugin-babel';

export default {
    entry: 'src/parsecnp.js',
    format: 'umd',
    plugins: [
        babel({
            exclude: 'node_modules/**',
            presets: [ 'es2015-rollup' ],
            babelrc: false,
        })
    ],
    moduleName: 'ParseCNP',
    dest: 'dist/parsecnp.min.js',
};
