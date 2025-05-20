const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    https:true,
    port: 8080,
    allowedHosts: 'all' // Permite todos los hosts, incluido el de ngrok
  }
})
