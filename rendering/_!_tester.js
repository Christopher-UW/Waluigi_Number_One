const ENGINE = new GameEngine();
const ASSET_LOADER = new AssetManager("../assets/");
const GRAPHICS = new GraphicsManager();
const SCALE = 5;

ASSET_LOADER.queueDownload("background.png", "stones.png", "waluigi_sprites.png");

ASSET_LOADER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;

    loader();
    ENGINE.addEntity(new Testy(canvas, SCALE));

	ENGINE.init(ctx);
	ENGINE.start();
	
});

function loader() {
    // background //
    GRAPHICS.addSpriteSheet('BACKGROUND', ASSET_LOADER.getAsset('background.png'))
    GRAPHICS.addSpriteSet('SET_background', 'BACKGROUND', [0, 592, 1184], 0, 592, 272);

    // Stone path
    GRAPHICS.addSpriteSheet('STONE_PATH', ASSET_LOADER.getAsset('stones.png'));
    GRAPHICS.addSpriteSingle('SET_stone_path', 'STONE_PATH', 0, 0, 960, 306);

    // OLD addSpriteSet(id, spriteSheet, x_origs, x_ends, y_origs, y_ends, x_offsets = 0, y_offsets = 0)
    // addSpriteSet(id, spriteSheet, x_origs, y_origs, widths, heights, x_ofs = 0, y_ofs = 0, labels)
    
    // // // //  W A L U I G I  •  A N I M A T I O N S  // // // // // // // // // // // //
    // - Idle -
    GRAPHICS.addSpriteSheet('WALUIGI', ASSET_LOADER.getAsset('waluigi_sprites.png'));

    GRAPHICS.addSpriteSet('SET_waluigi_idle_LR', 'WALUIGI',
        [ 3, 33, 65, 99], 2, [28, 29, 33, 30], 50, [0, -1, -2, -1]);

    GRAPHICS.addAnimation('waluigi_idle_right', 'SET_waluigi_idle_LR', [0,1,2,1], 0.4, 2, -12);
    GRAPHICS.cloneAnimation('waluigi_idle_left', 'waluigi_idle_right').mirrorAnimation_Horz(0);
    // // // // // // // // // // // // // // // // // // // // // // // // // // // //
    // - Walk -
    GRAPHICS.addSpriteSet('SET_waluigi_walk_LR', 'WALUIGI', 
        [313, 346, 384, 426, 463, 497, 536, 576], 57, [29, 32, 31, 31, 29, 32, 32, 29], 46, [0,-2,-3,0,2,0,0,3]);
        
    GRAPHICS.addAnimation('waluigi_walk_right', 'SET_waluigi_walk_LR', 8, 1);
    GRAPHICS.cloneAnimation('waluigi_walk_left', 'waluigi_walk_right').mirrorAnimation_Horz([0,0,2,0,0,0,0,0]);

}   // addAnimation(id, spriteSetName, fSequence, fTiming, x_offset = 0, y_offset = 0)

class Testy{
    constructor(canvas, scale) {this.x = 150; this.y = 100; this.scale = 3}
    update(){}
    draw(ctx, scale) { // drawSprite(sKey, ctx, dx, dy, xScale, yScale)
        GRAPHICS.get('SET_background').drawSprite(0, ctx, 0,0,2)
        GRAPHICS.get('waluigi_walk_left').animate(ENGINE.clockTick, ctx, this.x, this.y, this.scale);
    }
}