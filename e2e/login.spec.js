// @ts-check
import { test, expect } from "@playwright/test";

test.describe('當使用者填寫正確登入資料時', () => {
  test('需顯示登入成功訊息', async({page}) => {
    // Arrange
    const email = "aa@gmail.com"
    const password = "1234567dfghjk"

    // Act
    await page.goto('http://localhost:5173');
    const loginButton = page.getByRole('link', { name: '登入'})
    await loginButton.click()

    await page.fill('[data-test="email"]', email)
    await page.fill('[data-test="password"]', password)

    await page.getByRole('button', { name: '登入'}).click()

    // Assert
    await expect(page.getByText('登入成功')).toBeVisible();
  })
})

test.describe('當使用者填寫錯誤的登入資料', () => {
  test('需顯示登入錯誤訊息', async({page}) => {
    // Arrange
    const email = "aa@gmail.com"
    const password = '111'

    // Act
    await page.goto('http://localhost:5173');
    const loginButton = page.getByRole('link', { name: '登入'})
    await loginButton.click()

    await page.fill('[data-test="email"]', email)
    await page.fill('[data-test="password"]', password)

    await page.getByRole('button', { name: '登入'}).click()

    // Assert
    await expect(page.getByText('帳號或密碼錯誤')).toBeVisible();
  })
})