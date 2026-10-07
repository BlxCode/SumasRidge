import { gameData } from "./database.js";
import { gameTextures } from "./loadAllTextures.js";
import  * as ljs  from "littlejsengine";
let player;
let terrainList = {};
function initializeEngine() {






  class Terrain extends ljs.EngineObject{
    
      constructor(type, x,y) {
super(vec2(x,y), vec2(1,1), gameTextures.terrain[type],0,WHITE,-1);



terrainList[`${x},${y}`] = this;


      }



}
}
export { initializeEngine };