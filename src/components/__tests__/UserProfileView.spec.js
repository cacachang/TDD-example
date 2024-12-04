import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UserProfileView from '@/views/userProfileView.vue'


describe('當會員登入時', () => {
  it('畫面可顯示會員資料按鈕', () => {
    // Arrange
    const wrapper = mount(UserProfileView, {
      props: {
        isLoggedIn: true
      }
    })

    // Assert
    expect(wrapper.find('[data-test="profile-btn"]').exists()).toBe(true)
  })

  it('需顯示正確的會員資料', async() => {
    // Arrange
    const wrapper = mount(UserProfileView, {
      props: {
        isLoggedIn: true
      }
    })

    // Act
    await wrapper.find('[data-test="profile-btn"]').trigger("click")

    // Assert
    expect(wrapper.find('[data-test="user-name"]').text()).toBe('xxx')
    expect(wrapper.find('[data-test="user-email"]').text()).toBe('xxx@gmail.com')
  })

  it('可編輯自己的資料', async() => {
    // Arrange
    const wrapper = mount(UserProfileView, {
      props: {
        isLoggedIn: true,
        isCurrentUser: true
      }
    })

    // Act
    await wrapper.find('[data-test="profile-btn"]').trigger("click")
    await wrapper.find('[data-test="edit-btn"]').trigger("click")
    await wrapper.find('[data-test="edit-name"]').setValue("aaa")
    await wrapper.find('[data-test="save-btn"]').trigger("click")

    // Assert
    expect(wrapper.find('[data-test="user-name"]').text()).toBe('aaa')
  })

  it('不可刪除自己的 Profile', async() => {
    // Arrange
    const wrapper = mount(UserProfileView, {
      props: {
        isLoggedIn: true,
        isCurrentUser: true
      }
    })

    // Act
    await wrapper.find('[data-test="profile-btn"]').trigger('click')

    // Assert
    expect(wrapper.find('[data-test="delete-btn"]').element.disabled).toBe(true)
  })
})

describe('當會員沒有登入時', () => {
  it('畫面不可顯示會員資料按鈕', () => {
    // Arrange
    const wrapper = mount(UserProfileView, {
      props: {
        isLoggedIn: false,
        isCurrentUser: false
      }
    })

   // Assert
   expect(wrapper.find('[data-test="profile-btn"]').exists()).toBe(false)
  })

  it('無會員資料畫面', () => {
    // Arrange
    const wrapper = mount(UserProfileView, {
      props: {
        isLoggedIn: false,
        isCurrentUser: false
      }
    })

    // Assert
    expect(wrapper.find('[data-test="unauthorized"]').exists()).toBe(true)
  })

  it('不可看到其他會員的畫面', () => {
    // Arrange
    const wrapper = mount(UserProfileView, {
      props: {
        isLoggedIn: false,
        isCurrentUser: false
      }
    })

    // Act

    // Assert
    expect(wrapper.find('[data-test="profile-data"]').exists()).toBe(false)
  })
})