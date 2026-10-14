import { initializeEngine, metadataReady } from "./public/scripts/init.js";
import { texturesReady } from "./public/scripts/loadAllTextures.js";
import  * as ljs  from "littlejsengine";

metadataReady.then(() => {
texturesReady.then(() => {
    console.log("textures loaded event received");
    ljs.engineInit(initializeEngine);
});
});