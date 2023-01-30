/**
 * Made for use in TCSS 491 @UW-T Winter 2023
 * @author Christopher Henderson
 */

class Waluigi {
    constructor() {
        this.action = 0 // idle
        this.facing = 0 // right

        this.numOfAnima = 5;
        this.setUpAnimations();
        

        this.x = 400;
        this.y = 440;
        this.xScale = 3;
        this.yScale = 3;

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
            ANIMANAGER.getAnimation('waluigi_idle_right'),
            ANIMANAGER.getAnimation('waluigi_idle_left')
        ];

        this.myAnimations[1] = [ // walk
            ANIMANAGER.getAnimation('waluigi_walk_right'),
            ANIMANAGER.getAnimation('waluigi_walk_left')
        ];

        this.myAnimations[2] = [ // run
        ANIMANAGER.getAnimation('waluigi_run_right'),
        ANIMANAGER.getAnimation('waluigi_run_left')
        ];
        
        this.myAnimations[3] = [ // smash
            ANIMANAGER.getAnimation('waluigi_smash_right'),
            ANIMANAGER.getAnimation('waluigi_smash_left')
        ];

        this.myAnimations[4] = [ // power_smack
        ANIMANAGER.getAnimation('waluigi_power_smack_right'),
        ANIMANAGER.getAnimation('waluigi_power_smack_left')
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

    update() {
        if (this.noButt()) {
            this.setAction('idle');
            //this.resetAnimations(numsAtoB(1, this.numOfAnima));
        }
        else if (ENGINE.keys.d) {
            if (ENGINE.keys.n) {
                this.setAction('run');
                this.setFacing('right');
            } else {
                this.setAction('walk');
                this.setFacing('right');
            }

        }
        else if (ENGINE.keys.a) {
            if (ENGINE.keys.n) {
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
        this.myAnimations[this.action][this.facing].animateSprite(
            ENGINE.clockTick, ctx, this.x, this.y, this.xScale, this.yScale
        );

    }

    noButt() {
        return !(
            ENGINE.keys.q || ENGINE.keys.w || ENGINE.keys.e ||
            ENGINE.keys.a || ENGINE.keys.s || ENGINE.keys.d);
    }
}
