// For TCSS 491 @ UW-Tacoma, Winter 2023
const ENGINE = new GameEngine();
const ASSET_LOADER = new AssetManager("./assets/");
const ANIMANAGER = new AnimationManager();
const LEVELS = new LevelManager();

ASSET_LOADER.queueDownload("waluigi_sprites.png", "background.png", "stones.png");

ASSET_LOADER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;
	new AnimationLoader(); // <- just to build the sprites & animations into ANIMANAGER
	new LevelLoader();
	ENGINE.init(ctx);
	ENGINE.start();

	
});




