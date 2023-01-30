/**
 * Made for use in TCSS 491 @UW-T Winter 2023
 * @author Christopher Henderson
 */

class Background {
    constructor(theLevel) {
        this.level = theLevel;
        // road
        this.roadScale = 0.6; this.roadTileWidth = 960;
        this.roadRepeat = this.roadScale * this.roadTileWidth;

        this.road_X = -this.roadRepeat; this.road_Y =  550; this.road_speed = 100;

        // background
        this.bgTileScale = 3; this.bgTileWidth = 592;
        this.bgRepeat = this.bgTileScale * this.bgTileWidth;

        this.farBack_X = -this.bgRepeat; this.farBack_Y = -180; this.farBack_speed =  15;
        this.medBack_X = -this.bgRepeat; this.medBack_Y = -180; this.medBack_speed =  30;
        this.nerBack_X = -this.bgRepeat; this.nerBack_Y = -180; this.nerBack_speed = 70;
    }

    

    update() {
        if (ENGINE.keys.d && !ENGINE.keys.a && !ENGINE.keys.s) {// Waluigi moving rightd
            this.road_X -= this.road_speed * ENGINE.clockTick; // road

            this.farBack_X -= this.farBack_speed * ENGINE.clockTick;
            this.medBack_X -= this.medBack_speed * ENGINE.clockTick;
            this.nerBack_X -= this.nerBack_speed * ENGINE.clockTick;
        }

        if (ENGINE.keys.a && !ENGINE.keys.d && !ENGINE.keys.s) { // Waluigi moving left
            this.road_X += this.road_speed * ENGINE.clockTick;

            this.farBack_X += this.farBack_speed * ENGINE.clockTick;
            this.medBack_X += this.medBack_speed * ENGINE.clockTick;
            this.nerBack_X += this.nerBack_speed * ENGINE.clockTick;
        }


        if (this.road_X >= -this.roadRepeat) this.road_X -= this.roadRepeat
        if (this.road_X < -2*this.roadRepeat) this.road_X += this.roadRepeat;

        if (this.farBack_X >= -this.bgRepeat) this.farBack_X -= this.bgRepeat;
        if (this.farBack_X < -2*this.bgRepeat) this.farBack_X += this.bgRepeat;

        if (this.medBack_X >= -this.bgRepeat) this.medBack_X -= this.bgRepeat;
        if (this.medBack_X < -2*this.bgRepeat) this.medBack_X += this.bgRepeat;

        if (this.nerBack_X >= -this.bgRepeat) this.nerBack_X -= this.bgRepeat;
        if (this.nerBack_X < -2*this.bgRepeat) this.nerBack_X += this.bgRepeat;
    }

    draw(ctx) {
        ANIMANAGER.getSpriteSet('SET_background').tileSprite(ctx, 2, this.farBack_X, this.farBack_Y, 5, 1, this.bgTileScale); // far
        ANIMANAGER.getSpriteSet('SET_background').tileSprite(ctx, 1, this.medBack_X, this.medBack_Y, 5, 1, this.bgTileScale); // mid
        ANIMANAGER.getSpriteSet('SET_background').tileSprite(ctx, 0, this.nerBack_X, this.nerBack_Y, 5, 1, this.bgTileScale); // close

        ANIMANAGER.getSpriteSet('SET_stone_path').tileSprite(ctx, 0, this.road_X, this.road_Y, 5, 1, this.roadScale); // road
    }
}