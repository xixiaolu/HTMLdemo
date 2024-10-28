<script setup lang="ts">
import { ref } from 'vue'
import { Edit } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
const {msg,isLoading} = defineProps<{ msg: string,isLoading:boolean}>()
const count = ref(0)
const loading = ref(false);
const router = useRouter();
console.log('router',);router
const fn2 = ()=>{
  console.log('router',router);
  router.push("./about");
  // loading.value = true;
  // let timeout = setTimeout(() => {
  //   loading.value = false;
  //   clearTimeout(timeout);
  // }, 5000);
}
</script>

<template>
  <el-button :loading=isLoading type="primary" :icon="Edit">父组件loading按钮</el-button> 
  <el-button :loading=loading type="primary" :icon="Edit" @click=fn2()>本页面loading按钮</el-button> 
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >Vue Docs Scaling up Guide</a
    >.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
