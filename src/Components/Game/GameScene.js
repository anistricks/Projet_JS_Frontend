import Phaser from "phaser";
const PLAYER_KEY = "dude";
import skyAsset from "../../assets/sky.png";
import playerAsset from "../../assets/star.png";


class GameScene extends Phaser.Scene {
  constructor() {
    super("game-scene");
    this.player = undefined;
    this.cursors = undefined;
    this.gameOver = false;
  }
  preload() {
    this.load.image("sky", skyAsset);
    this.load.image(PLAYER_KEY,playerAsset);
  }


  //Load player and background
  create(){
    this.add.sprite(400, 300, "sky");
    this.player = this.createPlayer();
    this.cursors = this.input.keyboard.createCursorKeys();

  
  }


  //Move player up, down , left, right
  update() {
    if (this.gameOver) {
      return;
    }
    this.player.body.velocity.setTo(0,0);

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
    } else if(this.cursors.up.isDown){
      this.player.setVelocityY(-160);
    }
      else if(this.cursors.down.isDown){
      this.player.setVelocityY(160);
    }
  }

  //Create and add player sprite
  createPlayer() {
    const player = this.physics.add.sprite(100,450,PLAYER_KEY);
    return player;
  }


  


}

export default GameScene;
