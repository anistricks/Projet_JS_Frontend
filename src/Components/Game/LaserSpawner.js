import Phaser, { Time } from "phaser";



class Laser extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x,y){
        super(scene,x,y, 'laser');
    }
    
    //fire laser
    fire(x,y){
        this.body.reset(x,y);
        this.setActive(true);
        this.setVisible(true);
        this.setVelocityY(-600);  
    }

   
    //delete laser instance when they went out of the scene
    preUpdate(time, delta){
        super.preUpdate(time, delta);
        if (this.y <=0){
            this.setActive(false);
            this.setVisible(false);

        }
    }
}

//create laser
export default class LaserSpawner extends Phaser.Physics.Arcade.Group {
     /**
   * @param {Phaser.Scene} scene
   */
    constructor(scene){
        super(scene.physics.world,scene);
    
    
    this.createMultiple({
            classType: Laser,
            frameQuantity: 30,
            active: false,
            visible: false,
            key: 'laser'  

        })
    
    }
    fireLaser(x, y){
        const laser = this.getFirstDead(false);
        if(laser){
            laser.fire(x,y);
        }
    }


}
