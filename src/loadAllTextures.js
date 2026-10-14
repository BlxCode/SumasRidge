import * as ljs from "littlejsengine";
let tileInfoCoords = null;
let gameTextures = {};
let textureInfos = {};

async function getTileInfoCoords() {
  if (!tileInfoCoords) {
    await fetch("/src/tileInfoCoords.json")
      .then((response) => {
        return response.text();
      })
      .then(async (data) => {
        if (data != undefined && data) {
          tileInfoCoords = JSON.parse(data);

          await Promise.all(
            tileInfoCoords.metaData.imageList.map((imageName) => {
              return new Promise((resolve, reject) => {
                let img = new Image();

                img.addEventListener("load", () => {
                  textureInfos[imageName] = new ljs.TextureInfo(img);
                  resolve();
                });

                img.addEventListener("error", reject);

                img.src = `/art/${imageName}.png`;
              });
            }),
          );

          // at this point ALL images have loaded
          await Promise.all(
            Object.values(tileInfoCoords.textures).map((textureInfo) => {
              return new Promise((resolve, reject) => {
                let textureName = textureInfo.name;
                let imageName = textureInfo.img;

                let x = textureInfo.x;
                let y = textureInfo.y;
                let width = textureInfo.sX;
                let height = textureInfo.sY;

                if (textureInfos[imageName]) {
                  gameTextures[textureName] = new ljs.TileInfo(
                    ljs.vec2(x, y),
                    ljs.vec2(width, height),
                    textureInfos[imageName],
                    0,
                    0.05,
                  );
                }
                resolve();
              });
            }),
          );

          return tileInfoCoords;
        }
      });
  }
}
let tileInfos = {};
async function loadAllTextures() {
  await getTileInfoCoords();
}
let loadGameTextures = {};

export { gameTextures };
export const texturesReady = loadAllTextures();
