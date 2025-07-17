import { test, expect } from '@playwright/test'

test('deve logar com sucesso', async ({ page }) => {
        const user = {
        username: 'gabriella',
        password: 'pwd123'
    }

    await page.goto('http://localhost:3000/login');

    await page
        .getByRole('textbox', { name: 'Seu @username incrível' })
        .fill('user.username');

    await page
        .getByRole('textbox', { name: 'Digite sua senha secreta' })
        .fill('user.password');

    await page
        .getByRole('button', { name: 'Entrar' })
        .click();

    await expect(page.locator('h1')).toContainText('Olá, gabriella! 👋');
});