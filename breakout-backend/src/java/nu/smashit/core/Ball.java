/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package nu.smashit.core;

/**
 *
 * @author jodus
 */
public class Ball extends MovableBody {

    private double dx;
    private double dy;

    private final double multiplier;

    public Ball() {
        super(GameCanvas.WIDTH / 2, GameCanvas.HEIGHT / 2, 12, 12);
        this.dx = -3;
        this.dy = -9;
        this.multiplier = 1.0002;
    }

    public void move() {
        dx = dx * multiplier;
        dy = dy * multiplier;
        super.move((int) dx, (int) dy);
    }

    public int getRadius() {
        return this.height / 2;
    }

    public boolean isWallCollision() {
        return isGoingLeft() && x < 0
                || !isGoingLeft() && x > GameCanvas.WIDTH - width;
    }

    public boolean isCeilingCollision() {
        return isGoingUp() && y < 0;
    }

    public boolean isFloorCollision() {
        return !isGoingUp() && y > GameCanvas.HEIGHT - height;
    }

    public boolean isCollision(Body b) {
        return (dx + x) < b.x + b.width
                && (dx + x) + width > b.x
                && (dy + y) < b.y + b.height
                && height + (dy + y) > b.y;
    }

    public boolean isVerCollision(Body b) {
        return y <= b.y - (b.height / 2)
                || y >= b.y + (b.height / 2);
    }

    public boolean isGoingUp() {
        return dy < 0;
    }

    public boolean isGoingLeft() {
        return dx < 0;
    }

    public void inverseVerSpeed() {
        dy = -dy;
    }

    public void inverseHozSpeed() {
        dx = -dx;
    }
}
