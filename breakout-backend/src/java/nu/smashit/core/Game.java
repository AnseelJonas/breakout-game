package nu.smashit.core;

import java.util.Timer;
import java.util.TimerTask;
import nu.smashit.socket.Client;
import nu.smashit.socket.actions.GameStartAction;
import nu.smashit.socket.actions.ResponseAction;

/**
 *
 * @author jodus
 */
public abstract class Game {

    private final String key;
    protected Player[] players;
    protected GameLoop gameLoop;

    protected final Timer gameLoopTimer;
    protected final Timer countDownTimer;
    protected final int updateInterval;
    public int countDown;

    Game(String key) {
        this.key = key;
        this.gameLoopTimer = new Timer();
        this.countDownTimer = new Timer();
        this.updateInterval = 28;
        this.countDown = 5;
    }

    public abstract void join(Client c);

    public abstract Player getPlayer(Client c);

    public void broadcastAction(ResponseAction a) {
        for (Player p : players) {
            p.client.sendAction(a);
        }
    }

    protected abstract void createGameLoop();

    public void startCountDown() {
        createGameLoop();

        broadcastAction(new GameStartAction());

        gameLoopTimer.scheduleAtFixedRate(gameLoop, 0, updateInterval);

        countDownTimer.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                if (countDown <= 0) {
                    this.cancel();
                }
                countDown--;
            }
        }, 1000, 1000);
    }

    public int playerCount() {
        return players.length;
    }

    public void stopGame() {
        gameLoopTimer.cancel();

        for (Player p : players) {
            p.client.removeGame();
        }
        GameManager.getInstance().removeGame(key);
    }

    public String getKey() {
        return key;
    }

    public boolean isFull() {
        for (Player p : players) {
            if (p == null) {
                return false;
            }
        }
        return true;
    }
}
