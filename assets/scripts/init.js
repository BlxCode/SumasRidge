import { gameData } from "./database.js";
import { gameTextures } from "./loadAllTextures.js";
import * as ljs from "littlejsengine";
import { Player } from "./initPlayer.js";
let player;
let terrainList = {};



class Terrain extends ljs.EngineObject {
  constructor(type, x, y) {
    super(
      ljs.vec2(x, y),
      ljs.vec2(1, 1),
      gameTextures[type],
      0,
      ljs.WHITE,
      -Infinity,
    );

    terrainList[`${x},${y}`] = this;
  }
}
function initializeEngine() {
  ljs.setObjectDefaultDamping(0.55);

  new Terrain("terrainGrass", 0, 0);
  new Terrain("terrainGrass", 1, 0);
  new Terrain("terrainGrass", 2, 0);
  //player

  player = new Player(0, 0);
  player.setCollision(true);

  // ljs settings
  ljs.setCameraScale(100);
}
export { initializeEngine, Terrain };
