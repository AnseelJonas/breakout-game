/**
 * @module initialize
 */

// const { wsClient } = require('./socket/client')
// const loadingView = require('./views/loading')
const constants = require('./constants')

// require('./sketch')

require('./music')
require('./qr_code')

const { viewManager } = require('./views/index')

viewManager.go('modes.html')

// window.wsClient = wsClient
// wsClient.open()

/**
 * - The android app needs 4,5 sec to show the vid.
 * - The body needs to be set to the full height of the browser (vh is not supported in webview)
 * - Fade in the body
 */
const timeout = constants.IS_ANDROID_APP ? 4500 : 0
setTimeout(function () {
  $('body').css('height', window.innerHeight)
  $('#start').addClass('load')
}, timeout)

/**
 * Prevent all hyperlinks from opening the web page manually and use viewManager
 */
$('body').on('click', 'a', function (e) {
  const href = e.currentTarget.getAttribute('href')
  if (!href || href === '#') {
    return
  }
  e.preventDefault()
  viewManager.go(href)
})
