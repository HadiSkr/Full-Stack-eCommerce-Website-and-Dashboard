module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhostp',
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    }
  };