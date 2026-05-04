import { test, expect, Page } from '@playwright/test'

/**
 * Mobile responsiveness suite (§10A).
 *
 * Tests every major route at four viewports (set per-project in
 * playwright.config.ts). Asserts no horizontal scroll, correct
 * mobile-vs-desktop nav, no text overflow, 44×44 touch targets, and
 * captures a screenshot for visual diff.
 */

const PAGES = [
  { name: 'home',     path: '/' },
  { name: 'funding',  path: '/funding' },
  { name: 'opps',     path: '/funding/opportunities' },
  { name: 'calendar', path: '/funding/calendar' },
  { name: 'news',     path: '/news' },
  { name: 'about',    path: '/about' },
  { name: 'council',  path: '/about/council' },
  { name: 'contact',  path: '/about/contact' },
  { name: 'pasifika', path: '/toi-pasifika' },
  { name: 'maori',    path: '/toi-maori' },
] as const

async function noHorizontalScroll(page: Page) {
  return page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)
}

async function noTextOverflow(page: Page) {
  return page.evaluate(() => {
    const els = document.querySelectorAll<HTMLElement>('h1, h2, h3, p')
    return Array.from(els).every(el => el.scrollWidth <= el.offsetWidth + 2)
  })
}

async function buttonsMeetTouchTarget(page: Page) {
  return page.evaluate(() => {
    const interactive = document.querySelectorAll<HTMLElement>(
      'button, a[class*="btn"], .pill, .footer-social-btn, .fb-burger'
    )
    const fails: string[] = []
    Array.from(interactive).forEach((el, i) => {
      const rect = el.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return // skip invisible
      if (rect.height < 44) {
        fails.push(`#${i} (${el.className || el.tagName}) height=${rect.height}`)
      }
    })
    return fails
  })
}

for (const p of PAGES) {
  test(`responsive: ${p.name} (${p.path})`, async ({ page }, testInfo) => {
    await page.goto(p.path)
    // Wait for any lazy-loaded chunk + animations to settle
    await page.waitForLoadState('networkidle').catch(() => {})

    // 1. No horizontal scroll
    expect(await noHorizontalScroll(page)).toBeTruthy()

    // 2. Burger / floatbar-nav visibility based on viewport
    const isMobile = (testInfo.project.use.viewport?.width ?? 1280) <= 768
    if (isMobile) {
      await expect(page.locator('.fb-burger')).toBeVisible()
      await expect(page.locator('.floatbar-nav')).toBeHidden()
    } else {
      await expect(page.locator('.floatbar-nav')).toBeVisible()
    }

    // 3. No text overflow on visible heading/paragraph elements
    expect(await noTextOverflow(page)).toBeTruthy()

    // 4. All visible interactive controls hit the 44px touch target
    const failingTargets = await buttonsMeetTouchTarget(page)
    expect.soft(failingTargets, `Touch-target failures: ${failingTargets.join(', ')}`).toEqual([])

    // Visual snapshot
    await page.screenshot({
      path: `tests/screenshots/${p.name}-${testInfo.project.name}.png`,
      fullPage: false,
    })
  })
}

test.describe('Skip-nav landmark', () => {
  test('focused first, jumps to main', async ({ page }) => {
    await page.goto('/')
    await page.keyboard.press('Tab')
    const skip = page.locator('a.skip-nav')
    await expect(skip).toBeFocused()
    await skip.click()
    // After click, hash should be #main-content
    await expect(page).toHaveURL(/#main-content$/)
  })
})

test.describe('Density compact mode', () => {
  test('?density=compact reduces section padding', async ({ page }) => {
    await page.goto('/?density=compact')
    const density = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--density').trim()
    )
    expect(density).toBe('0.75')
  })
})
