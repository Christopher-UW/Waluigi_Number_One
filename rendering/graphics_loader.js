class GraphicsLoader {
    constructor() { 
        // background //
        GRAPHICS.addSpriteSheet('BACKGROUND', ASSET_LOADER.getAsset('background.png'))
        GRAPHICS.addSpriteSet('SET_background', 'BACKGROUND', [0, 592, 1184], 0, 592, 272);

        // Stone path
        GRAPHICS.addSpriteSheet('STONE_PATH', ASSET_LOADER.getAsset('stones.png'));
        GRAPHICS.addSpriteSingle('SET_stone_path', 'STONE_PATH', 0, 0, 960, 306);
        
        // // // //  W A L U I G I  •  A N I M A T I O N S  // // // // // // // // // // // //=
        GRAPHICS.addSpriteSheet('WALUIGI', ASSET_LOADER.getAsset('waluigi_sprites.png'));
        // // // // // // // // // // // // // // // // // // // // // // // // // // // //
        // - Idle -
        GRAPHICS.addSpriteSet('SET_waluigi_idle_LR', 'WALUIGI',
            [ 3, 33, 65, 99], 2,
            [28, 29, 33, 30], 50,
            [0, -1, -2, -1]
        );
        GRAPHICS.addAnimation('waluigi_idle_right', 'SET_waluigi_idle_LR', [0,1,2,1], 0.4, 0, -4);
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

        // // // // // // // // // // // // // // // // // // // // // // // // // // // //
        // - hammer down -
        GRAPHICS.addSpriteSet('SET_waluigi_hammer_down_LR', 'WALUIGI',
            [ 6,  66, 132, 178, 242, 301, 687], [418, 417, 398, 422, 422, 421, 216],
            [53,  57,  37,  55,  58,  55,  64], [ 44,  45,  64,  40,  40,  41,  45],
            [0,   -4,  16,  15,  15,  15,  15], [  0,  -1, -20,   3,   3,   3,   0]
        );
        GRAPHICS.addAnimation('waluigi_hammer_down_right', 'SET_waluigi_hammer_down_LR',
            [   0,    1,    2,    3,    4,    5,    2,    1],
            [0.12, 0.12, 0.10, 0.10, 0.10, 0.25, 0.12, 0.18],
            -28, 2
        );
        GRAPHICS.cloneAnimation('waluigi_hammer_down_left', 'waluigi_hammer_down_right', 3).mirrorAnimation_Horz([0, 0, 0, -15, -18, -15, -15]);

        // // // // // // // // // // // // // // // // // // // // // // // // // // // //
        // - hammer up -
        GRAPHICS.addSpriteSet('SET_waluigi_hammer_up_LR', 'WALUIGI',
            [288, 333, 383, 439, 492, 542], [225, 226, 225, 214, 214, 225],
            [ 38,  37,  50,  46,  37,  43], [ 45,  44,  45,  56,  56,  45],
            [  0,   1,   1,   1,   1,   1], [  0,   1,   0, -11, -11,   0]
        );
        GRAPHICS.addAnimation('waluigi_hammer_up_right', 'SET_waluigi_hammer_up_LR',
            [   0,    1,    2,    3,    4,    5,    2,    1],
            [0.20, 0.08, 0.05, 0.08, 0.25, 0.05, 0.05, 0.05],
            -13, 1
        );
        GRAPHICS.cloneAnimation('waluigi_hammer_up_left', 'waluigi_hammer_up_right', 3)
            .mirrorAnimation_Horz([0, 0, -13, -9, 0, -6]); //.setAnimaSpeed(100);

        // addSpriteSet(id, spriteSheet, x_origs, y_origs, widths, heights, x_ofs = 0, y_ofs = 0, labels)
        // // // // // // // // // // // // // // // // // // // // // // // // // // // //
        // - Side hammer-
        GRAPHICS.addSpriteSet(
            'SET_waluigi_hammer_side_LR', 'WALUIGI',
            [14, 59, 104, 168, 222], [346, 346, 346, 346, 346],
            [38, 37,  61,  46,  41], 45,
            [ 0,  1,   1,   1,  -3], 0
        );
        GRAPHICS.addAnimation('waluigi_hammer_side_right', 'SET_waluigi_hammer_side_LR',
            [   0,    1,    2,    3,    4], 
            [0.25, 0.10, 0.08, 0.08, 0.20],
            -13, 1
        );
        GRAPHICS.cloneAnimation('waluigi_hammer_side_left', 'waluigi_hammer_side_right', 3).mirrorAnimation_Horz([0, 0, -24, -9, 0]);

        // // // // // // // // // // // // // // // // // // // // // // // // // // // //
        // - jump smash -
        GRAPHICS.addSpriteSet(
            'SET_waluigi_jump_smash', 'WALUIGI',
            [275, 328, 390, 454], [339, 331, 343, 345],
            [ 47,  46,  54,  43], [ 45,  54,  45,  49],
            [-11,   1,   2,   0], [-12, -20, -20, -20]
        );

        // // // // // // // // // // // // // // // // // // // // // // // // // // // //
        // - E X T R A -
        GRAPHICS.addSpriteSet(
            'SET_waluigi_jump_smash', 'WALUIGI',
            [687], [216],
            [ 64], [ 45],
            [  0], [  0]
        );



        //addSpriteSet(id, spriteSheet, x_origs, y_origs, widths, heights, x_ofs = 0, y_ofs = 0, labels) {
        GRAPHICS.addSpriteSheet('CDI_LINK', ASSET_LOADER.getAsset('cdiLink.png'));
        GRAPHICS.addSpriteSet('SET_LINK', 'CDI_LINK',
            [303, 313, 53, 60], [13, 97, 11, 96],
            [ 46,  42, 49, 44], [71, 71, 70, 70]
        );
        //addSpriteRow(id, spriteSheet, sprite_count, x_orig, y_orig, widths, heights, gaps, x_ofs, y_ofs, labels) 
        // GRAPHICS.addSpriteRow(
        //     'SET_LINK_DIE', 'CDI_LINK', 5,
        //     13, 282,
        //     [43, 47,  43, 48, 61], 71,
        //     [14, 17,14, 13]

        // )
        GRAPHICS.addSpriteSet('SET_LINK_DIE', 'CDI_LINK',
        [13, 70, 134, 191, 252], [282, 282, 283, 297, 319],
        [43, 47,  43,  48,  61], [ 69,  71,  66,  47,  23],
        [ 0,  0,   0,   0,   0], [  0,   0,   5,  25,  48]
    );

        GRAPHICS.addAnimation("link1", 'SET_LINK', [2,3,0,1], 0.2);
        GRAPHICS.addAnimation("link2", 'SET_LINK_DIE', 5, 0.2).setLooping(false);
        GRAPHICS.addAnimation("link3", 'SET_LINK', 1, 2).setLooping(false);

        //addAnimation(id, spriteSetName, fSequence, fTiming, x_offset = 0, y_offset = 0) {
    }
}