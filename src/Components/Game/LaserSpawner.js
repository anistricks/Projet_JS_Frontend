class Laser extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene,x , y, 'laser');
    }
    fire(x,y){
        this.body.reset(x,y);
        this.setActive(true);
        this.setVisible(true);
        this.setVelocityY(-900);
    }

    preUpdate(time, delta){
        super.preUpdate(time, delta);
        if(this.y <=0){
            this.setActive(false);
            this.setVisible(false);
        }
    }
}

export default class LaserSpawner extends Phaser.Physics.Arcade.Group {

    constructor(scene){
        super(scene.physics.world, scene);
        this.createMultiple({
            classType: Laser,
            frameQuantity : 30,
            active : false,
            visible: false,
            key : 'laser'
        })
    }

    fireLaser(x,y){
        const laser = this.getFirstDead(false);
        if(laser){
            laser.fire(x,y);
        }
    }



}