<template>
  <div id="userLoginPage">
    <h2 class="title">云智慧图库 - 用户注册</h2>
    <div class="desc">智能协同云图库</div>
    <a-form
      :model="formState"
      name="basic"
      autocomplete="off"
      @finish="handleSubmit"
    >
      <a-form-item
        name="userAccount"
        :rules="[{ required: true, message: '请输入用户名!' }]"
      >
        <a-input v-model:value="formState.userAccount" placeholder="请输入用户名" />
      </a-form-item>

      <a-form-item
        name="userPassword"
        :rules="[{ required: true, message: '请输入用户密码!' }, {min : 8, message: '密码长度不能小于8位'}]"
      >
        <a-input-password v-model:value="formState.userPassword" placeholder="请输入用户密码" />
      </a-form-item>


      <a-form-item
        name="checkPassword"
        :rules="[{ required: true, message: '请再次输入用户密码!' }, {min : 8, message: '密码长度不能小于8位'}]"
      >
        <a-input-password v-model:value="formState.checkPassword" placeholder="请再次输入用户密码" />
      </a-form-item>

      <div class="tips">
        已经注册
        <RouterLink to="/user/login">sign in</RouterLink>

      </div>

      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 100%">注册</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
import { userLoginUsingPost, userRegisterUsingPost } from '@/api/userController.ts'
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'
import { message } from 'ant-design-vue'
import router from '@/router'

const loginUserStore = useLoginUserStore()


// 提交表单
const handleSubmit = async (values: any) => {
  // 校验密码是否一致
  if (values.userPassword !== values.checkPassword) {
    message.error('密码不一致')
    return
  }
  const res = await userRegisterUsingPost(values)
  // 注册成功，跳转到登录页
  if (res.data.code === 0 && res.data.data) {
    await loginUserStore.fetchLoginUser()
    message.success('注册成功')
    router.push({
      path: '/user/login',
      replace: true
    })

  } else {
    message.error('注册失败' + res.data.message)
  }
}
// 接受表单输入的值
const formState = reactive<API.UserRegisterRequest>({
  userAccount: '',
  userPassword: '',
  checkPassword: ''
})

</script>


<style scoped>
#userLoginPage {
  max-width: 360px;
  margin: 0 auto;
}

.title {
  text-align: center;
  margin-bottom: 16px;
}

.desc {
  color: #bbb;
  text-align: center;
  margin-bottom: 16px;
}

.tips {
  text-align: center;
  font-size: 13px;
  color: #bbb;
  margin-bottom: 16px;
}

</style>
