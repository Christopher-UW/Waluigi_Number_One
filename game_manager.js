/**
 * Made for use in TCSS 491 @UW-T Winter 2023
 * @author Christopher Henderson
 */


/** Stores things that are not specific to any particular level,
 *  i.e. things that continue from one level to the next. 
 */
class GameManager {
    constructor() {
        this.levels = new Map(); // <string: id, object: Level>
        this.playerHealth = 10;
        this.playerLives = 3;
        this.player = new Waluigi();
    }

    createLevel(theEntities) {

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
     */
    inputLayer() {
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
}

/** Stores things that are specific to one particular level. */
class Level {
    constructor(theEntities) {
        this.cam_Xpos = 0;
        this.cam_Ypos = 0; // unused for now
        this.cam_Xvel = 0;
        this.cam_Yvel = 0; // unused for now

        this.entities = theEntities;


    }
}
