// @ts-check
import { test, expect } from "@playwright/test";

test.describe('當使用者點選註冊按鈕', () => {
  test('需出現註冊畫面', async({page}) => {
    // Arrange

    // Act
    await page.goto('http://localhost:5173');

    const registerButton = page.getByRole('link', { name: '註冊'} )
    await registerButton.click()

    await page.waitForTimeout(1000);
    // Assert
    await expect(page.getByRole('heading', { name: '會員註冊'})).toBeVisible();
  })
})

test.describe('當使用者填寫完整資料時', () => {
  test('出現註冊成功訊息', async ({page}) => {
    // Arrange
    const account = 'Ning'
    const email = '11@gmail.com'
    const password = '123456sdfghj'
    const phone = '09345678456'

    // Act
    await page.goto('http://localhost:5173');
    const registerButton = page.getByRole('link', { name: '註冊'} )
    await registerButton.click()

    await page.fill('[data-test="account"]', account)
    await page.fill('[data-test="password"]', password)
    await page.fill('[data-test="email"]', email)
    await page.fill('[data-test="phone"]', phone)

    await page.getByRole('button', { name: '註冊'}).click()

    // Assert
    await expect(page.getByText('註冊成功')).toBeVisible()
  })
})

test.describe('當使用者填寫不正確的資料時', () => {
  test('需有錯誤訊息', async({page}) => {
    // Arrange
    const account = 'Ning'
    const email = '11@gmail.com'
    const password = '1234'
    const phone = '09345678456'

    // Act
    await page.goto('http://localhost:5173');
    const registerButton = page.getByRole('link', { name: '註冊'} )
    await registerButton.click()

    await page.fill('[data-test="account"]', account)
    await page.fill('[data-test="password"]', password)
    await page.fill('[data-test="email"]', email)
    await page.fill('[data-test="phone"]', phone)

    await page.getByRole('button', { name: '註冊'}).click()

    // Assert
    await expect(page.getByText('密碼長度需超過 8 位數')).toBeVisible()
  })
})