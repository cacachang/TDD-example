import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UserProfileView from '@/views/userProfileView.vue'
import { Polly } from '@pollyjs/core';
import FetchAdapter from '@pollyjs/adapter-fetch';
import LocalStoragePersister from '@pollyjs/persister-local-storage';
import fetch, { Request, Response } from 'node-fetch'

global.fetch = fetch
global.Request = Request
global.Response = Response

Polly.register(LocalStoragePersister);
Polly.register(FetchAdapter);


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

describe('當會員要編輯資料時', async () => {
  const polly = new Polly('取得會員資料', {
    adapters: ['fetch'],
    persister: 'local-storage',
    logLevel: 'info',
    recordFailedRequests: true, 
  });

  it('可編輯成功', async () => {
    // Arrange
    const name = "morpheus"
    const job = "zion resident"

    // Act
    const response = await fetch("https://reqres.in/api/users/2", {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        job: job
      })
    })

    const data = await response.json()
    // Assert
    expect(response.status).to.equal(200)
    expect(data.name).toBe("morpheus")
    expect(data.job).toBe("zion resident")
  })

  await polly.stop()
})