import { describe, it, expect, assert } from 'vitest'
import { mount } from '@vue/test-utils'
import RegisterView from '@/views/registerView.vue'
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

describe('範例', async() => {
  const polly = new Polly('取得會員資料', {
    adapters: ['fetch'],
    persister: 'local-storage',
    logLevel: 'info'
  });
    
  it('取得所有會員的資料', async () => {
    // Arrange
    // Act
    const response = await fetch("https://reqres.in/api/users?page=2")
    const data = await response.json()
    // Assert
    expect(response.status).to.equal(200)
    expect(data.total).to.equal(12)
  })
  await polly.stop()
})

describe('當會員要註冊時', () => {
  const polly = new Polly('當會員註冊時', {
    adapters: ['fetch'],
    persister: 'local-storage',
    logLevel: 'info'
  });

  it('沒填密碼時，會註冊失敗', async () => {
    // Arrange
    const email = "sydney@fife"
    const password = ""

    // Act
    const response = await fetch("https://reqres.in/api/register", {
      method: 'POST',
      headers: { 
        "content-type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })

    const data = await response.json()

    // Assert
    expect(response.status).to.equal(400)
    expect(data.error).to.equal("Missing password")
  })

  it('必要資訊都有填，可成功註冊', async () => {
    // Arrange
    const email = "eve.holt@reqres.in"
    const password = "pistol"

    // Act
    const response = await fetch("https://reqres.in/api/register", {
      method: 'POST',
      headers: { 
        "content-type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })

    const data = await response.json()

    // Assert
    expect(response.status).to.equal(200)
    expect(data.id).toBe(4)
  })
})

describe('當會員資料有缺漏時', () => {
  it('沒填帳號時，會出現錯誤訊息', async() => {
    const wrapper = mount(RegisterView)
    // Arrange
    const account = ""
    const accountInput = wrapper.find('[data-test="account"]')

    // Act
    await accountInput.setValue(account)
    await wrapper.find('form').trigger('submit')

    // Assert
    expect(wrapper.find('[data-test="error"]').text()).toBe("帳號未填寫")
  })

  it('沒有密碼時，會出現錯誤訊息', async() => {
    const wrapper = mount(RegisterView)
    // Arrange
    const password = ""
    const passwordInput = wrapper.find('[data-test="password"]')
    const account = "111111"
    const accountInput = wrapper.find('[data-test="account"]')
    let message = ""

    // Act
    await accountInput.setValue(account)
    await passwordInput.setValue(password)
    await wrapper.find('form').trigger('submit')
    message = await wrapper.find('[data-test="error"]').text()

    // Assert
    // assert.equal(message, "密碼未填寫")
    expect(wrapper.find('[data-test="error"]').text()).toBe("密碼未填寫")
  })

  it ('沒有 email 時，會出現錯誤訊息', async ()=>{
    const wrapper = mount(RegisterView)
    // Arrange
    const password = "aB9044444"
    const passwordInput = wrapper.find('[data-test="password"]')
    const account = "111111"
    const accountInput = wrapper.find('[data-test="account"]')
    const email = ""
    const emailInput = wrapper.find('[data-test="email"]')

    // Act
    await accountInput.setValue(account)
    await passwordInput.setValue(password)
    await emailInput.setValue(email)
    await wrapper.find('form').trigger('submit')

    // Assert
    expect(wrapper.find('[data-test="error"]').text()).to.equal("信箱未填寫")
  })

  it('沒有電話時，會出現錯誤訊息', async() => {
    const wrapper = mount(RegisterView)
    // Arrange
    const password = "aB9044444"
    const passwordInput = wrapper.find('[data-test="password"]')
    const account = "111111"
    const accountInput = wrapper.find('[data-test="account"]')
    const email = "aa@gmail"
    const emailInput = wrapper.find('[data-test="email"]')
    const phone = ""
    const phoneInput = wrapper.find('[data-test="phone"]')

    // Act
    await accountInput.setValue(account)
    await passwordInput.setValue(password)
    await emailInput.setValue(email)
    await phoneInput.setValue(phone)
    await wrapper.find('form').trigger('submit')
    

    // Assert
    expect(wrapper.find('[data-test="error"]').text()).to.equal("手機未填寫")
  })
})

describe('會員密碼限制', () => {
  it('密碼格式須包含英文與數字', async() => {
    const wrapper = mount(RegisterView)
    // Arrange
    const password = "444444444"
    const passwordInput = wrapper.find('[data-test="password"]')
    const account = "111111"
    const accountInput = wrapper.find('[data-test="account"]')

    // Act
    await accountInput.setValue(account)
    await passwordInput.setValue(password)
    await wrapper.find('form').trigger('submit')

    // Assert
    expect(wrapper.find('[data-test="error"]').text()).toBe("密碼須包含英文和數字")
  })

  it('字數要超過 8 位數', async() => {
    const wrapper = mount(RegisterView)
    // Arrange
    const password = "444444"
    const passwordInput = wrapper.find('[data-test="password"]')
    const account = "111111"
    const accountInput = wrapper.find('[data-test="account"]')

    // Act
    await accountInput.setValue(account)
    await passwordInput.setValue(password)
    await wrapper.find('form').trigger('submit')

    // Assert
    expect(wrapper.find('[data-test="error"]').text()).toBe("密碼長度需超過 8 位數")
  })
})

describe('當會員的資料都有填寫且正確時', () => {
  it('要出現註冊成功', async() => {
    const wrapper = mount(RegisterView)
    // Arrange
    const password = "aB9044444"
    const passwordInput = wrapper.find('[data-test="password"]')
    const account = "111111"
    const accountInput = wrapper.find('[data-test="account"]')
    const email = "aa@gmail"
    const emailInput = wrapper.find('[data-test="email"]')
    const phone = "099999999"
    const phoneInput = wrapper.find('[data-test="phone"]')

    // Act
    await accountInput.setValue(account)
    await passwordInput.setValue(password)
    await emailInput.setValue(email)
    await phoneInput.setValue(phone)
    await wrapper.find('form').trigger('submit')
    
    // Assert
    expect(wrapper.find('[data-test="message"]').text()).to.equal("註冊成功")
  })
})