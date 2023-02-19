/**
 * Made for use in TCSS 491 @UW-T Winter 2023
 * @author Christopher Henderson
 */


/** Stores things that are not specific to any particular level,
 *  i.e. things that continue from one level to the next. 
 */
class GameManager {
    constructor() {
        this.cam_x = 0;
        this.cam_y = 0; // unused for now
        
        this.playerHealth = 10;
        this.playerLives = 3;

        this.running = true;

    }
    
    init(the_ctx) {
        this.ctx = the_ctx
        this.interface = new Interface();
        ENGINE.addEntity(this.interface);
        this.player = new Waluigi();
        ENGINE.addEntity(this.player);
        this.enemy = new Enemy(2000, 435);

        this.loadLevel();
    }

    loadLevel() { // the one and only level so far
        ENGINE.addEntity(this.enemy);
        ENGINE.addEntity(new Background());
        
    }

    getInputState() {
        // keys we care about are:
        //                a  d  w  s  n  j  k  l
        let inputState = [0, 0, 0, 0, 0, 0, 0, 0];
        if(ENGINE.keys.a) inputState[0] = 1; // left
        if(ENGINE.keys.d) inputState[1] = 1; // right
        if(ENGINE.keys.w) inputState[2] = 1; // up
        if(ENGINE.keys.s) inputState[3] = 1; // down
        if(ENGINE.keys.n) inputState[4] = 1; // A
        if(ENGINE.keys.j) inputState[5] = 1; // B
        if(ENGINE.keys.k) inputState[6] = 1; // X
        if(ENGINE.keys.l) inputState[7] = 1; // Y


        return inputState;
    }

    updateCam(deltaX, deltaY = 0) {
        this.cam_x += deltaX * ENGINE.clockTick;
        this.cam_y += deltaY * ENGINE.clockTick;
    }

    addKill() {
        this.interface.kills++;
        if (this.interface.kills > 0) {
            this.interface.winner = true;
            this.win()
        }
    }

    gameOver() {
        this.running = false;
        this.player.die();
        this.enemy.stop();
        this.interface.loose = true;
    }

    win() {
        this.running = false;
        this.enemy.stop();
    }
}

class Interface {
    constructor() {
        this.loose = false;
        this.winner = false;
        this.kills = 0;

    }
    update() {}

    draw(ctx) {
        if (this.loose) {
            ctx.lineWidth = 1;
            ctx.fillStyle = "rgba(100, 220, 255, 1)";
            ctx.strokeStyle = "rgba(50, 255, 50, 0.8)";
            ctx.font = '120px monospace';
            ctx.fillText("YOU DIED", 400, 200);
            ctx.fillText("GAME OVER", 400, 360);
        }
        if (this.winner) {
            ctx.lineWidth = 1;
            ctx.fillStyle = "rgba(100, 220, 255, 1)";
            ctx.strokeStyle = "rgba(50, 255, 50, 0.8)";
            ctx.font = '120px monospace';
            ctx.fillText("YOU WIN!", 500, 250);
            // ctx.fillText("SCORE = " + this.kills, 200, 400);

        }
    }
}
// /** Stores things that are specific to one particular level. */
// class Level {
//     constructor(...theEntities) {
//         theEntities.forEach(ent => ENGINE.addEntity(ent))
//     }
// }
