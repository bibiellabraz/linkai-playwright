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
    await SignupPage.submit(user)

    await expect(DashPage.welcome()).toContainText(`Olá, ${user.name}! 👋`)
    await expect(toast.element()).toContainText('Conta criada com sucesso!')
    await expect(toast.element()).toContainText('Bem-vindo ao Linkaí. Agora você pode criar seu perfil.')
});
