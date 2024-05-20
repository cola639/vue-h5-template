/**
 * format 格式化时间 去掉时分秒
 * 2019-07-30 00:00:00 转化为 2019-07-30
 */
export function formatDate(dateTime) {
  const date = new Date(dateTime)

  // 获取年月日部分
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const dateOnly = `${year}-${month}-${day}`

  return dateOnly
}

/**
 * format 格式化数字
 * 1000 转化为 "1,000" 1000000 转化为 "1,000,000"
 */
export function formatNumber(num) {
  num = String(num)
  return num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') || 0
}

/**
 * formatNumberUnit 格式化数字
 * 传入num unit 超过 以 num / 1000 + unit显示
 * 如1000 转化为 "1k" 1000000 转化为 "10k"....以此类推
 * @param {number} num - 要格式化的数字
 * @param {string} unit - 单位
 * @returns {string} - 格式化后的字符串
 */
export function formatNumberUnit(num, unit = 'k') {
  if (typeof num !== 'number' || typeof unit !== 'string') {
    throw new Error('Invalid input: num should be a number and unit should be a string')
  }

  let newNum = num / 1000

  return `${newNum}${unit}`
}
