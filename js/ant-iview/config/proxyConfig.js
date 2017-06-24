module.exports = {
  proxyList: {
    '/angel':{
        target: 'http://localhost:8081',
        pathRewrite: {
          '^/angel': '/angel'
        }
    }
  }
}