import Phaser from "phaser";

import skyAsset from "../../assets/sky.png";
import buttonSoundAsset from "../../assets/buttonSound.mp3";


class OptionsScene extends Phaser.Scene {
    constructor(){
        super("options-scene")
    }

    preload(){
        this.load.image("sky", skyAsset);
        this.load.audio("buttonSound", buttonSoundAsset);
    }
    
    create(){
        this.buttonSound = this.sound.add('buttonSound');

        this.add
        .image(-140, 0, "sky")
        .setOrigin(0)
        .setDepth(0);

        var ReturnText = this.add.text(12,12, 'RETURN TO THE GAME');
        ReturnText.setInteractive({ useHandCursor: true });
        ReturnText.on('pointerdown', () => this.clickButtonReturn());

        this.add.text(230, 180, 'Game Paused', {font: '56px Arial', fill: 'white'});
        var text = this.add.text(290, 380, ' Main Menu ', {font: '44px Arial', fill: 'white'});
        text.setInteractive({ useHandCursor: true });
        text.on('pointerdown', () => this.clickMainMenuButton());
    }

    update(){

    }

clickButtonReturn(){
    this.buttonSound.play();
    this.scene.stop();
    this.scene.run('game-scene');
}

clickMainMenuButton(){
    this.buttonSound.play();
    this.scene.stop('game-scene');
    this.scene.start('menu-scene');
}

}
export default OptionsScene;