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
        <el-button @click="submitForm()">登录</el-button>
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
      }
    }
  },
  methods: {
    ...mapActions(['login']),
    submitForm () {
      this.$refs.userForm.validate(valid => {
        if (valid) {
          this.login(this.userForm)
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
