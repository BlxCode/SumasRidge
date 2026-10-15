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

class ProxPrompt extends ljs.EngineObject {
  constructor(x, y, text) {
    super(
      ljs.vec2(x, y),
      ljs.vec2(1, 1),
      0,
      ljs.WHITE,
      Infinity,
    );
    this.text = text;
    this.shown = true;
    this.pressedState = "unPressed";
  }
  render() {
    if (this.shown) {
      if(this.pressedState === "unPressed"){ 
      ljs.drawTile(
        gameTextures["proxPrompt"],
        this.pos.subtract(ljs.vec2(0.2, 0)),
        this.size,
        0,
        this.color,
        this.renderOrder,
      );
      ljs.drawTile(
        gameTextures["proxPromptText"+this.text],
        this.pos,
        this.size,
        0,
        this.color,
        this.renderOrder,
      );

    }
  }
  }
  update() {
    if (this.shown) {
      this.color = ljs.WHITE;
    } else {
      this.color = ljs.CLEAR_WHITE;
    }
    //press detection
    if (player.pos.distance(this.pos) <= 1.5) {
      if (ljs.keyIsDown("KeyE")) {
        this.pressedState = "down";
      }
      if (ljs.keyWasReleased("KeyE")) {
        this.pressedState = "pressed";
        window.dispatchEvent(
          new CustomEvent("proxPromptPressed", { detail: this.text }),
        );
      }
    }
  }
  delete() {
    super.delete();
  }
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
    this.plantedDay = gameData.day;
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
