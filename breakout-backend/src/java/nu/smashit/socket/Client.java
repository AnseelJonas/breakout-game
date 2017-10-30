/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package nu.smashit.socket;

import java.io.IOException;
import javax.websocket.EncodeException;
import javax.websocket.Session;
import nu.smashit.core.GameSession;
import nu.smashit.utils.Logger;

/**
 *
 * @author jodus
 */
public class Client {

    private final Session session;
    private GameSession gameSession;

    Client(Session session) {
        this.session = session;
    }

    public String getId() {
        return session.getId();
    }

    public void sendAction(Action a) {
        try {
            session.getBasicRemote().sendObject(a);
        } catch (IOException err) {
            Logger.log(err.getMessage());
        } catch (EncodeException ex) {
            Logger.log(ex.getMessage());
        }
    }

    public boolean isInGame() {
        return gameSession != null;
    }

    public void setGame(GameSession gm) {
        this.gameSession = gm;
    }

    public GameSession getGame() {
        return gameSession;
    }

    public void removeGame() {
        this.gameSession = null;
    }
}