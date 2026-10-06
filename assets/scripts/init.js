import { gameData } from "./databaseShit.js";
import { gameTextures } from "./loadAllTextures.js";
let player;
let terrainList = {};
function initializeEngine() {






  class Terrain extends EngineObject{
    
      constructor(type, x,y) {
super(vec2(x,y), vec2(1,1), gameTextures.terrain[type],0,WHITE,-1);



terrainList[`${x},${y}`] = this;


      }



}
}
export { initializeEngine };