import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

describe.skip('當會員登入資料正確', () => {
  it('需順利登入，且顯示登入成功', () => {
    const wrapper = mount(LoginView)
    // Arrange

    // Act

    // Assert
  })

  it('登入後，畫面沒有登入及註冊按鈕', () => {
    const wrapper = mount(LoginView)
    // Arrange

    // Act

    // Assert
  })

  it('登入後，畫面需出現登出按鈕', () => {
    const wrapper = mount(LoginView)
    // Arrange

    // Act

    // Assert
  })
})

describe.skip('當會員登入帳號錯誤', () => {
  it('不可登入，且須顯示資訊錯誤', () => {
    const wrapper = mount(LoginView)
    // Arrange

    // Act

    // Assert
  })
})

describe.skip('當會員登入密碼錯誤', () => {
  it('不可登入，且須顯示資訊錯誤', () => {
    const wrapper = mount(LoginView)
    // Arrange

    // Act

    // Assert
  })
})
