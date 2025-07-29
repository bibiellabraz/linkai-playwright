import { test, expect } from '@playwright/test'

import { getSignupPage } from '../support/pages/SignupPage'
import { getDashPage } from '../support/pages/DashPage'
import { getToast } from '../support/pages/Components/Toast';

import { User } from '../support/fixtures/User'

test('Deve cadastrar um novo usuário com sucesso.', async ({ page }) => {

    const SignupPage = getSignupPage(page)
    const DashPage = getDashPage(page)
    const toast = getToast(page)

    const user: User = {
        name: 'Gabriella Cotto',
        username: 'gabriella',
        email: 'bibiellabraz@gmail.com',
        password: 'pwd123'
    }

    await SignupPage.open()
    await SignupPage.submit(user)

    await page.waitForTimeout(5000)

    await expect(DashPage.welcome()).toContainText(`Olá, ${user.name}! 👋`)
    await expect(toast.element()).toContainText('Conta criada com sucesso!')
    await expect(toast.element()).toContainText('Bem-vindo ao Linkaí. Agora você pode criar seu perfil.')
});
