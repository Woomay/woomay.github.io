module.exports = {
  devServer: {
    open: true,
    port: 8989
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/woomay.github.io/'
    : '/'
}