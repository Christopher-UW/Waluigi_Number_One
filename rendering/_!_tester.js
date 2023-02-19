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
//  addSpriteRow(id, spriteSheet, sprite_count, x_orig, y_orig, widths, heights, gaps, x_ofs, y_ofs
//  addSpriteGrid( id, spriteSheet, row_count, col_count, x_orig, y_orig, widths, heights, row_gaps, col_gaps, x_ofs, y_ofs, labels) {
//  addSpriteSet(id, spriteSheet, x_origs, y_origs, widths, heights, x_ofs = 0, y_ofs = 0, labels)
//  addSprite(spriteSheet, sx, sy, sWidth, sHeight, x_ofs, y_ofs, label) {

  
    GRAPHICS.addSpriteSheet('WALUIGI', ASSET_LOADER.getAsset('waluigi_sprites.png'));

    GRAPHICS.addSpriteSet('SET_waluigi_idle_LR', 'WALUIGI',
        [ 3, 33, 65, 99], 2,
        [28, 29, 33, 30], 50,
        [0, -1, -2, -1]
    );

    console.log(GRAPHICS.get('SET_waluigi_idle_LR').getCount())

    GRAPHICS.addSpriteSet('SET_waluigi_idle_LR', 'WALUIGI', 20,20,20,20);

    GRAPHICS.addAnimation('waluigi_idle_right', 'SET_waluigi_idle_LR', [0,1,2,1], 0.4, 0, -4);

    GRAPHICS.get('SET_waluigi_idle_LR').addDeathFlashes(0);
    GRAPHICS.addAnimation('waluigi_die', 'SET_waluigi_idle_LR', [0,4,5,4], 0.2, 0, -4);

    


} // addAnimation(id, spriteSetName, fSequence, fTiming, x_offset = 0, y_offset = 0)

class Testy {
    constructor(canvas, scale) {
        this.x = 150;
        this.y = 100;
        this.scale = 3;

        // this.testy = new Sprite(ASSET_LOADER.getAsset('waluigi_sprites.png'), 3, 2, 28, 50,0,0,'test');
        // this.testy.pixelTest();
    }
    update(){}
    draw(ctx, scale) { // drawSprite(sKey, ctx, dx, dy, xScale, yScale)
        // this.testy.draw(ctx, 60, 100, 4, 4);
        GRAPHICS.get('waluigi_idle_right').animate(ENGINE.clockTick, ctx, 100, 100, 4);
        GRAPHICS.get('waluigi_die').animate(ENGINE.clockTick, ctx, 300, 100, 4);
        // // GRAPHICS.get('SET_waluigi_idle_LR').addDeathFlashes(0);
        // GRAPHICS.get('SET_waluigi_idle_LR').getSprite_byIndex(5).draw(ctx, 60, 100, 4, 4);
        // // GRAPHICS.get('SET_waluigi_idle_LR').sprites[0].clone().draw(ctx, 60, 100, 4, 4);
    }
}