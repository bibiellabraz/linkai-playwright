import { Page } from '@playwright/test'

export function getToast(page: Page) {
    return {
        toast: () => {
            return page.locator('.toast')
        }
    }
}