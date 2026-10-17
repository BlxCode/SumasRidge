import { gameData } from "./database.js";
import * as ljs from "littlejsengine";
function gameUpdate() {
  // scrolling
  if (ljs.mouseWheel != 0) {
    if(ljs.cameraScale + (-ljs.mouseWheel * 2) > 50 && ljs.cameraScale + (-ljs.mouseWheel * 2) < 150){
      ljs.setCameraScale((-ljs.mouseWheel * 2) + ljs.cameraScale);
      gameData.player.cameraScale = ljs.cameraScale;
    }
  }
}
export { gameUpdate };
