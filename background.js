/**
 * Made for use in TCSS 491 @UW-T Winter 2023
 * @author Christopher Henderson
 */

class Background {
    constructor() {
        // road
        this.roadScale = 0.6; this.roadTileWidth = 960;
        this.roadRepeat = this.roadScale * this.roadTileWidth;

        console.log(this.roadRepeat)
        this.road_X = -6 * this.roadRepeat; this.road_Y =  550; this.road_speed = 100;
        console.log(this.road_X)

        // background
        this.bgTileScale = 3; this.bgTileWidth = 592;
        this.bgRepeat = this.bgTileScale * this.bgTileWidth;

        this.farBack_X = -6 *this.bgRepeat; this.farBack_Y = -180;
        this.medBack_X = -6 *this.bgRepeat; this.medBack_Y = -180;
        this.nerBack_X = -6 *this.bgRepeat; this.nerBack_Y = -180;
    }

    

    update() {
        // if (ENGINE.keys.d && !ENGINE.keys.a && !ENGINE.keys.s) {// Waluigi moving rightd
        //     this.road_X -= this.road_speed * ENGINE.clockTick; // road

        //     // this.farBack_X -= this.farBack_speed * ENGINE.clockTick;
        //     // this.medBack_X -= this.medBack_speed * ENGINE.clockTick;
        //     // this.nerBack_X -= this.nerBack_speed * ENGINE.clockTick;
        // }

        // if (ENGINE.keys.a && !ENGINE.keys.d && !ENGINE.keys.s) { // Waluigi moving left
        //     this.road_X += this.road_speed * ENGINE.clockTick;

        //     // this.farBack_X += this.farBack_speed * ENGINE.clockTick;
        //     // this.medBack_X += this.medBack_speed * ENGINE.clockTick;
        //     // this.nerBack_X += this.nerBack_speed * ENGINE.clockTick;
        // }

        // 


        // /// handles repetition... solved! Just DONT
        // if (GAME.cam_x > 2*this.roadRepeat) this.road_X -= this.roadRepeat
        // if (GAME.cam_x < -3*this.roadRepeat) this.road_X += this.roadRepeat;
        // //console.log(GAME.cam_x)

        // if (this.farBack_X >= -this.bgRepeat) this.farBack_X -= this.bgRepeat;
        // if (this.farBack_X < -2*this.bgRepeat) this.farBack_X += this.bgRepeat;

        // if (this.medBack_X >= -this.bgRepeat) this.medBack_X -= this.bgRepeat;
        // if (this.medBack_X < -2*this.bgRepeat) this.medBack_X += this.bgRepeat;

        // if (this.nerBack_X >= -this.bgRepeat) this.nerBack_X -= this.bgRepeat;
        // if (this.nerBack_X < -2*this.bgRepeat) this.nerBack_X += this.bgRepeat;
    }

    draw(ctx) {
        GRAPHICS.get('SET_background').tileSprite(ctx, 2, this.farBack_X - GAME.cam_x * (1/3), this.farBack_Y, 20, 1, this.bgTileScale); // far
        GRAPHICS.get('SET_background').tileSprite(ctx, 1, this.medBack_X - GAME.cam_x * (2/3), this.medBack_Y, 20, 1, this.bgTileScale); // mid
        GRAPHICS.get('SET_background').tileSprite(ctx, 0, this.nerBack_X - GAME.cam_x * (3/3), this.nerBack_Y, 20, 1, this.bgTileScale); // close

        GRAPHICS.get('SET_stone_path').tileSprite(ctx, 0, this.road_X - GAME.cam_x, this.road_Y, 40, 1, this.roadScale); // road

        
    }
}