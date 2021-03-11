import babel from '@rollup/plugin-babel';
import { terser } from "rollup-plugin-terser";

export default {
    input: 'src/ParseCNP.js',
    plugins: [
        babel({
            babelHelpers: 'bundled'
        }),
        terser(),
    ],
    output: {
        file: 'dist/ParseCNP.min.js',
        format: 'umd',
        name: 'ParseCNP',
    },
};
