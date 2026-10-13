import * as ljs from "littlejsengine";
import { gameTextures } from "./loadAllTextures.js";

class Player extends ljs.EngineObject {
  constructor(x, y) {
    super(ljs.vec2(x, y), ljs.vec2(0.8, 0.2));
    this.direction = "d";
  }
  render() {
    // adjust draw position to be at the bottom of the object
    const drawSize = ljs.vec2(1, 1.6);
    const offset = this.getUp(drawSize.y / 2);
    const pos = this.pos.add(offset);
    // get correct anim frame
    if (ljs.keyDirection().x == 0 && ljs.keyDirection().y == 0) {
      this.tileInfo = gameTextures[`guyIdle${this.direction.toUpperCase()}`];
    } else {
      const animFrame = (Math.floor(ljs.time * 5) % 4) + 1;
      this.tileInfo =
        gameTextures[`guyWalk${this.direction.toUpperCase()}${(animFrame != 4) ? animFrame : 2}`];
    }
    ljs.drawTile(pos, drawSize, this.tileInfo, this.color, this.angle);
    console.log(this.velocity);
  }
  update() {
    // apply movement controls

    // get player direction
    if (ljs.keyDirection().x == 1 && ljs.keyDirection().y == 0) {
      this.direction = "r";
    } else if (ljs.keyDirection().x == -1 && ljs.keyDirection().y == 0) {
      this.direction = "l";
    } else if (ljs.keyDirection().x == 0 && ljs.keyDirection().y == -1) {
      this.direction = "d";
    } else if (ljs.keyDirection().x == 0 && ljs.keyDirection().y == 1) {
      this.direction = "u";
    } else if (ljs.keyDirection().x == 1 && ljs.keyDirection().y == -1) {
      this.direction = "r";
    } else if (ljs.keyDirection().x == -1 && ljs.keyDirection().y == -1) {
      this.direction = "l";
    } else if (ljs.keyDirection().x == 1 && ljs.keyDirection().y == 1) {
      this.direction = "r";
    } else if (ljs.keyDirection().x == -1 && ljs.keyDirection().y == 1) {
      this.direction = "l";
    }

    const moveInput = ljs.keyDirection().clampLength(1).scale(0.1);
    this.velocity = this.velocity.add(moveInput);

    this.renderOrder = -this.pos.y;

    // move camera with player
    ljs.setCameraPos(this.pos.add(ljs.vec2(0, 2)));
  }
}
export { Player };