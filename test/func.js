import chromedriver from 'chromedriver'
import webdriver from 'selenium-webdriver'

export function delay (time) {
  return new Promise(resolve => setTimeout(resolve, time))
}

let chromedriverIsStarted = false
export function startChromeDriver () {
  if (chromedriverIsStarted) return Promise.resolve()
  chromedriver.start()
  process.on('exit', () => {
    chromedriver.stop()
  })
  chromedriverIsStarted = true
  return delay(1000)
}

export function buildWebDriver (extPath) {
  return new webdriver.Builder()
    .usingServer('http://localhost:9515')
    .withCapabilities({
      chromeOptions: {
        args: [`load-extension=${extPath}`],
        // TODO: Set this properly for platforms other than macOS
        binary: '../../../out/Release/Chromium.app/Contents/MacOS/Chromium'
      }
    })
    .forBrowser('chrome')
    .build()
}