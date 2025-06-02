const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  
  // Настройки для разработки в Docker
  devServer: {
    host: '0.0.0.0',       // Доступ вне контейнера
    port: 8080,            // Порт должен совпадать с docker-compose
    hot: false,             // Включение hot-reload
    client: {
      //webSocketURL: 'auto://0.0.0.0:8080/ws'  // Важно для Docker
      //WebSocketURL: false 
    },
    proxy: {
      '/api': {
        target: 'http://server:8080',  // Имя сервиса из docker-compose
        changeOrigin: true,
        secure: false,
        ws: false,   //Для WebSocket
        pathRewrite: {
          '^/api': '/api'  // Не убираем /api при проксировании
        }
      }
    }
  },

  // Настройки для production-сборки
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false
})