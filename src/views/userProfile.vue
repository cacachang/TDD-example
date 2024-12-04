<template>
 <div v-if="isLoggedIn" class="p-4">
   <button 
     data-test="profile-btn"
     @click="showProfileData = true"
     class="bg-blue-500 text-white px-4 py-2 rounded"
   >
     會員資料
   </button>

   <div v-if="showProfileData" data-test="profile-data" class="mt-4">
     <div v-if="isEditing">
       <input 
         v-model="editForm.name"
         data-test="edit-name" 
         class="border px-2"
       />
       <button
         data-test="save-btn"
         @click="saveEdit"
         class="bg-green-500 text-white px-4 py-2 rounded ml-2"
       >
         儲存
       </button>
     </div>

     <div v-else class="space-y-2">
       <div>
         <span data-test="user-name">{{ userData.name }}</span>
         <button
           v-if="isCurrentUser"
           data-test="edit-btn"
           @click="startEdit"
           class="bg-green-500 text-white px-4 py-2 rounded ml-2"
         >
           編輯
         </button>
       </div>
       <div>
         <span data-test="user-email">{{ userData.email }}</span>
       </div>
     </div>

     <button
       data-test="delete-btn"
       disabled
       class="bg-gray-400 text-white px-4 py-2 rounded mt-4"
     >
       刪除
     </button>
   </div>
 </div>
 <div v-else data-test="unauthorized">
   請先登入
 </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const props = defineProps({
  //  請在此實做
})

const showProfileData = ref(false)
const isEditing = ref(false)

const userData = reactive({
  // 請在此實做
})

const editForm = reactive({
  // 請在此實做
})

const startEdit = () => {
  // 請在此實做
}

const saveEdit = () => {
  // 請在此實做
}
</script>