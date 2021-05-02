module.exports = {
  publicPath: './',
  devServer: {
    port: 10086,
    open: true,
    proxy: {
      '/workstation': {
        target: 'http://123.124.222.64:8084'
      },
      '/system': {
        target: 'http://123.124.222.64:8084'
      }
    }
  },
  productionSourceMap: false
};
