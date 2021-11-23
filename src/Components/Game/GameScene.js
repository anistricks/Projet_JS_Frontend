import Phaser from "phaser";
const PLAYER_KEY = "player";
const BULLET = "bullet";
import skyAsset from "../../assets/sky.png";
import playerAsset from "../../assets/star.png";
import bulletAsset from "../../assets/bomb.png";

class GameScene extends Phaser.Scene {
  constructor() {
    super("game-scene");
    this.player = undefined;
    this.cursors = undefined;
    this.gameOver = false;
    this.bullets = undefined;
  }
  preload() {
    this.load.image("sky", skyAsset);
    this.load.image(PLAYER_KEY,playerAsset);
    this.load.image(BULLET,bulletAsset);
  }


  //Load player and background
  create(){

    this.bullets = game.add.group();
    /*this.bullets.enableBody = true;
    this.bullets.createMultuple(30, BULLET);
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 1);
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('checkWorldBounds', true);*/
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
        this.player.setVelocityX(-300);
        
    } 
    else if (this.cursors.right.isDown) {
        this.player.setVelocityX(300);

    } else if(this.cursors.up.isDown){
        this.player.setVelocityY(-300);
           
    }
    else if(this.cursors.down.isDown){
        this.player.setVelocityY(300);
    }   
  }

  //Create and add player sprite
  createPlayer() {
    const player = this.physics.add.sprite(100,450,PLAYER_KEY);
    //world collision
    player.body.collideWorldBounds=true;
    return player;
  }


  


}

export default GameScene;
