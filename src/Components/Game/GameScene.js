import Phaser from "phaser";
const PLAYER_KEY = "player";
const LASER_KEY = "laser";
const ENEMY_KEY = 'enemy';
import skyAsset from "../../assets/sky.png";
import playerAsset from "../../assets/plane4.png";
import laserAsset from "../../assets/laser3.png";
import enemyAsset from "../../assets/enemy.png";

import ScoreLabel from "./ScoreLabel.js";
import LaserSpawner from "./LaserSpawner.js";
import EnemySpawner from "./EnemySpawner";
import LiveLabel from "./LiveLabel.js";


class GameScene extends Phaser.Scene {
  constructor() {
    super("game-scene");
    this.player = undefined;
    this.cursors = undefined;
    this.laserSpawner = undefined;
    this.enemyAsset = undefined
    this.gameOver = false;
    this.bulletTime = 0;
    this.scoreLabel = undefined;
    this.liveLabel = undefined;

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
    this.laserSpawner = new LaserSpawner(this);
    this.enemySpawner = new EnemySpawner(this,ENEMY_KEY);
    this.scoreLabel = this.createScoreLabel(16,16,0);
    this.liveLabel = this.createLiveLabel(500,500,3);
    const enemyGroup = this.enemySpawner.group;
    this.cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.overlap(this.laserSpawner, enemyGroup,this.collisionHandler, null, this);
    

    this.time.addEvent({
      delay : 300,
      callback: ()=>{
        this.enemySpawner.spawn(Phaser.Math.Between(10,790),0, ENEMY_KEY);
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
    if (this.cursors.right.isDown) {
      this.player.setVelocityX(300);

    } 
    if(this.cursors.up.isDown){
      this.player.setVelocityY(-300);        
    }
    if(this.cursors.down.isDown){
      this.player.setVelocityY(300);
    }  
    // Diagonal movement
    // Up and left
    if (this.cursors.left.isDown && this.cursors.up.isDown){
      this.player.body.setVelocityX(-250);
      this.player.body.setVelocityY(-250);
    }

    // Up and right
    if (this.cursors.right.isDown && this.cursors.up.isDown){
      this.player.body.setVelocityX(250);
      this.player.body.setVelocityY(-250);
    }

    // Down and right
    if (this.cursors.right.isDown && this.cursors.down.isDown){
      this.player.body.setVelocityX(250);
      this.player.body.setVelocityY(250);
    }

    // Down and left
    if (this.cursors.left.isDown && this.cursors.down.isDown){
      this.player.body.setVelocityX(-250);
      this.player.body.setVelocityY(250);
    }
        
    if(this.cursors.space.isDown){
      this.shootLaser();
    } 
   

  }

  //Handle the collision between laser and enemy
  collisionHandler(laser,enemy){
      enemy.destroy();
      laser.setVisible(false);
      laser.setActive(false);
      this.ScoreLabel.add(1);
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
     
      this.bulletTime = this.time.now + 250;
    }
  }

  
  createScoreLabel(x, y, score) {
    const style = { fontSize: "32px", fill: "#000" };
    const label = new ScoreLabel(this, x, y, score, style);
    console.log("score:", label);
    this.add.existing(label);

    return label;
  }

  createLiveLabel(x, y, score) {
    const style = { fontSize: "32px", fill: "#000" };
    const label = new LiveLabel(this, x, y, score, style);
    console.log("score:", label);
    this.add.existing(label);

    return label;
  }
  
  

}

export default GameScene;
