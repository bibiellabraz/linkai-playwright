import { test, expect } from '@playwright/test'

import { getLoginPage } from '../support/pages/LoginPage'
import { getDashPage } from '../support/pages/DashPage'
import { getToast } from '../support/pages/Components/Toast';

import { UserLogin, Users } from '../support/fixtures/User'

test('deve logar com sucesso', async ({ page }) => {

    const loginPage = getLoginPage(page)
    const DashPage = getDashPage(page)
    const toast = getToast(page)

    const user: UserLogin = Users.validUser

    await loginPage.open()
    await loginPage.submit(user)

    await expect(DashPage.welcome()).toContainText(`Olá, ${user.name}! 👋`)
    await expect(toast.element()).toContainText('Login realizado com sucesso!')
    await expect(toast.element()).toContainText('Bem-vindo de volta ao Linkaí.')
});

test('Não deve logar com senha incorreta', async ({ page }) => {

    const loginPage = getLoginPage(page)
    const toast = getToast(page)

    const user: UserLogin = Users.WrongPassword

    await loginPage.open()
    await loginPage.submit(user)

    await expect(toast.element()).toContainText('Oops!')
    await expect(toast.element()).toContainText('Algo deu errado com seu login. Por favor, verifique suas credenciais e tente novamente.')
});

test('Não deve logar com usuário NÃO cadastrado', async ({ page }) => {

    const loginPage = getLoginPage(page)
    const toast = getToast(page)

    const user: UserLogin = Users.userNotFound

    await loginPage.open()
    await loginPage.submit(user)

    await expect(toast.element()).toContainText('Oops!')
    await expect(toast.element()).toContainText('Algo deu errado com seu login. Por favor, verifique suas credenciais e tente novamente.')
});

test('Não deve logar quando não informo nenhum dos campos', async ({ page }) => {

    const loginPage = getLoginPage(page)
    const toast = getToast(page)

    const user: UserLogin = Users.emptyFields

    await loginPage.open()
    await loginPage.submit(user)

    await expect(toast.element()).toContainText('Campos obrigatórios')
    await expect(toast.element()).toContainText('Por favor, preencha todos os campos.')
});

test('Não deve logar quando não informo o usuário', async ({ page }) => {

    const loginPage = getLoginPage(page)
    const toast = getToast(page)

    const user: UserLogin = Users.missingUsername

    await loginPage.open()
    await loginPage.submit(user)

    await expect(toast.element()).toContainText('Campos obrigatórios')
    await expect(toast.element()).toContainText('Por favor, preencha todos os campos.')
});

test('Não deve logar quando não informo a senha', async ({ page }) => {

    const loginPage = getLoginPage(page)
    const toast = getToast(page)

    const user: UserLogin = Users.missingPassword

    await loginPage.open()
    await loginPage.submit(user)

    await expect(toast.element()).toContainText('Campos obrigatórios')
    await expect(toast.element()).toContainText('Por favor, preencha todos os campos.')
});