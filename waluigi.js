/**
 * Made for use in TCSS 491 @UW-T Winter 2023
 * @author Christopher Henderson
 */

class Waluigi {
    constructor() {
        this.action = 0 // idle
        this.facing = 0 // right

        this.numOfAnima = 6;
        this.setUpAnimations();
    
        this.x = 400;
        this.y = 440;
        this.xScale = 3;
        this.yScale = 3;

        this.down = 0;
        this.up = 0;

        this.speed = 5;
    }

    setUpAnimations() {
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
        
        this.myAnimations[3] = [ // smash
            GRAPHICS.get('waluigi_hammer_down_right'),
            GRAPHICS.get('waluigi_hammer_down_left')
        ];

        this.myAnimations[4] = [ // power_smack
            GRAPHICS.get('waluigi_hammer_up_right'),
            GRAPHICS.get('waluigi_hammer_up_left')
        ];

        this.myAnimations[5] = [ // power_smack
            GRAPHICS.get('waluigi_side_hammer_right'),
            GRAPHICS.get('waluigi_side_hammer_left')
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
                break;
            case 'run':
                this.action = 2;
                break;
            case 'smash':
                this.action = 3;
                break;
            case 'power_smack':
                this.action = 4;
                break;
        }
    }

    resetAllAnimations() {
        this.myAnimations.forEach(action_arr => {
            action_arr.forEach(facing_arr => facing_arr.reset())
        });
    }

    resetAnimations(theAnimations) {
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
     *         // left, right, up, down, A, B, X, Y
        //                a  d  w  s  n  j  k  l
        let inputState = [0, 0, 0, 0, 0, 0, 0, 0];
     */
    determineState() {
        let input = 1
    }

    update() {
        // console.log(ENGINE.keys);



        if (this.noButt()) {
            this.setAction('idle');
            this.resetAnimations(numsAtoB(1, this.numOfAnima));
        }
        
        else if (ENGINE.keys.d ) {
            if (ENGINE.keys.k) {
                this.setAction('run');
                this.setFacing('right');
            } else {
                this.setAction('walk');
                this.setFacing('right');
            }

        }
        else if (ENGINE.keys.a) {
            if (ENGINE.keys.k) {
                this.setAction('run');
                this.setFacing('left');
            } else {
                this.setAction('walk');
                this.setFacing('left');
            }
        }
        else if (ENGINE.keys.s) {
            this.setAction('smash');
        }
    }

    draw(ctx) {
        // ctx.canvas.addEventListener("keydown", event => {
        //     console.log(event.key + " down" + this.down++)

        // });
        // ctx.canvas.addEventListener("keyup", event => {
        //     console.log(event.key + " up" + this.up++)

        // });
        //console.log(ENGINE.keys)


        this.myAnimations[this.action][this.facing].animate (
            ENGINE.clockTick, ctx, this.x, this.y, this.xScale, this.yScale
        );


    }

    noButt() {
        return !(
            ENGINE.keys.k || ENGINE.keys.w || ENGINE.keys.e ||
            ENGINE.keys.a || ENGINE.keys.s || ENGINE.keys.d);
    }
}
