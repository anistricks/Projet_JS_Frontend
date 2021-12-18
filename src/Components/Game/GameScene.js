import Phaser from "phaser";
const PLAYER_KEY = "player";
const LASER_KEY = "laser";
const ENEMY_KEY = 'enemy';

import skyAsset from "../../assets/sky.png";
import playerAsset from "../../assets/plane4.png";
import laserAsset from "../../assets/laser3.png";
import enemyAsset from "../../assets/enemy.png";
import laserSound from "../../assets/Sounds/Laser.mp3";
import explosionSound from "../../assets/Sounds/Explosion.mp3";
import explosionAsset  from "../../assets/explosion.png"


import ScoreLabel from "./ScoreLabel.js";
import LaserSpawner from "./LaserSpawner.js";
import EnemySpawner from "./EnemySpawner";
import LiveLabel from "./LiveLabel.js";
import BossSpawner from "./BossSpawner.js";


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
    this.spawner = undefined;
    this.laserSound = undefined;
    this.explosionSound = undefined;
    this.boss = undefined;
    this.roundBoss = false;

  }

  preload() {
    this.load.image("sky", skyAsset);
    this.load.image(PLAYER_KEY,playerAsset);
    this.load.image(LASER_KEY,laserAsset);
    this.load.image(ENEMY_KEY,enemyAsset);
    this.load.image('explosion', explosionAsset);
    this.load.audio('laserSound',laserSound);
    this.load.audio('explosionSound', explosionSound);
  }


  //Load player and background
  create(){

 
    this.add.sprite(400, 300, "sky");
    this.player = this.createPlayer();

    this.laserSpawner = new LaserSpawner(this,LASER_KEY);
    this.laserSound = this.sound.add('laserSound');
    this.enemySpawner = new EnemySpawner(this,ENEMY_KEY);
    this.explosionSound = this.sound.add('explosionSound');

    this.scoreLabel = this.createScoreLabel(16,16,0);
    this.liveLabel = this.createLiveLabel(600,550,3);

    const laserGroup = this.laserSpawner.group;
    const enemyGroup = this.enemySpawner.group;
    this.cursors = this.input.keyboard.createCursorKeys();
   /*
    this.boss = new BossSpawner(this,'boss',100);
    const bossSpawn = this.test.group;
    this.boss.spawn(500,100);
    this.physics.add.overlap(laserGroup,bossSpawn,this.bossHit,null,this);
    */

    this.physics.add.overlap(laserGroup, enemyGroup,this.collisionHandler, null, this);
    this.physics.add.overlap(this.player, enemyGroup,this.playerHit, null, this);

    
    
    this.spawner = this.time.addEvent({
      delay : 300,
      callback: ()=>{
        this.enemySpawner.spawn(Phaser.Math.Between(10,790),0, ENEMY_KEY);
      },
      loop: true
    });
    
  
  }


  //Move player up, down , left, right
  update() {
    

    if (this.gameOver) {
      this.player.destroy();
      this.spawner.remove(false);
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
    const explosion = this.createExplosion(enemy.x,enemy.y);
    this.time.addEvent({
      delay:100,
      callback: ()=>{
        this.destroyExplosion(explosion);
      }
    });
    enemy.destroy();
    laser.destroy();
    this.scoreLabel.add(1);
    this.explosionSound.play();
  }

  //Detect if player get hit by enemy
  playerHit(player,enemy){
    this.liveLabel.remove(1);
    enemy.destroy();
    if(this.liveLabel.get()==0){
      this.gameOver = true;
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
      this.laserSpawner.shoot(this.player.x, this.player.y-50);
      this.laserSound.play();
      this.bulletTime = this.time.now + 250;
    }
  

  }

  //Detect if the boss hit by laser
  bossHit(laser,boss){
    laser.destroy();
    this.test.decreaseHealth(10);
    if(this.test.getHealth()==0){
      boss.destroy();
      console.log(1);
    }
  

  }
  

  //Score
  createScoreLabel(x, y, score) {
    const style = { fontSize: "32px", fill: "#000" };
    const label = new ScoreLabel(this, x, y, score, style);
    console.log("score:", label);
    this.add.existing(label);

    return label;
  }

  //Lives
  createLiveLabel(x, y, live) {
    const style = { fontSize: "32px", fill: "#000" };
    const label = new LiveLabel(this, x, y, live, style);
    console.log("score:", label);
    this.add.existing(label);

    return label;
  }
  
  //create explosion
  createExplosion(x,y){
    const explosion = this.add.sprite(x,y,'explosion');
    return explosion;
  }
  
  //destroy explosion sprite
  destroyExplosion(explosion){
    explosion.destroy();
  }

}

export default GameScene;
