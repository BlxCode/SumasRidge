import * as ljs from "littlejsengine";
import { gameTextures } from "./loadAllTextures.js";
import { terrainList } from "./init.js";

const terrainColors = {
  grass: new ljs.Color(0.2, 0.8, 0.2),
  dirt: new ljs.Color(0.5, 0.3, 0.1),
  water: new ljs.Color(0.1, 0.1, 0.8),
};

class PlayerClass extends ljs.EngineObject {
  constructor(x, y) {
    super(ljs.vec2(x, y), ljs.vec2(0.8, 0.2));
    this.direction = "d";
    this.drawSize = ljs.vec2(1, 1.6);
    this.offset = this.getUp(this.drawSize.y / 2);
    this.centerPos = this.pos.add(this.offset);
  }
  render() {
    this.centerPos = this.pos.add(this.offset);
    // adjust draw position to be at the bottom of the object
    // get correct anim frame
    // particles

    if (ljs.keyDirection().x != 0 || ljs.keyDirection().y != 0) {
      if (
        terrainList[`${Math.round(this.pos.x)},${Math.round(this.pos.y)}`] !==
        undefined
      ) {
        const terrainColor =
          terrainColors[
            terrainList[`${Math.round(this.pos.x)},${Math.round(this.pos.y)}`]
              .terrainType
          ];
        const particleWalk = new ljs.ParticleEmitter(
          ljs.vec2(this.pos.x, this.pos.y),
          0,
          ljs.vec2(0.1, 0.01),
          0.1,
          10,
          180,
          undefined,
          terrainColor ?? ljs.BLACK,
          terrainColor ?? ljs.BLACK,
          ljs.CLEAR_WHITE,
          ljs.CLEAR_WHITE,
          0.1,
          0.1,
          0.1,
        );
        setTimeout(() => {
          particleWalk.destroy(true);
        }, 100);
      }
    }
    if (ljs.keyDirection().x == 0 && ljs.keyDirection().y == 0) {
      this.tileInfo = gameTextures[`guyIdle${this.direction.toUpperCase()}`];
    } else {
      const animFrame = (Math.floor(ljs.time * 5) % 4) + 1;
      this.tileInfo =
        gameTextures[
          `guyWalk${this.direction.toUpperCase()}${animFrame != 4 ? animFrame : 2}`
        ];
    }
    //shadow
    ljs.drawTile(
      this.pos.add(ljs.vec2(0, 0.35)),
      ljs.vec2(1.05),
      gameTextures["playerShadow"],
      new ljs.Color(0, 0, 0, 0.5),
    );
    ljs.drawTile(
      this.centerPos,
      this.drawSize,
      this.tileInfo,
      this.color,
      this.angle,
    );
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
export { PlayerClass };
