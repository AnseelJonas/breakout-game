/**
 * @module initialize
 */

const backUrl = [
  ['modes', 'singleplayer_menu', 'singleplayer_level_menu'],
  ['modes', 'multiplayer_menu']
]

const { wsClient } = require('./socket/client')
const constants = require('./constants')

// require('./stats')
// require('./get_nation_data')

const { viewManager } = require('./views/index')

// Views
$(document).ready(function () {
  window.wsClient = wsClient
  wsClient.open(function () {
    viewManager.go('login.html')
  })

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
})

$('body').on('click', '#go-back', function (e) {
  const url = window.location.href
  if (url.indexOf('single') > 1) {
    getRightUrl(0, url)
  } else {
    getRightUrl(1, url)
  }
})

function getRightUrl (index, url) {
  for (let i = 0; i < backUrl[index].length; i++) {
    if (url.indexOf(backUrl[index][i]) > 1) {
      viewManager.go(backUrl[index][i - 1] + '.html')
    }
  }
  viewManager.go[backUrl[index][backUrl.length - 1]]
}

window.onhashchange = function (e) {
  viewManager.onLocationChange()
}

window.onpopstate = function (e) {
  e.preventDefault()
}
