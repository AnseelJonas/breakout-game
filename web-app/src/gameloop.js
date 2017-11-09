/**
 * @module gameLoop
 */

const { Player } = require('./player')
const { Ball } = require('./bodies/ball')
const { Brick } = require('./bodies/brick')
const { sketch } = require('./sketch')

/**
 * GameLoop provides the state and drawing for the sketch
 * @class
 * @prop {Paddle[]} paddles
 * @prop {Ball} ball
 */
class GameLoop {
  constructor () {
    this.reset()
  }

  /**
   * Reset all props
   * @method
   */
  reset () {
    // Initialise bodies
    this.ball = new Ball()
    this.players = {}
    this.bricks = {}
  }

  /**
   * Update players to current state or create new players if they don't exist already
   * @method
   * @param {object[]} players
   */
  updatePlayers (players) {
    for (const p of players) {
      if (!this.players[p.clientId]) {
        const isCurrentPlayer = p.clientId === window.wsClient.clientId
        const isMultiplayer = players.length === 2

        this.players[p.clientId] = new Player(isCurrentPlayer, isMultiplayer)
      }
      this.players[p.clientId].update(p)
    }
  }

  /**
   * Update bricks to current state or create new bricks if they don't exist already
   * @method
   * @param {object[]} bricks
   */
  updateBricks (bricks) {
    for (const b of bricks) {
      if (!this.bricks[b.id]) {
        this.bricks[b.id] = new Brick(b.id)
      }
      this.bricks[b.id].update(b)
    }
  }

  /**
   * Update the ball to match the server state
   * @method
   * @param {object} ball 
   */
  updateBall (ballObj) {
    this.ball.update(ballObj)
  }

  /**
   * Draws the current state onto the provided sketch
   * @method
   */
  run () {
    // Clear canvas
    sketch.background(0)

    for (const clientId in this.players) {
      if (!this.players.hasOwnProperty(clientId)) {
        return
      }
      const player = this.players[clientId]
      player.paddle.draw(sketch)
      if (player.score) {
        player.score.draw(sketch)
      }
    }

    for (const brickId in this.bricks) {
      if (!this.bricks.hasOwnProperty(brickId)) {
        return
      }
      this.bricks[brickId].draw(sketch)
    }

    this.ball.draw(sketch)
  }
}

exports.gameLoop = new GameLoop()
