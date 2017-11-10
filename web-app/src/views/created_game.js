const {
  CreateMultiplayerRequestAction
} = require('../actions/create_multiplayer_request')

const path = 'multiplayer.html'
exports.path = path

exports.MultiplayerScreenView = class MultiplayerScreenView {
  constructor (viewManager) {
    this.path = path
    this.viewManager = viewManager

    this.createGameBtn = 'button.createGame'
  }

  createMultiplayerHandler () {
    window.wsClient.send(new CreateMultiplayerRequestAction())
  }

  onLoad () {
    $(this.createGameBtn).on('click', this.multiplayerClickHandler)
  }

  onUnload () {
    $(this.createGameBtn).off('click')
  }
}
