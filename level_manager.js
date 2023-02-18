/**
 * Made for use in TCSS 491 @UW-T Winter 2023
 * @author Christopher Henderson
 */


/** Stores things that are not specific to any particular level,
 *  i.e. things that continue from one level to the next. 
 */
class LevelManager {
    constructor() {
        this.levels = new Map(); // <string: id, object: Level>
        this.playerHealth = 10;
        this.playerLives = 3;
        this.player = new Waluigi();
    }

    createLevel(theEntities) {

    }

    inputLayer 
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
