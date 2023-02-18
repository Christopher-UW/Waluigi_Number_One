// For TCSS 491 @ UW-Tacoma, Winter 2023
const ENGINE = new GameEngine();
const ASSET_LOADER = new AssetManager("./assets/");
const GRAPHICS = new GraphicsManager();
const GAME = new GameManager();

ASSET_LOADER.queueDownload("waluigi_sprites.png", "background.png", "stones.png", "cdiLink.png");

ASSET_LOADER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;
	new GraphicsLoader(); // <- just to build the sprites & animations into GRAPHICS
	ENGINE.init(ctx);
	GAME.init(ctx);
	ENGINE.start();

	
});




