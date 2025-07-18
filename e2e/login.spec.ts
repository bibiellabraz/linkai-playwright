import { test, expect } from '@playwright/test'

test('deve logar com sucesso', async ({ page }) => {
    const user = {
        name: 'gabriella',
        username: 'gabriella',
        password: 'pwd123'
    }

    await page.goto('http://localhost:3000/login');

    await page
        .getByRole('textbox', { name: 'Seu @username incrível' })
        .fill(user.username);

    await page
        .getByRole('textbox', { name: 'Digite sua senha secreta' })
        .fill(user.password);

    await page
        .getByRole('button', { name: 'Entrar' })
        .click();

    await expect(page.locator('h1')).toContainText(`Olá, ${user.name}! 👋`);
});


test('Não deve logar com senha incorreta', async ({ page }) => {

       const user = {
        name: 'gabriella',
        username: 'gabriella',
        password: '123456'
    }

    await page.goto('http://localhost:3000/login');

    await page
        .getByRole('textbox', { name: 'Seu @username incrível' })
        .fill(user.username);

    await page
        .getByRole('textbox', { name: 'Digite sua senha secreta' })
        .fill(user.password);

    await page
        .getByRole('button', { name: 'Entrar' })
        .click();

  await expect(page.getByRole('status')).toContainText('Algo deu errado com seu login. Por favor, verifique suas credenciais e tente novamente.');
});