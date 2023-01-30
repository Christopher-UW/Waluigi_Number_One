/**
 * Made for use in TCSS 491 @UW-T Winter 2023
 * @author Christopher Henderson
 */

class AnimationLoader { // plan to replace with JSON loader
    constructor() {
        // background //
        ANIMANAGER.addSpriteSheet('BACKGROUND', ASSET_LOADER.getAsset('background.png'))
        ANIMANAGER.addSpriteSet('SET_background', 'BACKGROUND', [0, 592, 1184], [592, 1184, 1775], 0, 272);

        // Stone path
        ANIMANAGER.addSpriteSheet('STONE_PATH', ASSET_LOADER.getAsset('stones.png'));
        ANIMANAGER.addSpriteSingle('SET_stone_path', 'STONE_PATH', 0, 0, 960, 306);

        // // // //  W A L U I G I  •  A N I M A T I O N S  // // // // // // // // // // // //
        // - Idle -
        ANIMANAGER.addSpriteSheet('WALUIGI', ASSET_LOADER.getAsset('waluigi_sprites.png'));
        ANIMANAGER.addSpriteSet('SET_waluigi_idle_LR', 'WALUIGI',
            [ 3, 33, 65, 99],
            [31, 62, 95, 129],
            2, 52,
            [0, -1, -2, -1]
        );
        ANIMANAGER.addAnimation('waluigi_idle_right', 'SET_waluigi_idle_LR', [0,1,2,1], 0.4, 2, -12);
        ANIMANAGER.cloneAnimation('waluigi_idle_left', 'waluigi_idle_right').mirrorAnimation_Horz([0, 0, 0, 0]);
        // // // // // // // // // // // // // // // // // // // // // // // // // // // //
        // - Walk -
        ANIMANAGER.addSpriteSet('SET_waluigi_walk_LR', 'WALUIGI', 
            [313, 346, 384, 426, 463, 497, 536, 576], // x orig
            [342, 378, 418, 457, 492, 529, 568, 605], // x ends
            57, 103   // y orig and height
        );
        ANIMANAGER.addAnimation('waluigi_walk_right', 'SET_waluigi_walk_LR', 8, 0.2);
        ANIMANAGER.cloneAnimation('waluigi_walk_left', 'waluigi_walk_right').mirrorAnimation_Horz();
        // // // // // // // // // // // // // // // // // // // // // // // // // // // //
        // - Run - 
        ANIMANAGER.addSpriteSet('SET_waluigi_run_LR', 'WALUIGI', 
            [ 7, 41,  83, 123, 159, 190, 231, 271], // x orig
            [39, 78, 119, 155, 188, 226, 264, 302], // x ends
            57, 103   // y orig and height
        );
        ANIMANAGER.addAnimation('waluigi_run_right', 'SET_waluigi_run_LR', 8, 0.12);
        ANIMANAGER.cloneAnimation('waluigi_run_left', 'waluigi_run_right').mirrorAnimation_Horz();
        // // // // // // // // // // // // // // // // // // // // // // // // // // // //
        // - Smash -
        ANIMANAGER.addSpriteSet(
            'SET_waluigi_smash_LR', 'WALUIGI',
            [  6,  66, 132, 178, 242, 301], // x orig
            [ 59, 123, 169, 233, 300, 356], // x ends
            [418, 417, 398, 422, 422, 421], // y orig
            462, // y ends
            [0,-4,16,15,15,15], // x offset
            [0,-1,-20,3,3,3]   // y offset
        );
        ANIMANAGER.addAnimation(
            'waluigi_smash_right', 'SET_waluigi_smash_LR',
            [   0,    1,    2,    3,    4,    5,    4,    5,    2,    1],
            [0.12, 0.12, 0.10, 0.10, 0.05, 0.05, 0.05, 0.15, 0.12, 0.12],
            -50, 5
        );
        ANIMANAGER.cloneAnimation('waluigi_smash_left', 'waluigi_smash_right').mirrorAnimation_Horz([0, 0, 0, -15, -18, -15], -10);
        // ANIMANAGER.getAnimation('waluigi_smash_left').x_offset = -100;
        // // // // // // // // // // // // // // // // // // // // // // // // // // // //
        // - power_smack -
        ANIMANAGER.addSpriteSet(
            'SET_waluigi_power_smack_LR', 'WALUIGI',
            [14, 59, 104, 168, 222, 275, 328, 390, 454],
            [52, 96, 165, 214, 263, 322, 374, 444, 497],
            331, 394,
            [0, 1, 1, 1, -3, -3, 1, 2, 0]
        );
        ANIMANAGER.addAnimation('waluigi_power_smack_right', 'SET_waluigi_power_smack_LR', 9, 0.6);
        ANIMANAGER.cloneAnimation('waluigi_power_smack_left', 'waluigi_power_smack_right').mirrorAnimation_Horz();
        // // // // // // // // // // // // // // // // // // // // // // // // // // // //
        // - x -
    }
}