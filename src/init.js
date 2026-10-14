import { gameData } from "./database.js";
import { gameTextures } from "./loadAllTextures.js";
import * as ljs from "littlejsengine";
import { PlayerClass } from "./initPlayer.js";
let player;
let terrainList = {};
let plantMetaData;
let plantList = {};
async function getPlantMetaData() {
  await fetch("/src/plantMetadata.json")
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      if (data != undefined && data) {
        plantMetaData = JSON.parse(data);
        plantList = plantMetaData.plants;
        return plantMetaData;
      }
    });
  
}
class Plant extends ljs.EngineObject {
  constructor(type, x, y) {
    super(
      ljs.vec2(x, y),
      ljs.vec2(1, 1),
      gameTextures[type],
      0,
      ljs.WHITE,
      -this.pos.y,
    );
    this.type = type;
  }
  update() {
    this.renderOrder = -this.pos.y;
  }
}

class Terrain extends ljs.EngineObject {
  constructor(type, x, y, terrainType) {
    super(
      ljs.vec2(x, y),
      ljs.vec2(1, 1),
      gameTextures[type],
      0,
      ljs.WHITE,
      -Infinity,
    );
    this.type = type;
    this.terrainType = terrainType;
    terrainList[`${x},${y}`] = this;
  }
}
function initializeEngine() {
  ljs.setObjectDefaultDamping(0.55);

  new Terrain("terrainGrass", 0, 0, "grass");
  new Terrain("terrainGrass", 1, 0, "grass");
  new Terrain("terrainGrass", 2, 0, "grass");
  //player

  player = new PlayerClass(0, 0);
  player.setCollision(true);

  // ljs settings
  ljs.setCameraScale(100);
}
export {
  initializeEngine,
  Terrain,
  player,
  terrainList,
  Plant,
  plantMetaData,
  plantList,
};
export const metadataReady = getPlantMetaData();
