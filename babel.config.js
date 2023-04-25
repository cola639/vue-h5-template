module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  // config vant theme
  plugins: [['import', { libraryName: 'vant', libraryDirectory: 'es', style: true }, 'vant']]
}
