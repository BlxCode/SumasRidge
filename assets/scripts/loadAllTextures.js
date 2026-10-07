import * as ljs from "littlejsengine";
let tileInfoCoords = null;

 function getTileInfoCoords() {
    if(!tileInfoCoords){



  fetch("assets/scripts/tileInfoCoords.json")
  .then((response)=>{
     return response.text();
      })
  .then((data)=>{
    console.log(data)
    if(data != undefined && data){
    tileInfoCoords = JSON.parse(data);
    }
  })


    }
}
let tileInfos = {};
getTileInfoCoords()
let gameTextures = {};
let loadGameTextures = {}
export { gameTextures, loadGameTextures };
