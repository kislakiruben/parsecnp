import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/parsecnp.js',
  format: 'umd',
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ],
  moduleName: 'ParseCNP',
  dest: 'dist/parsecnp.min.js',
};
