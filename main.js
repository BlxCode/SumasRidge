import { initializeEngine } from "./assets/scripts/init.js";
import { texturesReady } from "./assets/scripts/loadAllTextures.js";

import  * as ljs  from "littlejsengine";


texturesReady.then(() => {
    console.log("textures loaded event received");
    ljs.engineInit(initializeEngine);
});
