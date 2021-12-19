import Phaser from "phaser";


export default class BossSpawner {
  /**
   * @param {Phaser.Scene} scene
   */
  constructor(scene, bossKey = "boss", hp) {
    this.scene = scene;
    this.hp = hp;
    this.key = bossKey;

    this._group = this.scene.physics.add.group();
  }

  get group() {
    return this._group;
  }

  spawn(x,y) {
    const boss = this.group.create(x,y,this.key);

    return boss; 
  }

  decreaseHealth(dmg){
    this.hp = this.hp-dmg;
  }
  getHealth(){
      return this.hp;
  }
  setHealth(hp){
    this.hp = hp;
  }

  preUpdate(time, delta){
    super.preUpdate(time, delta);
    if(this.y >= 600){
        this.setActive(false);
        this.setVisible(false);
    }
}
}
