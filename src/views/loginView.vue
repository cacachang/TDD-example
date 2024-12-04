<template>
  <div class="max-w-md mx-auto mt-8 p-4">
    <h2 class="text-2xl font-bold mb-6">會員登入</h2>
    
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label for="account" class="block mb-1">帳號</label>
        <input 
          id="account"
          v-model="form.account" 
          data-test="account"
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

    <div v-if="user" class="mt-4 p-4 bg-gray-100 rounded">
      <h3 class="font-bold mb-2">使用者資訊</h3>
      <p data-test="user-name">姓名: {{ user.name }}</p>
      <p data-test="user-email">Email: {{ user.email }}</p>
      <p data-test="last-login">上次登入: {{ user.lastLoginTime }}</p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import axios from 'axios'

const form = reactive({
  account: '',
  password: ''
})

const error = ref('')
const success = ref('')
const isLocked = ref(false)
const user = ref(null)
const loginAttempts = ref(0)

const handleSubmit = async () => {
  // 請在此實做
}
</script>