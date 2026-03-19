module.exports = {
  parallel: false,
  configureWebpack: {
    optimization: {
      splitChunks: false,
      runtimeChunk: false,
      minimize: false
    }
  }
}