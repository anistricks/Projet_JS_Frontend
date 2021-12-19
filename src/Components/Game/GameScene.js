import Phaser from "phaser";
const PLAYER_KEY = "player";
const LASER_KEY = "laser";
const ENEMY_KEY = 'enemy';
const ENEMY_LASER_KEY = 'enemy_laser';
const BOSS_KEY = 'boss';

import skyAsset from "../../assets/sky.png";
import playerAsset from "../../assets/plane4.png";
import laserAsset from "../../assets/laser3.png";
import enemyAsset from "../../assets/enemy.png";
import enemyLaserAsset from "../../assets/bomb.png";
import laserSound from "../../assets/Sounds/Laser.mp3";
import explosionSound from "../../assets/Sounds/Explosion.mp3";
import explosionAsset  from "../../assets/explosion.png"
import bossAsset from "../../assets/boss.png";


import ScoreLabel from "./ScoreLabel.js";
import LaserSpawner from "./LaserSpawner.js";
import EnemySpawner from "./EnemySpawner";
import LiveLabel from "./LiveLabel.js";
import BossSpawner from "./BossSpawner.js";

import musicAsset from "../../assets/music.mp3";
import pauseButtonAsset from "../../assets/buttonPause.png";
import buttonSoundAsset from "../../assets/buttonSound.mp3";

import { getSessionObject, setSessionObject } from "../../utils/session";



class GameScene extends Phaser.Scene {
  constructor() {
    super("game-scene");
    this.player = undefined;
    this.cursors = undefined;
    this.laserSpawner = undefined;
    this.enemyAsset = undefined
    this.gameOver = false;
    this.bulletTime = 0;
    this.enemyBulletTime=0;
    this.bossBulletTime = 0;
    this.enemyLaser = undefined;
    this.scoreLabel = undefined;
    this.liveLabel = undefined;
    this.spawner = undefined;
    this.laserSound = undefined;
    this.explosionSound = undefined;
    this.boss = undefined;
    this.roundBoss = false;
    this.playerPosX = undefined;
    this.playerPosY = undefined;
    this.bossEnterScene = 100; 
    this.bossEvent = undefined;
    this.bossAttack = undefined;


  }

  preload() {
    this.load.image("sky", skyAsset);
    this.load.image(PLAYER_KEY,playerAsset);
    this.load.image(LASER_KEY,laserAsset);
    this.load.image(ENEMY_KEY,enemyAsset);
    this.load.image(ENEMY_LASER_KEY,enemyLaserAsset);
    this.load.image(BOSS_KEY,bossAsset);

    this.load.image('explosion', explosionAsset);
    this.load.audio('laserSound',laserSound);
    this.load.audio('explosionSound', explosionSound);

    this.load.audio('buttonSound', buttonSoundAsset);
    this.load.image('pauseButton', pauseButtonAsset);
  }


  //Load player and background
  create(){

    console.log(this.roundBoss);
    this.add.sprite(400, 300, "sky");
    this.player = this.createPlayer();

    this.laserSpawner = new LaserSpawner(this,LASER_KEY);
    this.laserSound = this.sound.add('laserSound');
    this.enemySpawner = new EnemySpawner(this,ENEMY_KEY);
    this.explosionSound = this.sound.add('explosionSound');
    this.enemyLaser = new LaserSpawner(this,ENEMY_LASER_KEY);

    this.scoreLabel = this.createScoreLabel(16,16,0);
    this.liveLabel = this.createLiveLabel(600,550,3);

    const laserGroup = this.laserSpawner.group;
    const enemyGroup = this.enemySpawner.group;
    const enemyLaser = this.enemyLaser.group;

    this.cursors = this.input.keyboard.createCursorKeys();
   
    this.boss = new BossSpawner(this,BOSS_KEY,100);
    const motherShip = this.boss.group;
    this.physics.add.overlap(laserGroup,motherShip,this.bossHit,null,this);
    


    this.spawner = this.time.addEvent({
      delay : 500,
      callback: ()=>{
        const enemy = this.enemySpawner.spawn(Phaser.Math.Between(10,790),0, ENEMY_KEY);
        this.enemyShoot(enemy,this.playerPosX,this.playerPosY);
       },
      loop: true
    });
    
    this.bossAttack = this.time.addEvent({
      delay: 500,
      callback: ()=>{
        this.bossShoot(370,100,this.playerPosX,this.playerPosY);
      },  
      loop: true
    });
  
  
    this.physics.add.overlap(laserGroup, enemyGroup,this.collisionHandler, null, this);
    this.physics.add.overlap(this.player, enemyGroup,this.playerHit, null, this);
    this.physics.add.overlap(this.player,enemyLaser,this.playerHit,null,this);
    
    var ReturnText = this.add.image(750,30, 'pauseButton');
        ReturnText.setInteractive({ useHandCursor: true });
        ReturnText.on('pointerdown', () => this.clickPauseButton());
    
    this.buttonSound = this.sound.add('buttonSound');
  
  }


  //Move player up, down , left, right
  update() {
  
    this.playerPosX = this.player.x;
    this.playerPosY = this.player.y;
    if (this.gameOver) {
      /*
      this.player.destroy();
      this.spawner.remove(false);*/
      var score = this.scoreLabel.getScore();
<<<<<<< HEAD
      console.log(score);
     
     // this.Sethighscore();
      this.scene.stop;
      this.scene.start('end-scene', {score: score});
      this.gameOver = false;
      this.bossEnterScene = 100;
      this.roundBoss = false;
      this.scoreLabel.setScore(0);
      //return;
    }
    if(this.scoreLabel.getScore()>this.bossEnterScene){
      this.roundBoss = true;
      this.bossEnterScene = this.bossEnterScene+150;
    }
    if(!this.roundBoss){
      this.spawner.paused = false;
      this.bossEvent = this.time.addEvent({
        delay:500,
      callback: ()=>{
        const boss = this.enterScene();
      },
    });
    this.bossAttack.paused = true;
    this.bossEvent.paused = true;
    }

    if(this.roundBoss){
      this.spawner.paused = true;
      this.bossEvent.paused = false;
      this.bossAttack.paused = false;
    }
    this.velocityPlayer();

  }

  Sethighscore(){
    let user = getSessionObject('user');
    if(user){
      if(this.score > user.highscore){
        changerHighscore(this.score);
      }
    }
  }

  changerHighscore(score){
    try{
      const options = {
        method: "PUT", 
        body: JSON.stringify({
          highscore: score,
        }), 
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = fetch(`/api/auths/user/${user.username}`, options); // fetch return a promise => we wait for the response
      if(!response.ok){
        throw new Error(
          "fetch error : " + response.status + " : " + response.statusText
        );
      }
    }catch(error){
      console.error("error : ", error);
    
}
    user.highscore = score;
    console.log("user after update : ", user);
  }


  velocityPlayer(){
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



  clickPauseButton(){
    this.buttonSound.play();
    /*
    this.cursors.left.reset();
    this.cursors.right.reset();
    this.cursors.up.reset();
    this.cursors.down.reset();*/
    this.scene.pause();
    this.scene.switch('options-scene');
    //this.scene.launch('options-scene');
    
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
    this.scoreLabel.add(10);
    this.explosionSound.play();
  }

  //boss enter scene
  enterScene(){
    
    const anim = this.tweens.add({
      targets:this.boss.spawn(355,0),
      x:370,
      y:100,
      ease:'Sine.easeInOut',
      duration:2000
    });  
    
    return anim;
  }

  //Detect if player get hit by enemy
  playerHit(player,enemy){
    const explosion = this.createExplosion(enemy.x,enemy.y);
    this.time.addEvent({
      delay:100,
      callback: ()=>{
        this.destroyExplosion(explosion);
      }
    });
    this.liveLabel.remove(1);
    enemy.destroy();
    this.explosionSound.play();
    if(this.liveLabel.get()==0){
      this.gameOver = true;
      const explosion = this.createExplosion(player.x,player.y);
      this.time.addEvent({
        delay:100,
        callback: ()=>{
          this.destroyExplosion(explosion);
        }
      });
      
    }
  }


  //Create and add player sprite
  createPlayer() {
    const player = this.physics.add.sprite(355,450,PLAYER_KEY);
    //world collision
    player.body.collideWorldBounds=true;
    return player;
  }

  //player shoot
  shootLaser(){
  
    if(this.time.now > this.bulletTime){
      this.laserSpawner.shoot(this.player.x, this.player.y-50,-600);
      this.laserSound.play();
      this.bulletTime = this.time.now + 250;
    }
  

  }
  


  //enemy shoot
  enemyShoot(enemy,x,y){
    if(this.time.now > this.enemyBulletTime){
      let distance = Math.sqrt((x-enemy.x)**2+(y-enemy.y)**2);
      let laserSpeedX = (x-enemy.x) * 400/distance;
      let laserSpeedY = (y-enemy.y) * 400/distance;
      this.enemyLaser.enemyShoot(laserSpeedX,laserSpeedY,enemy.x,enemy.y);
      this.enemyBulletTime = this.time.now + 1500;
    }
  }

  bossShoot(x,y,posX,posY){
    if(this.time.now > this.bossBulletTime){
      let distance = Math.sqrt((posX-x)**2+(posY-y)**2);
      let laserSpeedX = (posX-x) * 450/distance;
      let laserSpeedY = (posY-y) * 450/distance;
      this.enemyLaser.enemyShoot(laserSpeedX,laserSpeedY,x,y);
      this.enemyBulletTime = this.time.now + 1000;
    }
  }

  //Detect if the boss hit by laser
  bossHit(laser,boss){
    laser.destroy();
    const explosion = this.createExplosion(laser.x,laser.y);
    this.time.addEvent({
      delay:100,
      callback: ()=>{
        this.destroyExplosion(explosion);
      }
    });
    this.explosionSound.play();
    this.boss.decreaseHealth(10);
    if(this.boss.getHealth()==0){
      console.log(1);
      boss.destroy();
      this.boss.setHealth(100);
      this.roundBoss = false;
      this.scoreLabel.add(50);
    }
  

  }
  

  //Score
  createScoreLabel(x, y, score) {
    const style = { fontSize: "32px", fill: "#FFFFFF" };
    const label = new ScoreLabel(this, x, y, score, style);
    console.log("score:", label);
    this.add.existing(label);

    return label;
  }

  //Lives
  createLiveLabel(x, y, live) {
    const style = { fontSize: "32px", fill: "#FFFFFF" };
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
