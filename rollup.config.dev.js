import babel from '@rollup/plugin-babel';

export default {
    input: 'src/ParseCNP.js',
    plugins: [
        babel({
            babelHelpers: 'bundled'
        })
    ],
    output: {
        file: 'dist/ParseCNP.min.js',
        format: 'umd',
        name: 'ParseCNP',
    },
};
