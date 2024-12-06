import { describe, it, expect, assert } from 'vitest'
import { mount } from '@vue/test-utils'
import LoginView from '@/views/loginView.vue'
import { assert } from '@vue/compiler-core'

describe('當會員登入資料正確', () => {
  it('需順利登入，且顯示登入成功', async () => {
    const wrapper = mount(LoginView)
    // Arrange
    const email = 'aa@gmail.com'
    const password = '1234567dfghjk'

    // Act
    await wrapper.find('[data-test="email"]').setValue(email)
    await wrapper.find('[data-test="password"]').setValue(password)
    await wrapper.find('form').trigger('submit')

    // Assert
    expect(wrapper.find('[data-test="success"]').text()).toBe("登入成功")
  })
})

describe('當會員登入資料錯誤時', () => {
  const MAX_ATTEMPTS = 3

  it('顯示帳號或密碼錯誤', async () => {
    const wrapper = mount(LoginView)
    // Arrange
    const email = 'aa@gmail.com'
    const wrongPassword = '56789'

    // Act
    await wrapper.find('[data-test="email"]').setValue(email)
    await wrapper.find('[data-test="password"]').setValue(wrongPassword)
    await wrapper.find('form').trigger('submit')

    // Assert
    expect(wrapper.find('[data-test="error"]').text()).toBe("帳號或密碼錯誤")
  })

  it('嘗試登入三次後最終鎖定帳號', async() => {
    const wrapper = mount(LoginView)
    // Arrange
    const email = 'aa@gmail.com'
    const wrongPassword = '56789'

    // Act
    for(let i = 1; i <= MAX_ATTEMPTS; i++){
      await wrapper.find('[data-test="email"]').setValue(email)
      await wrapper.find('[data-test="password"]').setValue(wrongPassword)
      await wrapper.find('form').trigger('submit')
    }

    // Assert
    expect(wrapper.find('[data-test="error"]').text()).toBe("帳號已鎖定，請15分鐘後再試")
  })
})