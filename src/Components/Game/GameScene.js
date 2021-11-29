import Phaser from "phaser";
const PLAYER_KEY = "player";
const LASER_KEY = "laser";
const ENEMY_KEY = 'enemy';
import skyAsset from "../../assets/sky.png";
import playerAsset from "../../assets/star.png";
import laserAsset from "../../assets/bomb.png";
import enemyAsset from "../../assets/enemy.png";

import laserSpawner from "./LaserSpawner.js";
import enemySpawner from "./EnemySpawner.js";


class GameScene extends Phaser.Scene {
  constructor() {
    super("game-scene");
    this.player = undefined;
    this.cursors = undefined;
    this.laserSpawner = undefined;
    this.enemyAsset = undefined
    this.gameOver = false;
    this.bulletTime = 0;

  }

  preload() {
    this.load.image("sky", skyAsset);
    this.load.image(PLAYER_KEY,playerAsset);
    this.load.image(LASER_KEY,laserAsset);
    this.load.image(ENEMY_KEY,enemyAsset);
  }


  //Load player and background
  create(){

  
    this.add.sprite(400, 300, "sky");
    this.player = this.createPlayer();
    this.laserSpawner = new laserSpawner(this);
    this.enemySpawner = new enemySpawner(this);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.time.addEvent({
      delay : 200,
      callback: ()=>{
        this.spawn();
      },
      loop: true
    })

  
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
    if(this.cursors.space.isDown){
        this.shootLaser();
    } 
    
  }

  //Create and add player sprite
  createPlayer() {
    const player = this.physics.add.sprite(100,450,PLAYER_KEY);
    //world collision
    player.body.collideWorldBounds=true;
    return player;
  }

  shootLaser(){
    if(this.time.now > this.bulletTime){
      this.laserSpawner.fireLaser(this.player.x, this.player.y-20);
      this.bulletTime = this.time.now + 200;
    }
  }

  spawn(){
    var posX = Phaser.Math.Between(10,790);
    this.enemySpawner.spawnEnemy(posX, 0);
  }

}

export default GameScene;
