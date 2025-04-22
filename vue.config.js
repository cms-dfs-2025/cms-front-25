const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: `http://localhost:${process.env.SERVER_PORT}`
  }
})
