import babel from 'rollup-plugin-babel';

export default {
    entry: 'src/ParseCNP.js',
    format: 'umd',
    plugins: [
        babel({
            exclude: 'node_modules/**',
            presets: [ 'es2015-rollup' ],
            babelrc: false,
        })
    ],
    moduleName: 'ParseCNP',
    dest: 'dist/ParseCNP.min.js',
};
