/**
 * @module constants
 */

/**
 * API url
 * @type {string}
 */
/** exports.API_URL = (window.location.origin + window.location.pathname).replace(/^http/, 'ws').replace(/\/$/, '') + '/socket'**/
exports.API_URL = 'ws://smash-it.nu/socket'

/**
 * Canvas height
 * @type {number}
 */
exports.C_HEIGHT = 480

/**
 * Canvas width
 * @type {number}
 */
exports.C_WIDTH = 320

/**
 * Is the current client the webview in the android app
 * @type {string}
 */
exports.IS_ANDROID_APP = navigator.userAgent.indexOf('Smash_It') > 1
