import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

import getPageTitle from '@/utils/get-page-title' // title
import { getToken } from '@/utils/auth' // get token from cookie
import { getWxJDK } from '@/api/vote'
import utils from '@/utils'

NProgress.configure({ showSpinner: false }) // NProgress Configuration loading circle

const whiteList = ['/', '/login', '/rank', '/description'] // no redirect whitelist

async function handleSign(to, next) {
  // determine whether the user has signed
  const signFlag = store.getters.signFlag
  if (!signFlag) {
    console.log('user is not sign')
    try {
      const { signFlag } = await store.dispatch('user/getInfo')

      if (!signFlag && to.path !== '/sign') {
        console.log('is not sign ')
        next(`/sign?redirect=${to.path}`)
      } else if (!signFlag && to.path === '/sign') {
        console.log('is need sign no redirect')
        next()
      } else if (signFlag && to.path === '/sign') {
        console.log('async get sign true  sign redirect person')
        next('/person')
      } else {
        console.log('async get sign true next')
        next()
      }
    } catch (error) {
      // remove token and go to login page to re-login
      await store.dispatch('user/resetToken')
      // Message.error(error || 'Has Error')
      // next(`/login?redirect=${to.path}`)
      // NProgress.done()
    }
  } else {
    // user sign redirect to person page
    if (to.path === '/sign') {
      next('/person')
    } else {
      next()
    }
  }
}

function getCodeToken() {
  const code = utils.getUrlParam('code')
  console.log('🚀 ~ router.beforeEach ~ code', code)
  store
    .dispatch('user/login', code)
    .then(() => {
      const redirectUrl = window.location.href.split('?')
      console.log('🚀 get token by code need redirectUrl', redirectUrl)
      window.location.href = redirectUrl[0]
    })
    .catch(() => {})
}

function setWxShare() {
  console.log('start getWx JDK') // debug alert
  getWxJDK()
    .then(res => {
      console.log('wx res', res.data)
      const { appId, timestamp, nonceStr, signature } = res.data

      wx.config({
        debug: false, // 开启调试模式,调用的所有 api 的返回值会在客户端 alert 出来，若要查看传入的参数，可以在 pc 端打开，参数信息会通过 log 打出，仅在 pc 端时才会打印。
        appId, // 必填，公众号的唯一标识
        timestamp, // 必填，生成签名的时间戳
        nonceStr, // 必填，生成签名的随机串
        signature, // 必填，签名
        jsApiList: ['updateAppMessageShareData', 'onMenuShareTimeline'] // 必填，需要使用的 JS 接口列表
      })

      wx.ready(function (res) {
        // alert(`wx.ready->location.href${window.location.href}/assets/forward/logo.png`)
        wx.updateAppMessageShareData({
          title: document.title,
          desc: window.location.href,
          link: window.location.href,
          imgUrl:
            'http://m.qpic.cn/psc?/V11NMhph0LKxVw/bqQfVz5yrrGYSXMvKr.cqS6YuDzX25JJo.KWPpSjr9T9jnL5jJBkOMqHNfAyO98SqM3bIliqL2bd7IjKy6eg4NKBjqVthSYZ2ikVFG*koFk!/b&bo=LAEsAQAAAAADByI!&rf=viewer_4',
          success: function (res) {
            console.log('sucess updateAppMessageShareData', res)
          }
        })
        wx.onMenuShareTimeline({
          title: document.title,
          desc: window.location.href,
          link: window.location.href,
          imgUrl:
            'http://m.qpic.cn/psc?/V11NMhph0LKxVw/bqQfVz5yrrGYSXMvKr.cqS6YuDzX25JJo.KWPpSjr9T9jnL5jJBkOMqHNfAyO98SqM3bIliqL2bd7IjKy6eg4NKBjqVthSYZ2ikVFG*koFk!/b&bo=LAEsAQAAAAADByI!&rf=viewer_4',
          success: function (res) {
            console.log('sucess onMenuShareTimeline', res)
          }
        })
      })
    })
    .catch(() => {})
    .finally(() => {})
}

function redirectWxAuth() {
  const redirectUri = encodeURIComponent(window.location.href)
  const state = null
  const data = {
    redirectUri,
    state
  }
  console.log('🚀 ~ router.beforeEach ~ data', data)
  window.location.href = `${window.location.origin}/api/wx/toAuth?redirectUri=${redirectUri}`
}

router.beforeEach(async (to, from, next) => {
  console.log('to.path', to.path)
  // start progress bar
  NProgress.start()
  // set page title
  document.title = getPageTitle(to.meta.title)
  // determine whether the user has logged in
  const hasToken = getToken()
  const codeIndex = window.location.href.indexOf('code')
  if (hasToken) {
    next()

    // if is go onlineVote about page
    if (whiteList.indexOf(to.path) !== -1) {
      // setWxShare() // Wx share config
      next()
    } else {
      // determine whether the user has signed
      // await handleSign(to, next)
      next()
    }
  } else if (codeIndex !== -1) {
    getCodeToken()
  } else if (to.path === '/show') {
    next()
  } else {
    redirectWxAuth()
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
