const path = require('path')

module.exports = ({ file }) => {
  console.log('🚀 >> file:', file)
  // const designWidth = webpack.resourcePath.includes(
  //   path.join('node_modules', 'vant')
  // )
  //   ? 375
  //   : 750

  return {
    // plugins: {
    //   autoprefixer: {},
    //   'postcss-px-to-viewport': {
    //     unitToConvert: 'px', // unit convert
    //     viewportWidth: designWidth, // window.innerWidth
    //     unitPrecision: 6, // unit precision
    //     propList: ['*'], // convert all css unit
    //     viewportUnit: 'vw', // unit view port
    //     fontViewportUnit: 'vw', // unit font size
    //     selectorBlackList: [], // ignore class
    //     exclude: [/node_modules/], // ignore files
    //     minPixelValue: 1, // ignore <= 1px
    //     mediaQuery: true, // ignore media
    //     landscape: false // ignore landscape
    //   }
    // }

    plugins: {
        autoprefixer: {},
        'postcss-px-to-viewport': {
          unitToConvert: 'px',      // 需要转换单位
          viewportUnit: 'vw',       // 转换成单位
          viewportWidth: 375,       // 参考UI设计稿宽度 375 | 750
          unitPrecision: 6,         // 转换精确小数点
          selectorBlackList: [],    // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
          minPixelValue: 1,         // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
          mediaQuery: false,        // 允许在媒体查询中转换`px`
       // exclude: [/node_modules/] // 忽略转换文件 
        }
      }
  }
}
