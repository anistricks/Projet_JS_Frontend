class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y){
        super(scene,x,y,'enemy');
    }
    //spawn enemy at x,y
    spawn(x,y){
        this.body.reset(x,y);
        this.setActive(true);
        this.setVisible(true);
        this.setVelocityY(400);
    }

    //erase and reset enemy if they are out of the screen
    preUpdate(time, delta){
        super.preUpdate(time, delta);
        if(this.y >= 600){
            this.setActive(false);
            this.setVisible(false);
        }
    }
}

//class group enemy
export default class EnemySpawner extends Phaser.Physics.Arcade.Group{

    constructor(scene){
        super(scene.physics.world, scene);
        
        this.createMultiple({
            classType: Enemy,
            frameQuantity: 30,
            active: false,
            visible: false,
            enableBody: true,
            key: 'enemy'
        })
    }

    //spawn enemy at x,y
    spawnEnemy(x,y){
        const enemy = this.getFirstDead(false);
        if(enemy){
            enemy.spawn(x,y);
        } 
    }
}