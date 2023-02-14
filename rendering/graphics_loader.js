class GraphicsLoader {
    constructor() { 
        // background //
        GRAPHICS.addSpriteSheet('BACKGROUND', ASSET_LOADER.getAsset('background.png'))
        GRAPHICS.addSpriteSet('SET_background', 'BACKGROUND', [0, 592, 1184], 0, 592, 272);

        // Stone path
        GRAPHICS.addSpriteSheet('STONE_PATH', ASSET_LOADER.getAsset('stones.png'));
        GRAPHICS.addSpriteSingle('SET_stone_path', 'STONE_PATH', 0, 0, 960, 306);
        
        // // // //  W A L U I G I  •  A N I M A T I O N S  // // // // // // // // // // // //
        // - Idle -
        GRAPHICS.addSpriteSheet('WALUIGI', ASSET_LOADER.getAsset('waluigi_sprites.png'));

        GRAPHICS.addSpriteSet('SET_waluigi_idle_LR', 'WALUIGI',
            [ 3, 33, 65, 99], 2,
            [28, 29, 33, 30], 50,
            [0, -1, -2, -1]
        );
        GRAPHICS.addAnimation('waluigi_idle_right', 'SET_waluigi_idle_LR', [0,1,2,1], 0.4, 2, -12);
        GRAPHICS.cloneAnimation('waluigi_idle_left', 'waluigi_idle_right').mirrorAnimation_Horz([0,0,-3,0]);
        // // // // // // // // // // // // // // // // // // // // // // // // // // // //
        // - Walk -
        GRAPHICS.addSpriteSet('SET_waluigi_walk_LR', 'WALUIGI', 
            [313, 346, 384, 426, 463, 497, 536, 576], 57,
            [ 29,  32,  31,  31,  29,  32,  32,  29], 46,
            [  0,  -2,  -3,   0,   2,   0,   0,   3]
        );
        GRAPHICS.addAnimation('waluigi_walk_right', 'SET_waluigi_walk_LR', 8, 0.2);
        GRAPHICS.cloneAnimation('waluigi_walk_left', 'waluigi_walk_right').mirrorAnimation_Horz([0,0,2,0,0,0,0,0]);
        // // // // // // // // // // // // // // // // // // // // // // // // // // // //
        // - Run - 
        GRAPHICS.addSpriteSet('SET_waluigi_run_LR', 'WALUIGI', 
            [ 7, 41,  83, 123, 159, 190, 231, 271], 57,
            [32, 37,  36,  32,  29,  36,  33,  31], 46
        );
        GRAPHICS.addAnimation('waluigi_run_right', 'SET_waluigi_run_LR', 8, 0.12);
        GRAPHICS.cloneAnimation('waluigi_run_left', 'waluigi_run_right').mirrorAnimation_Horz();

        
        // OLD addSpriteSet(id, spriteSheet, x_origs, x_ends, y_origs, y_ends, x_offsets = 0, y_offsets = 0)
        // addSpriteSet(id, spriteSheet, x_origs, y_origs, widths, heights, x_ofs = 0, y_ofs = 0, labels)
        // // // // // // // // // // // // // // // // // // // // // // // // // // // //
        // - Smash -
        GRAPHICS.addSpriteSet('SET_waluigi_smash_LR', 'WALUIGI',
            [ 6,  66, 132, 178, 242, 301], [418, 417, 398, 422, 422, 421],
            [53,  57,  37,  55,  58,  55], [ 44,  45,  64,  40,  40,  41],
            [0,   -4,  16,  15,  15,  15], [  0,  -1, -20,   3,   3,   3]
        );
        GRAPHICS.addAnimation('waluigi_smash_right', 'SET_waluigi_smash_LR',
            [   0,    1,    2,    3,    4,    5,    4,    5,    2,    1],
            [0.12, 0.12, 0.10, 0.10, 0.05, 0.05, 0.05, 0.15, 0.12, 0.12],
            -50, 5
        );
        GRAPHICS.cloneAnimation('waluigi_smash_left', 'waluigi_smash_right').mirrorAnimation_Horz(); //mirrorAnimation_Horz([0, 0, 0, -15, -18, -15], -10)
        // GRAPHICS.getAnimation('waluigi_smash_left').x_offset = -100;
        // // // // // // // // // // // // // // // // // // // // // // // // // // // //
        // - power_smack -
        GRAPHICS.addSpriteSet(
            'SET_waluigi_power_smack_LR', 'WALUIGI',
            [14, 59, 104, 168, 222, 275, 328, 390, 454],
            [52, 96, 165, 214, 263, 322, 374, 444, 497],
            331, 394,
            [0, 1, 1, 1, -3, -3, 1, 2, 0]
        );
        GRAPHICS.addAnimation('waluigi_power_smack_right', 'SET_waluigi_power_smack_LR', 9, 0.6);
        GRAPHICS.cloneAnimation('waluigi_power_smack_left', 'waluigi_power_smack_right').mirrorAnimation_Horz();
        // // // // // // // // // // // // // // // // // // // // // // // // // // // //
        // - x -
    }

    /*
    constructor() {

        /// /// T I L E S /// ///
        GRAPHICS.addSpriteSheet('OW_TILES', ASSET_LOADER.getAsset('overworld_tiles.png'));

        GRAPHICS.addSpriteSet (
            'environment', 'OW_TILES',
            [253, 270, 287, 304, 725, 759, 776, 83],
            [ 57,  57,  57,  57,  33, 67, 67, 299],
            16, 16, 0, 0,
            ['grass_light', 'grass_thick', 'signpost_stump', 'bush1', 'grass_patch', 'light8block', 'dark8block', 'sand']
        );

        const spt = GRAPHICS.get('environment');
        GRAPHICS.addTile('grass', spt.gsl('grass_thick'));
        GRAPHICS.addTile('sand', spt.gsl('sand'));
        GRAPHICS.addTile('stone on grass', spt.gsl('grass_thick'), spt.gsl('light8block')).setBackgroundColor('rgb(72,152,72)');
        GRAPHICS.addTile('stone on sand', spt.gsl('sand'), spt.gsl('light8block'));


        // const theSprites = GRAPHICS.get('environment');
        // theSprites.forEach(sprite => {
        //     let label = sprite.label; // every sprite in the set needs to be already labeled
        //     theTileSet.addTile(String(label + '_tile'), label);
        // });


        /// /// L I N K /// ///
        
        GRAPHICS.addSpriteSheet('LINK', ASSET_LOADER.getAsset('link.png'));
        GRAPHICS.addSpriteRow('SET_link_south', 'LINK', 9, 90, 11, 16, 24, [16, 11,  9,  7, 10, 10,  7, 10]);
        GRAPHICS.addSpriteRow('SET_link_north', 'LINK', 9,  3, 94, 16, 24, [11, 11,  8, 11,  7,  9,  8,  8]);
        GRAPHICS.addSpriteRow('SET_link_east' , 'LINK', 9,  4, 55, 17, 24, [10,  9, 10,  6,  8,  9,  4,  4]);

        GRAPHICS.addAnimation('ANIMA_link_run_south', 'SET_link_south', [1,2,3,4,5,6,7], 0.1);
        GRAPHICS.addAnimation('ANIMA_link_run_north', 'SET_link_north', [1,2,3,4,5,6,7], 0.1);
        GRAPHICS.addAnimation('ANIMA_link_run_east',  'SET_link_east',  [1,2,3,4,5,6,7], 0.1);
        GRAPHICS.cloneAnimation('ANIMA_link_run_west', 'ANIMA_link_run_east').mirrorAnimation_Horz();

        GRAPHICS.addAnimation('ANIMA_link_Idle_south', 'SET_link_south', [0], 2);
        GRAPHICS.addAnimation('ANIMA_link_Idle_north', 'SET_link_north', [0], 2);
        GRAPHICS.addAnimation('ANIMA_link_Idle_east', 'SET_link_east', [0], 2);
        GRAPHICS.cloneAnimation('ANIMA_link_Idle_west', 'ANIMA_link_Idle_east').mirrorAnimation_Horz();

        GRAPHICS.addSpriteSet( // Link attack
        'SET_link_attack_west', 'LINK',
            [519, 546, 574, 611, 652, 681],
            [192, 191, 192, 192, 192, 192],
            [16, 23, 30, 31, 28, 23],
            [23, 24, 23, 23, 29, 31],
            [0, -7, -13, -14, -12, -7],
            [0, -1, 0, 0, 0, 0]
        );

    GRAPHICS.addAnimation('ANIMA_link_attack_west', 'SET_link_attack_west', 6, [0.1, 0.07, 0.05, 0.04, 0.07, 0.1]); 
    GRAPHICS.cloneAnimation('ANIMA_link_attack_east', 'ANIMA_link_attack_west').mirrorAnimation_Horz(0);

        /// /// E N E M I E S /// /// /// 
    // addSpriteSet(id, spriteSheet, x_origs, y_origs, widths, heights, x_ofs = 0, y_ofs = 0, labels)
        GRAPHICS.addSpriteSheet('ENEMIES', ASSET_LOADER.getAsset('enemies.png'));
        GRAPHICS.addSpriteSet('SET_blue_enemy_south', 'ENEMIES',  1, [156, 197, 235, 277], 22, 38);
        GRAPHICS.addSpriteSet('SET_blue_enemy_north', 'ENEMIES', 81, [161, 197, 240, 281], 22, 35, 0, [0, -6, 0, 0]);
        GRAPHICS.addSpriteSet('SET_blue_enemy_west',  'ENEMIES', 36, [161, 200, 240], [30,33,30], 28, [0,-3,0])
        
        GRAPHICS.addAnimation('ANIMA_blue_enemy_south', 'SET_blue_enemy_south', 4, 0.2);
        GRAPHICS.addAnimation('ANIMA_blue_enemy_north', 'SET_blue_enemy_north', 4, 0.2);
        GRAPHICS.addAnimation('ANIMA_blue_enemy_west', 'SET_blue_enemy_west', 3, 0.2);
        GRAPHICS.cloneAnimation('ANIMA_blue_enemy_east', 'ANIMA_blue_enemy_west').mirrorAnimation_Horz(0);

        /// /// B U N N Y /./././././././././
        GRAPHICS.addSpriteSheet('CHARTR1', ASSET_LOADER.getAsset('characters.png'))
        GRAPHICS.addSpriteSet('SET_bunny', 'CHARTR1', [4, 28, 52, 76, 100, 125, 149, 174], 419, 17, 25, 0, [0,0,0,0,0,0,0,-1]);

        GRAPHICS.addAnimation('ANIMA_bunny_south', 'SET_bunny', [2,3,4], 0.2);
        GRAPHICS.addAnimation('ANIMA_bunny_north', 'SET_bunny', [5,6,7], 0.2);
        GRAPHICS.addAnimation('ANIMA_bunny_east', 'SET_bunny', [0,1], 0.2);
        GRAPHICS.cloneAnimation('ANIMA_bunny_west','ANIMA_bunny_east').mirrorAnimation_Horz()


    } */
}