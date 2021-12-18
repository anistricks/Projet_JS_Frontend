import Phaser from "phaser";
import GameScene from "../Game/GameScene.js";
import OptionsScene from "../Game/OptionsScene.js";
import MenuScene from "../Game/MenuScene.js";
import EndScene from "../Game/EndScene.js";
var game;

const GamePage = () => {
  let phaserGame = `
<div id="gameDiv" class="d-flex justify-content-center my-3">
</div>`;

  let page = document.querySelector("#page");
  page.innerHTML = phaserGame;

  let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: "arcade",
      arcade: {
        debug: false,
      },
    },
    //scene: [GameScene],
    //  parent DOM element into which the canvas created by the renderer will be injected.
    parent: "gameDiv",
  };

  // there could be issues when a game was quit (events no longer working)
  // therefore destroy any started game prior to recreate it
  if (game) game.destroy(true);
  game = new Phaser.Game(config);

  game.scene.add('menu-scene', MenuScene);
  game.scene.add('options-scene', OptionsScene);
  game.scene.add('game-scene', GameScene);
  game.scene.add('end-scene', EndScene);
  game.scene.start('menu-scene');

};

export default GamePage;
