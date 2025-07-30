import { test, expect } from '@playwright/test'

import { getSignupPage } from '../support/pages/SignupPage'
import { getDashPage } from '../support/pages/DashPage'
import { getToast } from '../support/pages/Components/Toast'

import { removeUserByEmail } from '../support/database'

import { UserSignup, getNewUser } from '../support/fixtures/User'

test('Deve realizar o cadastro com sucesso.', async ({ page }) => {

    const SignupPage = getSignupPage(page)
    const DashPage = getDashPage(page)
    const toast = getToast(page)

    const user: UserSignup = getNewUser()
    await removeUserByEmail(user.email)

    await SignupPage.open()
    await SignupPage.fill(user)
    await SignupPage.submit()

    await expect(DashPage.welcome()).toContainText(`Olá, ${user.name}! 👋`)
    await expect(toast.element()).toContainText('Conta criada com sucesso!')
    await expect(toast.element()).toContainText('Bem-vindo ao Linkaí. Agora você pode criar seu perfil.')
});

test('Deve exibir erro ao tentar cadastrar com campos obrigatórios em branco.', async ({ page }) => {

    const SignupPage = getSignupPage(page)
    const toast = getToast(page)

    await SignupPage.open()
    await SignupPage.submit()

    await expect(toast.element()).toContainText('Campos obrigatórios')
    await expect(toast.element()).toContainText('Por favor, preencha todos os campos.')

});

test('Deve validar o formato inválido de email.', async ({ page }) => {

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

test('Deve exibir erro quando a confirmação de senha for diferente da senha.', async ({ page }) => {

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

test('Deve exibir erro ao tentar cadastrar com username já existente.', async ({ page }) => {
    const SignupPage = getSignupPage(page)
    const toast = getToast(page)

    const user: UserSignup = {
        name: 'gabriella',
        username: 'gabriella', // já existente no sistema
        email: 'bibiellabraz@gmail.com',
        password: 'pwd123',
        confirmPassword: 'pwd123'
    }

    await SignupPage.open()
    await SignupPage.fill(user)
    await SignupPage.submit()

    await expect(toast.element()).toContainText('Erro no cadastro')
    await expect(toast.element()).toContainText('User with that email or username already exists')
});

test('Deve exibir erro ao tentar cadastrar com e-mail já cadastrado.', async ({ page }) => {
    const SignupPage = getSignupPage(page)
    const toast = getToast(page)

    const user: UserSignup = {
        name: 'Gabriella',
        username: 'novo_usuario_unico',
        email: 'bibiellabraz@gmail.com',
        password: 'abc123',
        confirmPassword: 'abc123'
    }

    await SignupPage.open()
    await SignupPage.fill(user)
    await SignupPage.submit()

    await expect(toast.element()).toContainText('Erro no cadastro')
    await expect(toast.element()).toContainText('User with that email or username already exists')
});

test('Deve exibir erro se a senha tiver menos de 6 caracteres.', async ({ page }) => {
  const SignupPage = getSignupPage(page)
  const toast = getToast(page)

  const user: UserSignup = {
    name: 'Gabriella',
    username: 'gabriella_minpwd',
    email: 'gabriella@teste.com',
    password: 'abc',
    confirmPassword: 'abc'
  }

  await SignupPage.open()
  await SignupPage.fill(user)
  await SignupPage.submit()

  await expect(toast.element()).toContainText('Senha muito curta')
  await expect(toast.element()).toContainText('A senha deve ter pelo menos 6 caracteres.')
});





