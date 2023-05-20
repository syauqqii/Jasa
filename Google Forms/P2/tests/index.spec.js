const { test, expect } = require('@playwright/test')
const { promisify }    = require('util')
const fs     = require('fs')
const colors = require('colors')
const clear  = require('clear')

const password = '@Qii_25Kn!a*'
const filename = 'tests/email.txt'
const readFileAsync = promisify(fs.readFile);
const timeout = 5000

test('Google Account Verif Checker', async ({ page }) => {
  clear()
  console.log(` [ # ] ----- [ ${colors.brightRed('Google Account Verif Checker')} ] ----- [ # ]`)

  const inputEmail     = page.locator('input[id="identifierId"]')
  const inputPassword  = page.locator('input[autocomplete="current-password"]')
  const btnSelanjutnya = page.locator('span[class="VfPpkd-vQzf8d"]').nth(1)

  const data = await readFileAsync(filename, 'utf8');
  const email = data.split('\n')
  console.log(`\n [${colors.cyan('$')}] ${colors.cyan('Jumlah Email:')} ${colors.white(email.length)} | ${colors.cyan('File:')} ${colors.white(filename)}\n`)

  for(let i=0; i<email.length; i++){
    await page.goto('https://accounts.google.com/')

    await inputEmail.fill(email[i])
    await btnSelanjutnya.click()

    await page.waitForSelector('input[autocomplete="current-password"]');

    await inputPassword.fill(password)
    await btnSelanjutnya.click()

    try {
      await page.waitForSelector('p[class="HJkKof"]', { state: 'visible', timeout })
      console.log(` [${colors.yellow('-')}] ${colors.yellow('Verif Nomor HP:')} ${colors.white(email[i])}`)
    } catch (error) {
      try {
        await page.waitForSelector('h1[class="XY0ASe"]', { state: 'visible', timeout })
        await page.locator('img[class="gb_j gbii"]').click()
        console.log(` [${colors.green('+')}] ${colors.green('Email Aman:')} ${colors.white(email[i])}`)

        const frame = await page.waitForSelector('iframe[name="account"]')
        const frameElement = await frame.contentFrame()
        const btnLogout = frameElement.locator('div[class="T6SHIc"]')
        await btnLogout.click()

        await page.locator('li[class="JDAKTe eARute W7Aapd zpCp3 SmR8"]').nth(1).click()
        await page.locator('div[class="lCoei YZVTmd SmR8"]').nth(0).click()
        await page.waitForSelector('div[class="g3VIld bYmtV Up8vH J9Nfi iWO5td"]')
        await page.locator('div[class="U26fgb O0WRkf oG5Srb C0oVfc kHssdc lw1w4b M9Bg4d"]').nth(2).click()
      } catch (error) {
        console.log(` [${colors.red('!')}] ${colors.green('ERROR:')} ${colors.white(error)}`)
      }
    }
  }

  console.log()
});
