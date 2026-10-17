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
  constructor(x, y, text, dissapearOnPress = true, deleteOnPress = false) {
    super(
      ljs.vec2(x, y),
      ljs.vec2(1.5, 0.45),
      undefined,
      0,
      ljs.WHITE,
      Infinity,
    );
    this.text = text;
    this.shown = true;
    this.pressedState = "unPressed";
    this.canBeShown = true;
    this.dissapearOnPress = dissapearOnPress;
    this.deleteOnPress = deleteOnPress;
  }
  render() {
    if (this.shown && this.canBeShown) {
      this.color = ljs.WHITE;
      ljs.drawTile(
        this.pos.subtract(ljs.vec2(0.29, 0)),
        ljs.vec2(0.45, 0.45),
        gameTextures["proxPrompt" + this.pressedState],

        this.color,
      );
      ljs.drawTile(
        this.pos.add(ljs.vec2(0.4, 0)),
        ljs.vec2(0.95, 0.45),
        gameTextures["proxPromptText" + this.text],

        this.color,
      );
    } else {
      this.color = ljs.CLEAR_WHITE;
    }
  }
  update() {
    //press detection

    if (player.pos.distance(this.pos) <= 2.5) {
      this.shown = true;
      if (ljs.keyIsDown("KeyE")) {
        this.pressedState = "down";
      }
      if (ljs.keyWasReleased("KeyE")) {
        this.pressedState = "pressed";
        window.dispatchEvent(
          new CustomEvent("proxPromptPressed", { detail: this.text, x: this.pos.x, y: this.pos.y }),
        );
        setTimeout(() => {
        if(this.dissapearOnPress){
          this.canBeShown = false;
        }
        if(this.deleteOnPress){
          this.delete();
        }
      }, 50);
      }
    } else {
      this.shown = false;
      if(this.pressedState == "pressed" || this.pressedState == "down"){
        this.pressedState = "unPressed";
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
  new ProxPrompt(1, 0, "Interact");
  player = new PlayerClass();
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
