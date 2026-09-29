"use strict";

const defaultDBInfo = {
    player: {money: 100, xp:0},
    inventory: {0: {name: "woodenScythe", enchantTier: 0}, 1: {name: "woodenHoe", enchantTier: 0}, 2: {name: "bucket", enchantTier: 0}, 3: {name: "none", enchantTier: 0}, 4: {name: "none", enchantTier: 0}, 5: {name: "none", enchantTier: 0}, 6: {name: "none", enchantTier: 0}, 7: {name: "none", enchantTier: 0}, 8: {name: "none", enchantTier: 0}, 9: {name: "none", enchantTier: 0}, 10: {name: "none", enchantTier: 0}, 11: {name: "none", enchantTier: 0}, 12: {name: "none", enchantTier: 0}, 13: {name: "none", enchantTier: 0}, 14: {name: "none", enchantTier: 0}, 15: {name: "none", enchantTier: 0}, 16: {name: "none", enchantTier: 0}, 17: {name: "none", enchantTier: 0}, 18: {name: "none", enchantTier: 0}, 19: {name: "none", enchantTier: 0}, 20: {name: "none", enchantTier: 0}, 21: {name: "none", enchantTier: 0}, 22: {name: "none", enchantTier: 0}, 23: {name: "none", enchantTier: 0}, 24: {name: "none", enchantTier: 0}, 25: {name: "none", enchantTier: 0}, 26: {name: "none", enchantTier: 0}, 27: {name: "none", enchantTier: 0}, 28: {name: "none", enchantTier: 0}, 29: {name: "none", enchantTier: 0}},
    crops: {},
    mapChanges: {}
}

if(localStorage.getItem("player") === null) {
localStorage.setItem("player", JSON.stringify(defaultDBInfo.player));
localStorage.setItem("inventory", JSON.stringify(defaultDBInfo.inventory));
localStorage.setItem("crops", JSON.stringify(defaultDBInfo.crops));
localStorage.setItem("mapChanges", JSON.stringify(defaultDBInfo.mapChanges));

}




    let gameData = {
        player: JSON.parse(localStorage.getItem("player")),
        inventory: JSON.parse(localStorage.getItem("inventory")),
        crops: JSON.parse(localStorage.getItem("crops")),
        mapChanges: JSON.parse(localStorage.getItem("mapChanges"))
    };



    window.addEventListener("beforeunload", () =>  {
        localStorage.setItem("player", JSON.stringify(gameData.player));
        localStorage.setItem("inventory", JSON.stringify(gameData.inventory));
        localStorage.setItem("crops", JSON.stringify(gameData.crops));
        localStorage.setItem("mapChanges", JSON.stringify(gameData.mapChanges));
    });
export { gameData };