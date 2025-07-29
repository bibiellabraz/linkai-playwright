import { test, expect } from '@playwright/test'

import { getSignupPage } from '../support/pages/SignupPage'
import { getDashPage } from '../support/pages/DashPage'
import { getToast } from '../support/pages/Components/Toast'

import { UserSignup, getNewUser } from '../support/fixtures/User'

test('Deve cadastrar um novo usuário com sucesso.', async ({ page }) => {

    const SignupPage = getSignupPage(page)
    const DashPage = getDashPage(page)
    const toast = getToast(page)

    const user: UserSignup = getNewUser()

    await SignupPage.open()
    await SignupPage.fill(user)
    await SignupPage.submit()

    await expect(DashPage.welcome()).toContainText(`Olá, ${user.name}! 👋`)
    await expect(toast.element()).toContainText('Conta criada com sucesso!')
    await expect(toast.element()).toContainText('Bem-vindo ao Linkaí. Agora você pode criar seu perfil.')
});

test('Não deve cadastrar quando nenhum campo é informado.', async ({ page }) => {

    const SignupPage = getSignupPage(page)
    const toast = getToast(page)

    await SignupPage.open()
    await SignupPage.submit()

    await expect(toast.element()).toContainText('Campos obrigatórios')
    await expect(toast.element()).toContainText('Por favor, preencha todos os campos.')

});

test('Não deve cadastrar quando o e-mail for incorreto.', async ({ page }) => {

    const SignupPage = getSignupPage(page)

    const user: UserSignup = {
        name: 'gabriella',
        username: 'gabriella',
        email: 'www.teste.com.br',
        password: 'abc123',
        confirmPassword: 'abc123'
    }

    await SignupPage.open()
    await SignupPage.fill(user)
    await SignupPage.submit()

    await SignupPage.validateEmailFieldType()

});

test('Não deve cadastrar quando o username é incorreto.', async ({ page }) => {

    const SignupPage = getSignupPage(page)
    const toast = getToast(page)

    const user: UserSignup = {
        name: 'gabriella',
        username: 'gabriella&Cotto',
        email: 'bibiellabraz@gmail.com',
        password: 'abc123',
        confirmPassword: 'abc123'
    }

    await SignupPage.open()
    await SignupPage.fill(user)
    await SignupPage.submit()

    await expect(toast.element()).toContainText('Username inválido')
    await expect(toast.element()).toContainText('O username deve conter apenas letras, números e underscores.')

});

test('Não deve cadastrar quando as senhas forem diferentes.', async ({ page }) => {

    const SignupPage = getSignupPage(page)
    const toast = getToast(page)

    const user: UserSignup = {
        name: 'gabriella',
        username: 'gabriella_Cotto',
        email: 'bibiellabraz@gmail.com',
        password: 'abc123',
        confirmPassword: '123abc'
    }

    await SignupPage.open()
    await SignupPage.fill(user)
    await SignupPage.submit()

    await expect(toast.element()).toContainText('Senhas não coincidem')
    await expect(toast.element()).toContainText('A confirmação de senha deve ser igual à senha.')

});