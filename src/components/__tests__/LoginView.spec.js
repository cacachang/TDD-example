import { describe, it, expect, assert, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import LoginView from '@/views/loginView.vue'
import { assert } from '@vue/compiler-core'
import { Polly } from '@pollyjs/core';
import FetchAdapter from '@pollyjs/adapter-fetch';
import LocalStoragePersister from '@pollyjs/persister-local-storage';
import fetch, { Request, Response } from 'node-fetch'

global.fetch = fetch
global.Request = Request
global.Response = Response

Polly.register(LocalStoragePersister);
Polly.register(FetchAdapter);

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
  let wrapper
  let email
  let wrongPassword

  beforeEach(() => {
    wrapper = mount(LoginView)
    email = 'aa@gmail.com'
    wrongPassword = '56789'
  })

  it('顯示帳號或密碼錯誤', async () => {
    // Arrange
    
    // Act
    await wrapper.find('[data-test="email"]').setValue(email)
    await wrapper.find('[data-test="password"]').setValue(wrongPassword)
    await wrapper.find('form').trigger('submit')

    // Assert
    expect(wrapper.find('[data-test="error"]').text()).toBe("帳號或密碼錯誤")
  })

  it('嘗試登入三次後最終鎖定帳號', async() => {
    // Arrange

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

describe('當會員要登入時', async () => {
  const polly = new Polly('取得會員資料', {
    adapters: ['fetch'],
    persister: 'local-storage',
    logLevel: 'info',
    recordFailedRequests: true, 
  });

  it('帳號密碼都正確，可成功登入', async() => {
    // Arrange
    const email = "eve.holt@reqres.in"
    const password = "cityslicka"

    // Act
    const response = await fetch("https://reqres.in/api/login", {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })

    // Assert
    expect(response.status).to.equal(200)
  })

  it('密碼錯誤，無法登入', async() => {
    // Arrange
    const email = "peter@klaven"

    // Act
    const response = await fetch("https://reqres.in/api/login", {
      method: 'POST',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        email: email
      })
    })
    const data = await response.json()

    // Assert
    expect(response.status).to.equal(400)
    expect(data.error).toBe("Missing password")
  })
  await polly.stop()
})