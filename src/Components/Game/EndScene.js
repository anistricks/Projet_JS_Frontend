import Phaser from "phaser";

import skyAsset from "../../assets/sky.png";
import buttonSoundAsset from "../../assets/buttonSound.mp3";


//A remplacer par le score enregistré 

var score;

class EndScene extends Phaser.Scene {
    constructor(){
        super("end-scene")
    }

    init(data){
        score = data.score;
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

        var ReplayText = this.add.text(12,12, 'RESTART A GAME');
        ReplayText.setInteractive({ useHandCursor: true });
        ReplayText.on('pointerdown', () => this.clickReplayButton());

        this.add.text(230, 180, 'Score : ' + score, {font: '56px Arial', fill: 'white'});

        var text = this.add.text(290, 380, ' Main Menu ', {font: '44px Arial', fill: 'white'});
        text.setInteractive({ useHandCursor: true });
        text.on('pointerdown', () => this.clickMainMenuButton());
    }

    update(){

    }
clickReplayButton(){
    this.buttonSound.play();
    this.scene.stop();
    this.scene.start('game-scene');
    
}

clickMainMenuButton(){
    this.buttonSound.play();
    this.scene.stop('game-scene');
    this.scene.start('menu-scene');
}

}
export default EndScene;