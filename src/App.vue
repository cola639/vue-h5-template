<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  // 当前版本号
  mounted() {
    console.log(
      `%cVER: ${process.env.VUE_APP_VER}`,
      'background-color: #07c160 ; color: white ; font-weight: bold ; padding: 10px; border-radius: 8px;' +
        'font-size: 20px ; font-style: italic ;  ' +
        "font-family: 'american typewriter' ; text-shadow: 1px 1px 3px black ;"
    )
  }
}
</script>

<style lang="scss"></style>
