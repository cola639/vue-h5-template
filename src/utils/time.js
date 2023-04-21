export function countTime() {
  //  endTime = new Date('2022-8-26 00:00:00')
  const endTime = new Date('2022-8-26 00:00:00')
  let date1 = new Date().getTime() //开始时间
  let date2 = new Date(endTime).getTime() //结束时间
  let date3 = Math.floor(date2 - date1) // 时间戳差
  //计算出相差天数
  let days = Math.floor(date3 / (24 * 3600 * 1000))
  //计算出小时数
  let leave1 = date3 % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
  let hours = Math.floor(leave1 / (3600 * 1000))
  //计算相差分钟数
  let leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
  let minutes = Math.floor(leave2 / (60 * 1000))
  //计算相差秒数
  let leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
  let seconds = Math.round(leave3 / 1000)

  const res = days + '天 ' + hours + '小时 ' + minutes + ' 分钟' + seconds + ' 秒' // 运算符转字符串

  return res
}
