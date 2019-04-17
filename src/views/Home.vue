<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <el-button type="primary" size="mini" @click="handleClick">点击获取用户信息</el-button>
    <svg-icon icon-class="home"></svg-icon>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld'
import { getUerInfo } from '@/api/user'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  methods: {
    handleClick () {
      getUerInfo().then(res => {
        console.log(res)
      })
    }
  }
}
</script>
