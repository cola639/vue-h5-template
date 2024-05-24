<template>
  <div class="chatwrap">
    <div v-if="!contecting" class="loginbox">
      <div class="flex-space-between loginbox_title">
        <span>在线咨询</span>
        <span class="loginbox_title_close" @click="closeConsult"> X </span>
      </div>
      <div class="loginbox_content">
        <div class="rc loginbox_content_form">
          <el-form ref="loginForm" label-width="8rem" :model="loginForm" :rules="loginRules">
            <el-form-item label="姓名/单位名称：" prop="username">
              <el-input class="ccf_item" v-model="loginForm.username" type="text"> </el-input>
            </el-form-item>
            <el-form-item label="手机号码：" prop="phone">
              <el-input class="ccf_item" v-model="loginForm.phone" type="text"> </el-input>
            </el-form-item>
            <el-form-item label="地址：" prop="address">
              <el-input class="ccf_item" v-model="loginForm.address" type="text"> </el-input>
            </el-form-item>
            <el-form-item label="验证码：" prop="code">
              <el-input class="ccf_item ccf_item_code" v-model="loginForm.code" type="text" />
              <img class="ccf_item_img" :src="captchUrl" @click="debounceGetCaptch" />
            </el-form-item>
            <el-form-item>
              <el-button class="cancel_btn" size="small" type="info" @click="closeConsult">
                取消
              </el-button>
              <el-button class="login_btn" size="small" type="primary" @click="login">
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>

    <div v-if="contecting" class="chatbox">
      <div class="flex-center chatbox_header">
        <svg
          @click="backLogin"
          width="20"
          height="20"
          viewbox="0 0 18 18"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15 8.25H5.87l4.19-4.19L9 3 3 9l6 6 1.06-1.06-4.19-4.19H15v-1.5z"></path>
        </svg>
        <div class="title">中新客服</div>
        <div class="close" @click="closeChating">X</div>
      </div>
      <div class="chatbox_body" ref="chatbody">
        <div
          v-for="(item, index) in chatArr"
          :key="index"
          :class="[item.user === 'service' ? 'receive' : 'sender', 'message']"
        >
          <img
            :src="
              item.user === 'service' ? require('@/assets/service.jpg') : require('@/assets/me.jpg')
            "
          />
          <div class="message_text">{{ item.content }}</div>
        </div>
        <div v-if="wsClose" class="bottom">--- 连线已关闭，对话结束 ---</div>
      </div>
      <div v-if="!wsClose" class="chatbox_input">
        <input v-model="userInput" placeholder="输入文字发送" @keydown.enter="sendMessage" />
        <button title="发送" @click="sendMessage">
          <svg width="36" height="36" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { validatePhone, debounce, deepClone } from '@/utils'
import { getCaptchCode } from '@/api/information.js'
export default {
  name: 'ChatBox',
  components: {},
  data() {
    return {
      captchUrl: '',
      userInput: '',
      firstConnect: false,
      contecting: false,
      ws: undefined, // ws对象
      wsClose: undefined,
      chatArr: [],
      loginForm: {
        username: '',
        phone: '',
        address: '',
        code: '',
        uuid: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '请输入您的账号' }],
        phone: [
          {
            required: true,
            validator: validatePhone,
            message: '手机号格式不正确',
            trigger: 'blur'
          }
        ],
        address: [{ required: true, trigger: 'blur', message: '请输入您的地址' }],
        code: [{ required: true, trigger: 'blur', message: '请输入验证码' }]
      },
      debounceGetCaptch: null
    }
  },
  props: {
    closeConsult: { type: Function, required: true }
  },
  created() {
    this.debounceGetCaptch = debounce(this.getCaptch, 300)
  },
  mounted() {
    const localForm = JSON.parse(localStorage.getItem('loginForm'))
    localForm ? (this.loginForm = localForm) : null
    this.getCaptch()
  },
  beforeDestroy() {},
  computed: {},
  watch: {},
  methods: {
    getCaptch() {
      getCaptchCode().then(res => {
        this.captchUrl = 'data:image/gif;base64,' + res.img
        this.loginForm.uuid = res.uuid
        console.log('🚀 >> getCaptchCode >> res', res)
      })
    },

    login() {
      this.$refs.loginForm.validate(valid => {
        if (!valid)
          return this.$message({
            type: 'error',
            message: '请检查资料是否填写完整!'
          })

        if (valid) {
          const loginForm = deepClone(this.loginForm)
          delete loginForm.uuid
          delete loginForm.code

          const arr = Object.values(loginForm)
          localStorage.setItem('loginForm', JSON.stringify(loginForm))
          if (this.isRepeat(arr))
            return this.$message({
              type: 'error',
              message: '资料存在重复项！'
            })

          let cname = encodeURIComponent(this.loginForm.username) // 名称
          let address = encodeURIComponent(this.loginForm.address) // 地址
          let mobile = this.loginForm.phone // 手机号
          let uuid = this.loginForm.uuid // uuid
          let code = this.loginForm.code // 验证码
          let protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
          const url = `${protocol}//${window.location.host}/chat/wss` //线上
          // const url = `wss://gztisc.fabaogd.com/chat/wss` // 本地开发

          console.log('prepare websocket url', url)
          // 18826078154
          this.firstConnect = true
          this.ws = new WebSocket(url, [cname, mobile, address, uuid, code])
          this.ws.onmessage = e => {
            this.wsClose = undefined
            this.contecting = true //展示
            const tempParse = JSON.parse(e.data)
            this.receiveMessage(tempParse.data.content)
            console.log('服务器信息', tempParse.data.content)
            // 消息接收
          }
          this.ws.onclose = e => {
            this.firstConnect = false
            this.wsClose = true
            console.log('服务器连接关闭', e)
            // 连接关闭
          }
          this.ws.onerror = e => {
            console.log('服务器连接出错', e)
            // 连接异常

            if (this.firstConnect) {
              this.$message({
                type: 'error',
                message: '检查验证码是否正确!'
              })
              this.getCaptch()
            }
          }
        }
      })
    },

    sendMessage() {
      if (!this.userInput.trim())
        return this.$message({
          message: '消息为空',
          type: 'warning'
        })

      const obj = {
        user: 'me',
        time: new Date().getTime(),
        content: this.userInput
      }

      this.chatArr.push(obj)
      this.ws.send(JSON.stringify({ type: 'msg', msg: this.userInput }))
      this.userInput = ''

      // 下一轮周期再渲染页面 滚动到底部
      this.$nextTick(() => {
        this.$refs.chatbody.scrollTop = this.$refs.chatbody.scrollHeight
      })
    },

    receiveMessage(content) {
      const obj = {
        user: 'service',
        time: new Date().getTime(),
        content
      }
      this.chatArr.push(obj)
    },

    backLogin() {
      console.log('back login')
      this.chatArr = []
      this.contecting = false
      this.wsClose = undefined
      this.ws.close()
      this.getCaptch()
    },

    closeChating() {
      console.log('close ws and reset chat')
      this.chatArr = []
      this.wsClose = undefined
      this.ws.close()
      this.closeConsult()
    },

    isRepeat(arr) {
      const hash = {}
      for (let i in arr) {
        if (hash[arr[i]]) return true
        hash[arr[i]] = true
      }
      return false
    },

    resetStatus() {
      this.firstConnect = false
      this.wsClose = false
      this.ws = undefined
      this.contecting = false
    }
  }
}
</script>
<style lang="scss" scoped>
* {
  box-sizing: border-box;
  position: relative;
  font-family: 'Dosis', sans-serif !important;
}

.loginbox {
  width: 30.25rem;
  height: 23.9375rem;
  border: 0.5px solid #4883e9;
  background-color: #efefef;
  &_title {
    color: #fff;
    height: 2.1875rem;
    line-height: 2.1875rem;
    background-color: #4883e9;
    text-indent: 1em;
    font-size: 0.875rem;
    padding-right: 1rem;
    &_close {
      width: 30px;
      height: 30px;
    }
  }
  &_content {
    width: 100%;
    position: relative;
    &_box,
    &_form {
      margin-top: 0.3rem;
      padding: 0.5rem;
      width: 28.4375rem;
      height: 20.5625rem;
      background-color: #fff;
      .ccf_item {
        width: 18.0625rem;
        height: 1.875rem;
      }
      .ccf_item_code {
        width: 11.875rem;
      }
      .ccf_item_img {
        position: relative;
        top: 0.5rem;
        width: 6rem;
        height: 1.875rem;
        margin-left: 5px;
      }
    }

    .ccb_send {
      height: 2.375rem;
      position: fixed;
      bottom: 1rem;
      border-radius: 6px;
      left: 50%;
      transform: translateX(-50%);
      width: 88%;
    }
  }
  .cancel_btn {
    margin-top: 15px;
  }
  .login_btn {
    margin-left: 2.5rem;
  }
}

.loginbox_content_box {
  padding: 0.5rem;
  padding-bottom: 5rem;
  overflow-y: scroll;
  overflow-x: hidden;

  .ccb_service {
    margin-top: 0.8rem;
    letter-spacing: 0.5px;
    font-size: 15px;
    .name {
      white-space: nowrap;
    }
    .sentence {
      margin-left: 0.2rem;
      line-height: 1.2rem;
      padding-right: 2.8rem;
    }
  }
  .ccb_own {
    margin-top: 0.8rem;
    letter-spacing: 0.5px;
    font-size: 15px;
    .name {
      white-space: nowrap;
    }
    .sentence {
      margin-right: 0.2rem;
      line-height: 1.2rem;
      padding-left: 2.5rem;
    }
  }
}

.chatbox {
  position: relative;
  background: #fafafa;
  width: 30.25rem;
  width: 30.25rem;
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.21), 0px 30px 20px -10px rgba(0, 0, 0, 0.2),
    0px 60px 20px -30px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  &_header {
    width: 100%;
    height: 50px;
    background: #66b1ff;
    .title {
      color: #fff;
      text-align: center;
    }
    svg {
      cursor: pointer;
      position: absolute;
      left: 20px;
      fill: white;
      transition: 0.3s ease-in-out;
    }
    svg:hover {
      transform: translateX(-5px);
      transition: 0.3s ease-in-out;
    }
    .close {
      cursor: pointer;
      position: absolute;
      right: 20px;
      color: #fff;
      transition: 0.3s ease-in-out;
    }
    .close:hover {
      transform: scale(1.5);
      transition: 0.3s ease-in-out;
    }
  }

  &_body {
    height: 21rem;
    width: 100%;
    background: #f5f5f5;
    display: flex;
    flex-direction: column;
    overflow: auto;
    padding: 10px 10px 20px;
    padding-bottom: 1rem;
    &::-webkit-scrollbar {
      background: #fff;
      border-radius: 2px;
      width: 15px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 12px;
      background: #fefefe;
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
    }

    .message {
      display: block;
      width: auto;
      margin: 5px;
      align-self: flex-start;
      flex-direction: row;
      max-width: 80%;
      word-wrap: break-word;
      img {
        width: 24px;
        height: 24px;
        border-radius: 15px;
        -webkit-animation: image 0.2s;
        animation: image 0.2s;
      }
    }

    .message.sender {
      color: white;
      align-self: flex-end;
      padding-right: 30px;
      .message_text {
        margin-right: 10px;
        background: #ff9966;
        background: linear-gradient(to left, #ff5e62, #ff9966);
        padding: 10px;
        border-radius: 3px;
        z-index: 99;
        animation: starkMessage 0.2s;
        -webkit-animation: starkMessage 0.2s;
      }
      .message_text:after {
        position: absolute;
        content: ' ';
        right: -5px;
        bottom: 0;
        border-left: solid 10px #ff5e62;
        border-top: solid 10px transparent;
        z-index: 0;
      }
      img {
        position: absolute;
        right: 0;
        bottom: -15px;
      }
    }

    .message.receive {
      padding-left: 30px;
      .message_text {
        margin-left: 10px;
        padding: 10px;
        border-radius: 3px;
        background: #fff;
        animation: starkMessage 0.2s;
        -webkit-animation: starkMessage 0.2s;
      }
      .message_text:before {
        position: absolute;
        content: ' ';
        left: -5px;
        bottom: 0;
        border-right: solid 10px #fff;
        border-top: solid 10px transparent;
        z-index: 0;
      }
      img {
        position: absolute;
        left: 0;
        bottom: -15px;
      }
    }

    .bottom {
      margin-top: 2rem;
      align-self: center;
      color: #999;
    }
  }

  &_input {
    display: flex;
    width: 100%;
    background: #fff;
    height: 50px;
    border-top: 0.5px solid #efefef;
    input {
      flex: 3;
      padding: 1em 2em;
      outline: none;
      border: 0;
      letter-spacing: 0.1em;
      border-right: 1px solid #66b1ff;
      &::placeholder {
        color: #dedede;
        opacity: 1;
      }
    }

    button {
      cursor: pointer;
      outline: none;
      border: 0;
      flex: 1;
      background: white;
      text-align: center;
    }
    svg {
      margin-top: 0.625rem;
      fill: #66b1ff;
    }
  }
}

@keyframes starkMessage {
  from {
    transform: scale(0.9);
  }
  80% {
    transform: scale(1.05);
  }
  to {
    transform: scale(1);
  }
}

@keyframes image {
  from {
    bottom: -50px;
  }
  to {
    bottom: -15px;
  }
}

::v-deep .el-form-item {
  padding-left: 1rem;
  margin-top: 0.9rem;
  .el-input__inner {
    height: 1.875rem;
    border: 0.5px solid #c0c4cc;
  }
}

::v-deep .input-content {
  height: 2.5rem;
  .el-input-group__append {
    width: 20%;
    text-align: center;
    background-color: #376fd9;
    color: #fff;
  }
}
</style>
