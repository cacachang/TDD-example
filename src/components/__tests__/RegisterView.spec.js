import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'


describe('當會員資料有缺漏時', () => {

  it('沒填帳號時，會出現錯誤訊息', () => {
    // Arrange

    // Act

    // Assert
  })

  it.skip('沒有密碼時，會出現錯誤訊息', () => {
    const wrapper = mount(RegisterView)
    // Arrange

    // Act

    // Assert
  })

  it.skip('沒有 email 時，會出現錯誤訊息', () => {
    const wrapper = mount(RegisterView)
    // Arrange

    // Act

    // Assert
  })

  it.skip('沒有電話時，會出現錯誤訊息', () => {
    const wrapper = mount(RegisterView)
    // Arrange

    // Act

    // Assert
  })
})

describe.skip('會員密碼限制', () => {
  it('密碼格式', () => {
    const wrapper = mount(RegisterView)
    // Arrange

    // Act

    // Assert
  })

  it('字數要超過 8 位數', () => {
    const wrapper = mount(RegisterView)
    // Arrange

    // Act

    // Assert
  })
})

describe.skip('當會員資料有正確填寫時', () => {
})
