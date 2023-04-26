const isProd = process.env.NODE_ENV === 'production'
const path = require('path')
const publicPath = '/web'
const themePath = path.join(__dirname, './src/styles/theme/overwrite.less') // vant theme path
const title = 'Title' // page title

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath,

  devServer: {
    disableHostCheck: true,
    open: false, // default open
    // before: require('./mock/mock-server.js'), // open mock data
    // host: "127.0.0.1",   //指定端口
    // https: true, //开启 https
    proxy: {
      '/api': {
        target: 'http://192.168.2.134:9800',
        changeOrigin: true
        // pathRewrite: {
        //   '^/api': ''
        // }
      }
    }
  },

  configureWebpack(config) {
    // title
    config.name = title

    // dev source map
    config.devtool = isProd ? '' : 'inline-source-map'

    // cancel console.log
    if (isProd) {
      config.optimization.minimizer[0].options.terserOptions.compress.warnings = false
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true
      config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = ['console.log']
    }

    // alias
    config.externals = {
      resolve: {
        alias: {
          '@': resolve('src')
        }
      }
    }
  },

  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/assets/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // visualization webpack only local develop analyzer
    // if (isProd) {
    //   config
    //     .plugin('webpack-bundle-analyzer')
    //     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    // }

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config.when(isProd, config => {
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          vantUI: {
            name: 'chunk-vantUI', // split vantUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?vant-ui(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
      config.optimization.runtimeChunk('single')
    })
  },

  // define css module
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          hack: `true; @import "${themePath}";`
        }
      },
      scss: {
        /* scss-loader版本:若版本低于7，则使用data；高于8，则使用prependData */
        // prependData: "@import './src/styles/variables.scss';" variable scss
      }
    }
  }
}
