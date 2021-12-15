import Phaser from "phaser";

export default class EnemySpawner {
  /**
   * @param {Phaser.Scene} scene
   */
  constructor(scene, enemyKey = "enemy") {
    this.scene = scene;
    this.key = enemyKey;

    this._group = this.scene.physics.add.group();
  }

  get group() {
    return this._group;
  }

  spawn(x,y) {
    const enemy = this.group.create(x,y,this.key);
    enemy.setVelocityY(300);
    
    return enemy; 
  }
  preUpdate(time, delta){
    super.preUpdate(time, delta);
    if(this.y >= 600){
        this.setActive(false);
        this.setVisible(false);
    }
}
}
