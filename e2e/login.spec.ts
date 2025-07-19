import { test, expect } from '@playwright/test'

import { getLoginPage } from '../support/pages/LoginPage'
import { getDashPage } from '../support/pages/DashPage'
import { getToast } from '../support/pages/Components/Toast';

test('deve logar com sucesso', async ({ page }) => {

    const loginPage = getLoginPage(page)
    const DashPage = getDashPage(page)
    const toast = getToast(page)

    const user = {
        name: 'gabriella',
        username: 'gabriella',
        password: 'pwd123'
    }

    await loginPage.open()
    await loginPage.submit(user.username, user.password)

    await expect(DashPage.welcome()).toContainText(`Olá, ${user.name}! 👋`)
    await expect(toast.element()).toContainText('Login realizado com sucesso!')
    await expect(toast.element()).toContainText('Bem-vindo de volta ao Linkaí.')
});

test('Não deve logar com senha incorreta', async ({ page }) => {

    const loginPage = getLoginPage(page)
    const toast = getToast(page)

    const user = {
        name: 'gabriella',
        username: 'gabriella',
        password: '123456'
    }

    await loginPage.open()
    await loginPage.submit(user.username, user.password)

    await expect(toast.element()).toContainText('Oops!')
    await expect(toast.element()).toContainText('Algo deu errado com seu login. Por favor, verifique suas credenciais e tente novamente.')
});

test('Não deve logar com usuário não cadastrado', async ({ page }) => {

    const loginPage = getLoginPage(page)
    const toast = getToast(page)

    const user = {
        name: 'gabriella',
        username: 'not-found',
        password: '123456'
    }

    await loginPage.open()
    await loginPage.submit(user.username, user.password)

    await expect(toast.element()).toContainText('Oops!')
    await expect(toast.element()).toContainText('Algo deu errado com seu login. Por favor, verifique suas credenciais e tente novamente.')
});