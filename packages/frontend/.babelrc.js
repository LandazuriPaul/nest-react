module.exports = {
  presets: [
    '@babel/preset-env',
    ['@babel/preset-typescript', { allExtensions: true, isTSX: true }],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
};
