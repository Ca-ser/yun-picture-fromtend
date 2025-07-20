import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getLoginUserUsingGet } from '@/api/userController.ts'
/*
 * 存储用户登录状态信息的状态
 * */
// 一个状态就存储一类要共享的数据（存一类常量）
export const useLoginUserStore = defineStore('loginuser', () => {
  const loginUser = ref<API.LoginUserVO>({
    userName: '未登录'
  })

  async function fetchLoginUser() {
    // todo 后端暂未提供接口哦，暂时注释
    const res = await getLoginUserUsingGet()
    if (res.data.code === 0 && res.data.data) {
      loginUser.value = res.data.data;
    }
    // setTimeout(() => {
    //   loginUser.value = {
    //     userName: '张三',
    //     id: 3
    //   }
    // }, 3000)
  }

/*
 * 设置登录用户
 * @param newLoginUser
 * */
function setloginUser(newLoginUser: any) {
  loginUser.value = newLoginUser
}


// 返回
return { loginUser, fetchLoginUser, setloginUser }
})
