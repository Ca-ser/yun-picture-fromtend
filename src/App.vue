
<template>
  <div id="app">
    <BasicLayout />
  </div>
</template>
<script setup lang="ts">

import BasicLayout from '@/layouts/BasicLayout.vue'
import { helloUsingGet } from '@/api/mainController.ts'
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'

const loginUserStore = useLoginUserStore()
loginUserStore.fetchLoginUser()


helloUsingGet().then((res) =>{
  console.log(res)
})
</script>

<style scoped>

</style>
