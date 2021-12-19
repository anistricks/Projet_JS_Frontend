import Phaser from "phaser";

export default class LaserSpawner {
  /**
   * @param {Phaser.Scene} scene
   */
  constructor(scene, laserKey = "laser") {
    this.scene = scene;
    this.key = laserKey;

    this._group = this.scene.physics.add.group();
  }

  get group() {
    return this._group;
  }

  shoot(x,y,vel) {
    const laser = this.group.create(x,y,this.key);
    laser.setVelocityY(vel);
    
    return laser; 
  }
  enemyShoot(x,y,posX,posY){
    const laser = this.group.create(posX,posY,this.key);
    laser.setVelocity(x,y);

    return laser;
  }
  preUpdate(time, delta){
    super.preUpdate(time, delta);
    if(this.y >= 600){
        this.setActive(false);
        this.setVisible(false);
     
    }
}
}
