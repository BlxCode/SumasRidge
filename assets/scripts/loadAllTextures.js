let gameTextureNames = [
    "cereal",
    "cerealSeeds",
    "cornStages",
    "terrain",
    "wheatStages",
];

function loadImage(textureName) {
    return new Promise((resolve, reject) => {
        let image = new Image();
        image.addEventListener("load", () => resolve(image), { once: true });
        image.addEventListener("error", reject, { once: true });
        image.src = `assets/images/${textureName}.png`;
    });
}

async function loadGameTextures() {
    let textureSheet = new TextureSheet();
    let gameTextures = {};

    for (let textureName of gameTextureNames) {
        let image = await loadImage(textureName);
        let imageSize = vec2(image.width, image.height);
        gameTextures[textureName] = textureSheet.tryAdd(imageSize);
    }

    return gameTextures;
}

export { loadGameTextures };