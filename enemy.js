class Enemy {
    constructor(the_x, the_y) {
        this.x = the_x;
        this.y = the_y;
        this.scale = 2
        this.vel = 100
        this.delta = Infinity;
        this.animations = [GRAPHICS.get('link1'), GRAPHICS.get('link2'), GRAPHICS.get('link3')]
        this.state = 0
    }

    stop() {
        this.vel = 0;
        this.state = 2;
    }

    update() {
        if(this.state !== 0) return;
        this.x -= this.vel * ENGINE.clockTick;
        this.delta = this.x - GAME.cam_x - GAME.player.x;
        if (this.delta < 100) {
            if (GAME.player.attacking) {
                if (GAME.running && this.state != 1) {
                    GAME.addKill();
                    this.state = 1;
                    this.vel = 0;
                }
            } else if (this.delta < 20) {
                if (GAME.running) GAME.gameOver();
            }
        }
    }

    draw(ctx) {
        this.animations[this.state].animate(ENGINE.clockTick, ctx, this.x - GAME.cam_x, this.y, this.scale);
    }
}

