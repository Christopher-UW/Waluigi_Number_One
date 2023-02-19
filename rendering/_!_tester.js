const ENGINE = new GameEngine();
const ASSET_LOADER = new AssetManager("../assets/");
const GRAPHICS = new GraphicsManager();
const SCALE = 5;

ASSET_LOADER.queueDownload("background.png", "stones.png", "waluigi_sprites.png", "enemies.png", "tlink.png", "death_effects.png");

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
    GRAPHICS.addSpriteSheet('ENEMIES', ASSET_LOADER.getAsset('enemies.png'));
    GRAPHICS.addSpriteSheet('DEATHFX', ASSET_LOADER.getAsset('death_effects.png'));
//  addSpriteRow(id, spriteSheet, sprite_count, x_orig, y_orig, widths, heights, gaps, x_ofs, y_ofs
//  addSpriteGrid( id, spriteSheet, row_count, col_count, x_orig, y_orig, widths, heights, row_gaps, col_gaps, x_ofs, y_ofs, labels) {
//  addSpriteSet(id, spriteSheet, x_origs, y_origs, widths, heights, x_ofs = 0, y_ofs = 0, labels)
//  addSprite(spriteSheet, sx, sy, sWidth, sHeight, x_ofs, y_ofs, label) {



}// addAnimation(id, spriteSetName, fSequence, fTiming, x_offset = 0, y_offset = 0)

class Testy {
    constructor(canvas, scale) {this.x = 150; this.y = 100; this.scale = 3}
    update(){}
    draw(ctx, scale) { // drawSprite(sKey, ctx, dx, dy, xScale, yScale)
        // GRAPHICS.get('TEST').animate(ENGINE.clockTick, ctx, 100, 100, 4);
    }
}