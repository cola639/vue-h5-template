module.exports = () => {
   return {
    plugins: {
        autoprefixer: {},
        'postcss-px-to-viewport': {
          unitToConvert: 'px',      // 需要转换单位
          viewportUnit: 'vw',       // 转换成单位
          viewportWidth: 375,       // 参考UI设计稿宽度 375 | 750 Vant UI基于375px设计稿
          unitPrecision: 6,         // 转换精确小数点
          selectorBlackList: [],    // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
          minPixelValue: 1,         // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
          mediaQuery: false,        // 允许在媒体查询中转换`px`
       // exclude: [/node_modules/] // 忽略转换文件 
        }
      }
  }
}
