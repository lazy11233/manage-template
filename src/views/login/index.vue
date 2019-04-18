<template>
  <div>
    <el-form
      ref="userForm"
      :model="userForm"
      :rules="rules"
      label-position="right"
      label-width="100px"
    >
      <el-form-item prop="username" label="用户名">
        <el-input type="text" v-model="userForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input type="password" v-model="userForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      userForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 15, message: '长度在5-15个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 15, message: '长度在5-15个字符', trigger: 'blur' }
        ]
      },
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions(['login']),
    handleLogin () {
      this.$refs.userForm.validate(valid => {
        if (valid) {
          this.login(this.userForm).then(response => {
            // 登录成功，跳转到目标页面
            this.$router.push({ path: this.redirect || '/' })
          }).catch(() => {
            this.$message.warning('用户名或密码不正确')
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
