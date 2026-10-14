import { initializeEngine, metadataReady } from "./src/init.js";
import { texturesReady } from "./src/loadAllTextures.js";
import  * as ljs  from "littlejsengine";

metadataReady.then(() => {
texturesReady.then(() => {
    console.log("textures loaded event received");
    ljs.engineInit(initializeEngine);
});
});