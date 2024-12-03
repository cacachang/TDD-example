import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

describe.skip('當會員登入時', () => {
  it('畫面可顯示會員資料按鈕', () => {
    const wrapper = mount(UserProfileView)
    // Arrange

    // Act

    // Assert
  })

  it('需顯示正確的會員資料', () => {
    const wrapper = mount(UserProfileView)
    // Arrange

    // Act

    // Assert
  })

  it('不可去看其他的會員資料', () => {
    const wrapper = mount(UserProfileView)
    // Arrange

    // Act

    // Assert
  })

  it('可編輯自己的資料', () => {
    const wrapper = mount(UserProfileView)
    // Arrange

    // Act

    // Assert
  })

  it('不可刪除自己的 Profile', () => {
    const wrapper = mount(UserProfileView)
    // Arrange

    // Act

    // Assert
  })
})

describe.skip('當會員登入尚未登入時', () => {
  it('畫面不可顯示會員資料按鈕', () => {
    const wrapper = mount(UserProfileView)
    // Arrange

    // Act

    // Assert
  })

  it('無此畫面', () => {
    const wrapper = mount(UserProfileView)
    // Arrange

    // Act

    // Assert
  })

  it('不可看到其他會員的畫面', () => {
    const wrapper = mount(UserProfileView)
    // Arrange

    // Act

    // Assert
  })
})


