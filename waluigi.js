/**
 * Made for use in TCSS 491 @UW-T Winter 2023
 * @author Christopher Henderson
 */

class Waluigi {
    constructor() {
        this.action = 0 // idle
        this.facing = 0 // right
        this.dead = false;

        this.numOfAnima = 6;
        this.loadAnimations();
        this.attacking = false;
        this.moving = false;

        this.x = 400;
        this.y = 440;
        this.xScale = 3;
        this.yScale = 3;

        this.down = 0;
        this.up = 0;

        this.walk_speed = 105;
        this.run_speed = 800;
    }

    die() {
        this.dead = true;

    }

    loadAnimations() {
        /* [ idle right  |  idle left ] *
         * [ run right   |  run left  ] *
         * [ smash right | smash left ] */

        // we outer array is for actions, 3 for now: idle, run, smash
        this.myAnimations = Array(this.numOfAnima); 
        // inner array is for direction
        this.myAnimations[0] = [ // idle
            GRAPHICS.get('waluigi_idle_right'),
            GRAPHICS.get('waluigi_idle_left')
        ];

        this.myAnimations[1] = [ // walk
            GRAPHICS.get('waluigi_walk_right'),
            GRAPHICS.get('waluigi_walk_left')
        ];

        this.myAnimations[2] = [ // run
        GRAPHICS.get('waluigi_run_right'),
        GRAPHICS.get('waluigi_run_left')
        ];
        
        this.myAnimations[3] = [ // hammer down
            GRAPHICS.get('waluigi_hammer_down_right').setLooping(false),
            GRAPHICS.get('waluigi_hammer_down_left').setLooping(false)
        ];

        this.myAnimations[4] = [ // hammer up
            GRAPHICS.get('waluigi_hammer_up_right').setLooping(false),
            GRAPHICS.get('waluigi_hammer_up_left').setLooping(false)
        ];

        this.myAnimations[5] = [ // hammer swipe
            GRAPHICS.get('waluigi_hammer_side_right').setLooping(false),
            GRAPHICS.get('waluigi_hammer_side_left').setLooping(false)
        ];

    }

    setFacing(direction) {
        switch(direction) {
            case 'right':
                this.facing = 0;
                break;
            case 'left':
                this.facing = 1;
                break;
        }
    }

    setAction(action) {
        switch(action) {
            case 'idle':
                this.action = 0;
                break;
            case 'walk':
                this.action = 1;
                this.move(this.walk_speed);
                this.moving = true;
                break;
            case 'run':
                this.action = 2;
                this.move(this.run_speed);
                this.moving = true;
                break;
            case 'hammer_down':  // try moving 'this.actionInProgress = true' above this line
                this.action = 3;
                this.attacking = true;
                break;
            case 'hammer_up':
                this.action = 4;
                this.attacking = true;
                break;
            case 'hammer_side':
                this.action = 5;
                this.attacking = true;
                break;
        }
    }

    move(speed) {
        let direction = this.facing === 0? 1 : -1
        GAME.updateCam(speed * direction, 0);
    }

    resetAllAnimations() {
        this.myAnimations.forEach(action_arr => {
            action_arr.forEach(facing_arr => facing_arr.reset())
        });
    }

    resetAnimations(...theAnimations) {
        theAnimations.forEach(index => {
            this.myAnimations[index].forEach(facing_arr => facing_arr.reset())
        });
    }

    /** 
     *  L = left | R = right | U = up | D = down | A,  B,  X,  Y = face buttons
     *    [a]        [d]         [w]      [s]     [n] [j] [k] [l]
     *
     *  L  = walk left
     *  R  = walk right
     *  D  = crouch
     *  A  = attack (side to side)
     * 
     *  B --> Run
     * 
     *  L + B = run left
     *  R + B = run right
     * 
     *  U + A = attack up
     *  D + A = attack down
     * 
     *  X --> jump
     * 
     *  U + X = jump up
     *  R + X = jump left
     *  L + X = jump right
     * 
     *  L + A + X = hard attack left
     *  R + A + X = hard attack right
     * 
     *  L + B + X = long jump left
     *  R + B + X = long jump right
     * 
     * 
     *  L = left | R = right | U = up | D = down | A,  B,  X,  Y = face buttons
     *    [a]        [d]         [w]      [s]     [n] [j] [k] [l]
     * 
     *         
     *                    a  d  w  s  n  j  k  l     A: run   B: attack   X: jump
     *  let inputState = [0, 0, 0, 0, 0, 0, 0, 0];
     *  left[0] right[1] up[2] down[3] A[4] B[5] X[6] Y[7]
     */
    update() {
        if (!GAME.running) return;
        if (this.attacking) {
            let currAnima = this.myAnimations[this.action][this.facing];
            if (currAnima.isDone()) {
                currAnima.reset();
                this.attacking = false;
            }
            else return;
        }

        let i = GAME.getInputState();

        // attack!
        if (i[3]) {this.setAction('hammer_down');}
        else if (i[2]) {this.setAction('hammer_up')}
        else if (i[5]) {this.setAction('hammer_side')}

        else if (i[0]) { // moving left
            this.setFacing('left')
            if(i[4]) {
                this.setAction('run')

            }
            else {
                this.setAction('walk')
            }
        }
        else if (i[1]) { // moving right
            this.setFacing('right');
            if(i[4]) {
                this.setAction('run')
            }
            else {
                this.setAction('walk')
            }
        }
        else {
            if (this.moving = true) {
                this.resetAnimations(1,2);
                this.moving = false;
            }
            this.setAction('idle')
        }
        // else if (i[0]) {
        //     this.setFacing('left')
        // }
        // else if (i[3]) {
        //     //crouch 
        // }
        // else if (i[4]) {

        // }
    }

    draw(ctx) {
        if(this.dead) return
        // if(this.action === 1) {
        //     if (this.facing === 0) {
        //         GAME.cam_x++;
        //         this.x++
        //     } else{
        //         GAME.cam_x--;
        //         this.x--;
        //     }

        // }
        let anima = this.myAnimations[this.action][this.facing]
        anima.animate(ENGINE.clockTick, ctx, this.x, this.y, this.xScale, this.yScale);
    }
}
