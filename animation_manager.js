/**
 * Made for use in TCSS 491 @UW-T Winter 2023
 * @author Christopher Henderson
 */

// Global Stuff
const DEBUG = 0; // <--is broken, I bet it was you! shame on you 🤨

/**
 * Manages the Animations, and also the sprites
 */
class AnimationManager {
    constructor() {
        this.spriteSheets = new Map(); // <string: id, object: Image>
        this.spriteSets = new Map();   // <string: id, object: SpriteSet>
        this.animations = new Map();   // <string: id, object: Animation>
    }

    // you don't need to use the getters, but they are here if you prefer to use them 😀
    getSpriteSheet(id) { return this.spriteSheets.get(id); }
    getSpriteSet(id) { return this.spriteSets.get(id); }
    getAnimation(id) { return this.animations.get(id); }

    /**
     * Adds a SpriteSheet to the collection
     * @param {string} id 
     * @param {string} spriteSheet 
     */
    addSpriteSheet(id, spriteSheet) {
        // TODO: check for stuff
        this.spriteSheets.set(id, spriteSheet);
        return this.getSpriteSheet(id);
    }

    /**
     * For when you just want 1 sprite
     * 
     * @param {string} id The unique ID of this Sprite
     * @param {string | object} spriteSheet Unique ID of SpriteSheet or a SpriteSheet Object
     * @param {number} x_orig X-origin of the sprite
     * @param {number} y_orig Y-origin of the sprite
     * @param {number} width width of the sprite
     * @param {number} height height of the sprite
     * @param {number} x_offset Optional : offsets the sprite's x position when drawn
     * @param {number} y_offset Optional : offsets the sprite's y position when drawn
     */
    addSpriteSingle(id, spriteSheet, x_orig, y_orig, width, height, x_offset = 0, y_offset = 0) {
        if (typeof spriteSheet === 'string') spriteSheet = this.spriteSheets.get(spriteSheet); // we need the object

        if (this.spriteSets.has(id)) console.log(`addSpriteSet: spriteSets.${id} has been overridden!`);
        const theNewSpriteSet = new SpriteSet(id, spriteSheet, [x_orig], [y_orig], [width], [height], [x_offset], [y_offset]);
        this.spriteSets.set(id, theNewSpriteSet);
        return theNewSpriteSet;
    }

    /**
     * Add Sprites that all line up in a row, they need to have const width and height
     * @param {string} id The unique ID of this Sprite
     * @param {string} spriteSheet Unique ID of SpriteSheet or a SpriteSheet Object
     * @param {number} x_orig the x position of the entire row
     * @param {number} y_orig the y position of the entire row
     * @param {number} width the width of all sprite in row
     * @param {number} height the height of all sprite in the row
     * @param {number} count the number of sprite in the row 
     * @param {number | number[]} gaps the gap between the sprites in the row
     * @param {number[]} x_offsets optional : offsets the sprite's x position when drawn
     * @param {number[]} y_offset optional : offsets the sprite's y position when drawn
     * @returns 
     */
    addSpriteRow(id, spriteSheet, x_orig, y_orig, width, height, count, gaps, x_offsets = 0, y_offset = 0) {
        if (typeof spriteSheet === 'string') spriteSheet = this.spriteSheets.get(spriteSheet); // we need the object

        if (typeof gaps === 'number') gaps = Array(count).fill(gaps);
        else gaps.push(0); // padds a 0 at the end bc 1 less gap than count

        let xstart = x_orig;
        let x_origs = Array(count);
        for (let i = 0; i < count; i++) {
            x_origs[i] = xstart; xstart += width + gaps[i];
        }
        let y_origs = Array(count).fill(y_orig);
        let widths = Array(count).fill(width);
        let heights = Array(count).fill(height);

        if (typeof x_offsets === 'number')
            x_offsets = Array(count).fill(x_offsets); // x_offsets are all the same

        let y_offsets = Array(count).fill(y_offset); // y_offsets are all the same 

        if (this.spriteSets.has(id)) console.log(`addSpriteSet: spriteSets.${id} has been overridden!`);
        const theNewSpriteSet = new SpriteSet(id, spriteSheet, x_origs, y_origs, widths, heights, x_offsets, y_offsets);
        this.spriteSets.set(id, theNewSpriteSet);
        return theNewSpriteSet;
    }

    /**
     * Adds a SpriteSet to the collection
     * 
     * @param {string} id The unique ID of this SpriteSet
     * @param {string | object} spriteSheet Unique ID of SpriteSheet or a SpriteSheet Object
     * @param {number[] | number} x_origs List of X-origin's of each sprite or a single shared X-origin
     * @param {number[] | number} x_ends List of X-end cord. of each sprite or a single shared X-end cord
     * @param {number[] | number} y_origs List of Y-origin's of each sprite or a single shared Y-origin
     * @param {number[] | number} y_ends List of Y-end cord. of each sprite or a single shared Y-end cord
     * @param {number[] | number} x_offsets Optional : offsets each sprite's x position when drawn
     * @param {number[] | number} y_offsets Optional : offsets each sprite's y position when drawn
     */
    addSpriteSet(id, spriteSheet, x_origs, x_ends, y_origs, y_ends, x_offsets = 0, y_offsets = 0) {
        if (typeof spriteSheet === 'string') spriteSheet = this.spriteSheets.get(spriteSheet); // we need the object

        // we need to determine the number of sprites in the set 
        if (x_origs instanceof Array) var sprtCount = x_origs.length;
        else if (y_origs instanceof Array) var sprtCount = x_origs.length;
        else if (widths instanceof Array) var sprtCount = widths.length;
        else if (heights instanceof Array) var sprtCount = heights.length;
        else var sprtCount = 1;

        let widths = [];
        let heights = [];

        if (typeof x_origs === 'number') x_origs = Array(sprtCount).fill(x_origs); // X origins are all the same
        if (typeof y_origs === 'number') y_origs = Array(sprtCount).fill(y_origs); // y origins are all the same

        if (typeof x_ends === 'number') { // widths are all the same
            x_ends = Array(sprtCount).fill(widths);
        }
        if (typeof x_ends === 'object') { // calculate widths
            for (let i = 0; i < sprtCount; i++)
                widths.push(x_ends[i] - x_origs[i]);
        }

        if (typeof y_ends === 'number') { // heights are all the same
            y_ends = Array(sprtCount).fill(y_ends);
        }
        if (typeof y_ends === 'object') { // calculate heights
            for (let i = 0; i < sprtCount; i++)
                heights.push(y_ends[i] - y_origs[i]);
        }

        if (typeof x_offsets === 'number') x_offsets = Array(sprtCount).fill(x_offsets); // x_offsets are all the same
        if (typeof y_offsets === 'number') y_offsets = Array(sprtCount).fill(y_offsets); // y_offsets are all the same 

        if (!(x_origs.length === y_origs.length && y_origs.length === widths.length &&
            widths.length === heights.length && heights.length === x_offsets.length &&
            x_offsets.length === y_offsets.length)) { // they should all be the same length

            throw new Error(`The lengths of the addSpriteSetMax() parameter arrays are not
                            all the same, the lengths of each are:\n
                            x-orig = ${x_origs.length}, y-orig = ${y_origs.length},
                            widths = ${widths.length}, heights = ${heights.length},
                            x-offsets = ${x_offsets.length}, y-offsets = ${y_offsets.length})`);
        }

        if (this.spriteSets.has(id)) console.log(`addSpriteSet: spriteSets.${id} has been overridden!`);
        const theNewSpriteSet = new SpriteSet(id, spriteSheet, x_origs, y_origs, widths, heights, x_offsets, y_offsets);
        this.spriteSets.set(id, theNewSpriteSet);
        return theNewSpriteSet;
    }

    /**
     * 
     * @param {string | Animation} id The unique ID of this Animation, or a pre-built Animation object
     * @param {string} spriteSetName Unique ID of SpriteSet this Animation uses
     * @param {number[]} fSequence In-order list of sprites in animation 
     * @param {number[] | number} fTiming In-order list of frame durations (milliseconds) pass one number for all same timing
     */
    addAnimation(id, spriteSetName, fSequence, fTiming, x_offset = 0, y_offset = 0) {
        if (typeof fSequence === 'number') {
            let count = fSequence;
            fSequence = Array(count);
            for (let i = 0; i < count; i++) fSequence[i] = i;
        }
        if (typeof fTiming === 'number') fTiming = Array(fSequence.length).fill(fTiming);

        if (fSequence.length !== fTiming.length) {
            // Willy-Wonka-Wack-Attack: GOOD DAY SIR!
            throw new Error(`fSequence.length = ${fSequence.length} but fTiming.length = ${fTiming.length} ... GOOD DAY SIR!`);
        }
        if (this.animations.has(id)) {
            console.log(`addAnimation: animations.${id} has been overridden!`);
        }

        const setObj = this.spriteSets.get(spriteSetName); // Animation class constructor wants the SpriteSet object
        const theNewAnimation = new Animation(id, setObj, fSequence, fTiming, x_offset, y_offset);
        this.animations.set(id, theNewAnimation);
        return theNewAnimation;

    }

    /**
     * Clones a SpriteSet and puts the clone into the spriteSets map.
     * DOES NOT clone any modifications to the sprites in the Set, ie the array of Sprite objects
     * @param {string} clone_id
     * @param {string} orig_id 
     */
    cloneSpriteSet(clone_id, orig_id) {
        const mrClone = this.getSpriteSet(orig_id).clone(clone_id);
        this.spriteSets.set(clone_id, mrClone);
        return mrClone;
    }

    /**
     * Clones an Animation and puts the clone into the animations map.
     * DOES NOT clone any modifications to the Animation after it first declared
     * @param {string} clone_id 
     * @param {string} orig_id
     */
    cloneAnimation(clone_id, orig_id) {
        const mrClone = this.getAnimation(orig_id).clone(clone_id);
        this.animations.set(clone_id, mrClone);
        return mrClone;
    }
}

/**@access Private : don't call this, don't even look at it!*/
class Sprite { // AH! I caught you 😠
    constructor(image, sx = 0, sy = 0, sWidth = image.width, sHeight = image.height) {
        Object.assign(this, { image, sx, sy, sWidth, sHeight });
        this.isImageBitmap = image instanceof ImageBitmap;
    }

    fitToImage() {
        this.sx = 0; this.sy = 0;
        this.sWidth = this.image.width;
        this.sHeight = this.image.height;
    }

    isImageBitmap() { return this.isImageBitmap; }

    convertToImageBitmap() {
        if (this.image instanceof ImageBitmap) {
            console.error("Cannot convert To ImageBitmap because this sprite is already a ImageBitmap");
            return;
        }
        let offscn_canvas = new OffscreenCanvas(this.sWidth, this.sHeight);
        let offscn_ctx = offscn_canvas.getContext('2d');
        offscn_ctx.drawImage(this.image, this.sx, this.sy, this.sWidth, this.sHeight, 0, 0, this.sWidth, this.sHeight);
        this.image = offscn_canvas.transferToImageBitmap();
        this.fitToImage();
    }

    mirrorImg(horz, vert) {
        if (!(this.isImageBitmap)) {
            this.convertToImageBitmap();
        }
        let ofscn_canvas = new OffscreenCanvas(this.sWidth, this.sHeight);
        let ofscn_ctx = ofscn_canvas.getContext('2d');
        ofscn_ctx.scale(horz ? -1 : 1, vert ? -1 : 1);
        ofscn_ctx.drawImage(this.image, this.sx, this.sy, this.sWidth, this.sHeight,
            horz ? -this.sWidth : 0, vert ? -this.sHeight : 0, this.sWidth, this.sHeight
        );
        this.image = ofscn_canvas.transferToImageBitmap();
    }

    draw(ctx, dx, dy, dWidth, dHeight) {
        ctx.drawImage(this.image, this.sx, this.sy, this.sWidth, this.sHeight, dx, dy, dWidth, dHeight);
    }
}


class SpriteSet {
    /** Don't use this, call a SpriteSet constructor in the AnimationManager class instead. */
    constructor(id, spriteSheet, sx_s, sy_s, sWidth_s, sHeight_s, x_offset_s, y_offset_s) {
        Object.assign(this, { id, spriteSheet, sx_s, sy_s, sWidth_s, sHeight_s, x_offset_s, y_offset_s });
        this.count = sx_s.length;

        // building and filling the array of Sprite obj
        this.spriteSet = Array(this.count);
        for (let i = 0; i < this.count; i++)
            this.spriteSet[i] = new Sprite(spriteSheet, this.sx_s[i], this.sy_s[i], this.sWidth_s[i], this.sHeight_s[i])
    }

    get_id() {return this.id;}
    set_x_offsets(new_x_offsets) {this.x_offset_s = new_x_offsets;}

    clone(clones_id) {
        return new SpriteSet(
            clones_id, this.spriteSheet,
            this.sx_s, this.sy_s, 
            this.sWidth_s, this.sHeight_s,
            this.x_offset_s, this.y_offset_s
        );
    }
    
    /** Horizontally mirrors (flip over x-axis) all the sprites in this set. */
    mirrorSet_Horz() {this.spriteSet.forEach(sprite => sprite.mirrorImg(true, false));}

    /** Vertically mirrors (flip over y-axis) all the sprites in this set. */
    mirrorSet_Vert() { this.spriteSet.forEach(sprite => sprite.mirrorImg(false, true)); }

    /** Horizontally & Vertically mirrors all the sprites in this set. */
    mirrorSet_Both() { this.spriteSet.forEach(sprite => sprite.mirrorImg(true, true)); }

    getSpriteCount() {
        return this.count;
    }

    getSpriteDimensions(spriteKey, log = false) {
        if (log)
            console.log(`${this.id}[${spriteKey}] --> width: ${sWidth_s[spriteKey]}, height:${sHeight_s[spriteKey]}`);
        return [sWidth_s[spriteKey], sHeight_s[spriteKey]];
    }

    drawSprite(ctx, sKey, dx, dy, xScale = 1, yScale = xScale) {
        if (sKey >= this.count) return;

        let sWidth = this.sWidth_s[sKey];
        let sHeight = this.sHeight_s[sKey];
        let dWidth = sWidth * xScale;
        let dHeight = sHeight * yScale;

        dx += this.x_offset_s[sKey] * xScale;
        dy += this.y_offset_s[sKey] * yScale;

        if (DEBUG >= 2) {
            console.log(`dx:${dx}  dy:${dy}  xs:${xScale}  ys:${yScale}  sx:${sx}  sy:${sy}  sWidth:${sWidth}  
            sHeight:${sHeight}  dWidth:${dWidth}  dHeight:${dHeight}`)
        }

        // ctx.drawImage(this.spriteSet[sKey], 0, 0, sWidth, sHeight, dx, dy, dWidth, dHeight);
        this.spriteSet[sKey].draw(ctx, dx, dy, dWidth, dHeight);

        if (DEBUG >= 1) {
            ctx.lineWidth = 1;
            ctx.fillStyle = "rgba(100, 220, 255, 1)";
            ctx.strokeStyle = "rgba(50, 255, 50, 0.8)";
            ctx.font = '9px monospace';

            ctx.strokeRect(dx, dy, dWidth, dHeight);
            ctx.fillText('s:' + sKey, dx + 2, dy - 5); // sprite number
            ctx.fillText('x:' + Math.floor(dx), dx + 2, dy - 25); // x orig-cord
            ctx.fillText('y:' + Math.floor(dy), dx + 2, dy - 15); // y orig-cord
            ctx.fillText('w:' + dWidth, dx + (dWidth / 2) - 12, dy + dHeight + 15); // width of sprite
            ctx.fillText('h:' + dHeight, dx + dWidth + 5, dy + (dHeight / 2) + 5);  // height of sprite
        }
    }

    tileSprite(ctx, spriteIndex, dx, dy, numHorzTiles, numVertTiles, xScale = 1, yScale = xScale) {
        if (spriteIndex instanceof Array) {
            let sWidth = this.sWidth_s[spriteIndex[0]];
            let sHeight = this.sHeight_s[spriteIndex[0]];

            for (let h = 0; h < numHorzTiles; h++) {
                for (let v = 0; v < numVertTiles; v++) {
                    let dx_t = dx + h * sWidth * xScale;
                    let dy_t = dy + v * sHeight * yScale;
                    this.drawSprite(ctx, spriteIndex[v, h], dx_t, dy_t, xScale, yScale);
                }
            }
        } else {
            let sWidth = this.sWidth_s[spriteIndex];
            let sHeight = this.sHeight_s[spriteIndex];

            for (let h = 0; h < numHorzTiles; h++) {
                for (let v = 0; v < numVertTiles; v++) {
                    let dx_t = dx + h * sWidth * xScale;
                    let dy_t = dy + v * sHeight * yScale;
                    this.drawSprite(ctx, spriteIndex, dx_t, dy_t, xScale, yScale);
                }
            }
        }
    }
};

/**
 * Animation™ makes the animation magic happen 🐭
 */
class Animation {
    /**
     * @param {string} id The unique ID of this Animation
     * @param {SpriteSet} spriteSet see SpriteSet® 
     * @param {number[]} fSequence In-order list of sprites in animation 
     * @param {number[]} fTiming In-order list of frame durations (milliseconds)
     */
    constructor(id, spriteSet, fSequence, fTiming, x_offset, y_offset) {
        if (fSequence.length !== fTiming.length)
            throw new Error('Animation: fSequence and fTiming are not same length');

        Object.assign(this, { id, spriteSet, fSequence, fTiming, x_offset, y_offset });
        this.fCount = this.fSequence.length;
        this.init();
    }

    init() {
        this.fTiming_mod = [...this.fTiming];
        this.fSequence_mod = [...this.fSequence];
        this.x_offset_mod = this.x_offset;
        this.y_offset_mod = this.y_offset;

        this.tempo = 1;
        this.elapsedTime = 0;
        this.currFrame = 0;
        this.nextFrameAt = this.fTiming_mod[0] * this.tempo;
        this.looping = true;
    }

    reset() {
        this.elapsedTime = 0;
        this.currFrame = 0;
        this.nextFrameAt = this.fTiming_mod[0] * this.tempo;
    }

    clone(clones_id) {
        return new Animation(
            clones_id, this.spriteSet, 
            this.fSequence, this.fTiming,
            this.x_offset, this.y_offset
        );
    }

    mirrorAnimation_Horz(new_x_offset_s, new_x_offset_a) {
        const cloneID = (this.spriteSet.get_id() + '_clone');
        const spriteSetClone = this.spriteSet.clone(cloneID);
        spriteSetClone.mirrorSet_Horz();
        if (!(new_x_offset_s === undefined)) {spriteSetClone.set_x_offsets(new_x_offset_s);}
        if (!(new_x_offset_a === undefined)) {this.x_offset = new_x_offset_a;}
        this.spriteSet = spriteSetClone;
        
    }

    getFrameDimensions(log = false) {
        return spriteSet.getSpriteDimensions(this.currFrame, log);
    }

    setLooping(looping) {
        this.looping = looping;
    }

    setAnimaSpeed(animationSpeed) {
        this.tempo = 100 / animationSpeed;
    }

    reverseAnima() {
        this.fTiming_mod.reverse();
        this.fSequence_mod.reverse();
    }

    calcFrame() {
        if (this.elapsedTime >= this.nextFrameAt) {
            if (this.currFrame < this.fCount - 1) {
                this.currFrame++;
                this.nextFrameAt += this.fTiming_mod[this.currFrame] * this.tempo;
            }
            else if (this.looping) this.reset();
            // else just keep returning the last frame
        }
        return this.fSequence_mod[this.currFrame];
    }

    animateSprite(tick, ctx, dx, dy, xScale = 1, yScale = xScale) {
        let frameNum = this.calcFrame();
        this.spriteSet.drawSprite(ctx, frameNum, dx + this.x_offset_mod, dy + this.y_offset_mod, xScale, yScale)

        if (DEBUG >= 1) {
            ctx.lineWidth = 1;
            ctx.fillStyle = "rgba(100, 220, 255, 1)";
            ctx.strokeStyle = "rgba(50, 255, 50, 0.8)";
            ctx.font = '10px monospace';

            ctx.fillText('f:' + this.fSequence[this.currFrame], dx + 25, dy - 5); // animation frame number

            let dur = Math.floor(this.fTiming_mod[this.currFrame] * 1000);
            ctx.fillText('ms:' + dur, dx + 50, dy - 5); // animation frame duration in milliseconds
        }

        this.elapsedTime += tick;

    }
}


////// U T I L I T I E S  ///////

function validInput(inputs, types) {
    // check that all the element of types are strings
    // types.forEach(t => {if(!(typeof t === 'string')) throw new Error(`${t} is not a valid type!`)});
    if (!(types.every(s => typeof s === 'string'))) throw new Error(`${t} is not a valid type!`);
    let valid = Array(inputs.length).fill(false)
    for (let i = 0; i < inputs.length; i++) {
        types.forEach(function (type) {
            if (capitol(type)) { // if first letter is uppercase ie an Object
                if (inputs[i] instanceof type) valid[i] = true;
            } else {
                if (typeof inputs[i] === type) valid[i] = true; // else it a primitive
            }
        })
    }

    for (let i = 0; i < inputs.length; i++) {
        if (!valid[i]) console.log(`Inputs[${i}] is of type: ${typeof inputs[i] === 'object' ? inputs[i].constructor.name : typeof inputs[i]}, which is not a valid type.\nValid types are: ${types}`)
    }
}
// let var1 = 5; let var2 = "Timmy"; let var3 = [1];
// validInput([var1, var2, var3], ['number', 'string']);



function capitol(str) {
    return (str.charAt(0) <= 90 && str.charAt(0) >= 65);
}
