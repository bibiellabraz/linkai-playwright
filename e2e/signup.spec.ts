import { test, expect } from '@playwright/test'

import { getSignupPage } from '../support/pages/SignupPage'
import { getDashPage } from '../support/pages/DashPage'
import { getToast } from '../support/pages/Components/Toast'

import { User, getNewUser } from '../support/fixtures/User'

test('Deve cadastrar um novo usuário com sucesso.', async ({ page }) => {

    const SignupPage = getSignupPage(page)
    const DashPage = getDashPage(page)
    const toast = getToast(page)

    const user: User = getNewUser()

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

    const user: User = {
        name: 'gabriella',
        username: 'gabriella',
        email: 'www.teste.com.br',
        password: 'abc123'
    }

    await SignupPage.open()
    await SignupPage.fill(user)
    await SignupPage.submit()

    const email = page.getByPlaceholder('Seu melhor e-mail para receber novidades!')
    await expect(email).toHaveAttribute('type', 'email')

});