<template>
  <div class="max-w-md mx-auto mt-8 p-4">
    <h2 class="text-2xl font-bold mb-6">會員登入</h2>
    
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label for="email" class="block mb-1">信箱</label>
        <input 
          id="email"
          v-model="form.email" 
          data-test="email"
          type="text"
          class="w-full border rounded px-3 py-2"
          :disabled="isLocked"
          required
        >
      </div>

      <div>
        <label for="password" class="block mb-1">密碼</label>
        <input 
          id="password"
          v-model="form.password"
          data-test="password" 
          type="password"
          class="w-full border rounded px-3 py-2"
          :disabled="isLocked"
          required
        >
      </div>

      <div v-if="error" data-test="error" class="text-red-500">
        {{ error }}
      </div>

      <div v-if="success" data-test="success" class="text-green-500">
        {{ success }}
      </div>

      <button 
        type="submit"
        data-test="submit"
        :disabled="isLocked"
        class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        登入
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const MAX_ATTEMPTS = 3
const LOCK_TIME = 15 * 60 * 1000

const form = reactive({
  email: '',
  password: ''
})

const error = ref('')
const success = ref('')

const user = reactive({
  email: 'aa@gmail.com',
  password: '1234567dfghjk'
})

const isLocked = ref(false)
const loginAttempts = ref(0)

const handleSubmit = () => {
  if (form.email === user.email && form.password === user.password) {
    success.value = '登入成功'
  } else {
    loginAttempts.value++

    if(loginAttempts.value >= MAX_ATTEMPTS) {
      error.value = "帳號已鎖定，請15分鐘後再試"
      isLocked.value = true
    } else {
      error.value = '帳號或密碼錯誤'
    }
  }
}
</script>