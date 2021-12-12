import Phaser from "phaser";
const PLAYER_KEY = "player";
const LASER_KEY = "laser";
const ENEMY_KEY = 'enemy';
import ScoreLabel from "./ScoreLabel.js";
import skyAsset from "../../assets/sky.png";
import playerAsset from "../../assets/plane.png";
import laserAsset from "../../assets/laser2.png";
import enemyAsset from "../../assets/enemy.png";
import laserSpawner from "./LaserSpawner.js";
import enemySpawner from "./EnemySpawner.js";
import EnemySpawner from "./EnemySpawner.js";


class GameScene extends Phaser.Scene {
  constructor() {
    super("game-scene");
    this.player = undefined;
    this.cursors = undefined;
    this.laserSpawner = undefined;
    this.enemyAsset = undefined
    this.gameOver = false;
    this.scoreLabel = undefined;
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
    this.laserSpawner = this.createLaserGroup();
    this.enemySpawner = new EnemySpawner(this, ENEMY_KEY);
    this.scoreLabel = this.createScoreLabel(16,16,0);
  

    
    
    this.time.addEvent({
      delay : 300,
      callback: ()=>{
        this.spawn();
      },
      loop: true
    });
    
    this.cursors = this.input.keyboard.createCursorKeys();
    this.physics.add.overlap(this.laserSpawner.sprite,this.enemySpawner.sprite,this.collisionHandler, null, this);
  
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
    laser.setActive(false).setVisible(false);
    enemy.setActive(false).setVisible(false);
    if(!laser.active){
      console.log('1');
    }

  }

 
  //Create and add player sprite
  createPlayer() {
    const player = this.physics.add.sprite(100,450,PLAYER_KEY);
    //world collision
    player.body.collideWorldBounds=true;
    return player;
  }
  createLaserGroup(){
    const lasers = this.physics.add.group({
      key:LASER_KEY,
      frameQuantity:30,
      active:false,
      visible:false

    })
    return lasers;
  }

  shootLaser(){
    if(this.time.now > this.bulletTime){
      this.laserSpawner.fireLaser(this.player.x, this.player.y-20);
      this.bulletTime = this.time.now + 250;
    }
  }

  spawn(){
    var posX = Phaser.Math.Between(10,790);
    this.enemySpawner.spawnEnemy(posX, 0);
  }

  createScoreLabel(x, y, score) {
    const style = { fontSize: "32px", fill: "#000" };
    const label = new ScoreLabel(this, x, y, score, style);
    console.log("score:", label);
    this.add.existing(label);

    return label;
  }

}

export default GameScene;
