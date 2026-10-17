import { gameTextures } from "./loadAllTextures.js";
import { player } from "./init.js";
import * as ljs from "littlejsengine";


export class ProxPrompt extends ljs.EngineObject {
  constructor(x, y, text, dissapearOnPress = true, deleteOnPress = false) {
    super(
      ljs.vec2(x, y),
      ljs.vec2(1.5, 0.45),
      undefined,
      0,
      ljs.WHITE,
      Infinity,
    );
    this.text = text;
    this.shown = true;
    this.pressedState = "unPressed";
    this.canBeShown = true;
    this.dissapearOnPress = dissapearOnPress;
    this.deleteOnPress = deleteOnPress;
  }
  render() {
    if (this.shown && this.canBeShown) {
      this.color = ljs.WHITE;
      ljs.drawTile(
        this.pos.subtract(ljs.vec2(0.6, 0)),
        ljs.vec2(0.45, 0.45),
        gameTextures["proxPrompt" + this.pressedState],

        this.color,
      );
      ljs.drawTile(
        this.pos.add(ljs.vec2(0.2, 0)),
        ljs.vec2(1.2, 0.45),
        gameTextures["proxPromptText" + this.text],

        this.color,
      );
    } else {
      this.color = ljs.CLEAR_WHITE;
    }
  }
  update() {
    //press detection

    if (player.pos.distance(this.pos) <= 2.5) {
      this.shown = true;
      if (ljs.keyIsDown("KeyE")) {
        this.pressedState = "down";
      }
      if (ljs.keyWasReleased("KeyE")) {
        this.pressedState = "pressed";
        window.dispatchEvent(
          new CustomEvent("proxPromptPressed", { detail: this.text, x: this.pos.x, y: this.pos.y }),
        );
        setTimeout(() => {
        if(this.dissapearOnPress){
          this.canBeShown = false;
        }
        if(this.deleteOnPress){
          this.delete();
        }
      }, 50);
      }
    } else {
      this.shown = false;
      if(this.pressedState == "pressed" || this.pressedState == "down"){
        this.pressedState = "unPressed";
      }
    }
  }
  delete() {
    super.delete();
  }
}
