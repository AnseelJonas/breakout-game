/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package nu.smashit.socket.actions;

import nu.smashit.core.Game;
import nu.smashit.core.bodies.Paddle;
import nu.smashit.socket.Client;

/**
 *
 * @author jodus
 */
public class MovePaddleStopAction implements RequestAction {

    @Override
    public void handler(Client c) {
        if (c.isInGame()) {
            Game gm = c.getGame();
            Paddle p = gm.getPlayer(c).getPaddle();
            p.goNowhere();
        }
    }

}
