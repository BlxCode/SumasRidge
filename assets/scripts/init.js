import { gameData } from "./database.js";
import { gameTextures } from "./loadAllTextures.js";
import  * as ljs  from "littlejsengine";
let player;
let terrainList = {};
class Terrain extends ljs.EngineObject{
    
      constructor(type, x,y) {
super(ljs.vec2(x,y), ljs.vec2(1,1), gameTextures[type],0,ljs.WHITE,0);


terrainList[`${x},${y}`] = this;


      }



}
function initializeEngine() {


   new Terrain("terrainGrass", 0, 0);

    // top
    new Terrain("terrainGrassT", 0, -1);

    // upper-right → lower-right
    new Terrain("terrainGrassBHR", 1, -1);
    new Terrain("terrainGrassR", -1, 0);

    // bottom-right
    new Terrain("terrainGrassBHR", 1, 1);

    // bottom
    new Terrain("terrainGrassB", 0, 1);

    // bottom-left
    new Terrain("terrainGrassBHL", -1, 1);
    new Terrain("terrainGrassL", 1, 0);

ljs.setCameraScale(100);

}
export { initializeEngine, Terrain };