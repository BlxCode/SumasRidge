import { initializeEngine, metadataReady } from "./init.js";
import { texturesReady } from "./loadAllTextures.js";
import  * as ljs  from "littlejsengine";

metadataReady.then(() => {
texturesReady.then(() => {
    console.log("textures loaded event received");
    ljs.engineInit(initializeEngine);
});
});