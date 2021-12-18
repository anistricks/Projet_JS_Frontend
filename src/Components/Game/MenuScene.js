import Phaser from "phaser";

import skyAsset from "../../assets/title_bg.jpg";
import playButtonAsset from "../../assets/play_button.png";
import optionsButtonAsset from "../../assets/options_button.png";
import musicAsset from "../../assets/music.mp3";
import buttonSoundAsset from "../../assets/buttonSound.mp3";



var musicON = true; 
var optionsButton;
var playButton;

class MenuScene extends Phaser.Scene {
    constructor() {
        super("menu-scene");
      }
      //on charge les images
      preload() {
        this.load.audio('musicLoop', musicAsset);
        this.load.audio('buttonSound', buttonSoundAsset);
        this.load.image("sky", skyAsset);
        
        this.load.image("playButton", playButtonAsset);
        this.load.image("optionsButton", optionsButtonAsset);
        
      }
    
      create() {
/*
        this.optionsScene = this.scene.add('options-scene', OptionsScene);
        this.gameScene = this.scene.add('game-scene', GameScene);*/

        this.musicToLoop = this.sound.add('musicLoop');
        var musicConfig = {
          mute: false ,
          volume: 0.05,
          rate: 1,
          detune: 0,
          seek: 0,
          loop: true,
          delay: 0
        }

        this.musicToLoop.play(musicConfig); 
        if(!musicON){
          this.musicToLoop.pause(); 
        }
        
        this.buttonSound = this.sound.add('buttonSound')

       // on place les éléments de fond
        this.add
          .image(-140, 0, "sky")
          .setOrigin(0)
          .setDepth(0);
      

        //on ajoute un bouton de clic, nommé bouton_play
         playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, "playButton").setDepth(1);
         playButton.setInteractive({ useHandCursor: true });
         playButton.on('pointerdown', () => this.clickButtonPlay());
         

        //=========================================================
        //on ajoute un bouton music
        if(musicON){
          optionsButton = this.add.text(this.game.renderer.width / 2 - 70, this.game.renderer.height / 2 + 80, "Music ON", {fontSize: '50px', fontFamily: 'Quicksand', fill: 'white'}).setDepth(1);
        }else{
          optionsButton = this.add.text(this.game.renderer.width / 2 - 70, this.game.renderer.height / 2 + 80, "Music OFF", {fontSize: '50px', fontFamily: 'Quicksand', fill: 'white'}).setDepth(1);
        }
         
         optionsButton.setFontSize(30);
         optionsButton.setInteractive({ useHandCursor: true });
         optionsButton.on('pointerdown', () => this.clickButtonMusic());
        
      }

      update(){
      }

      clickButtonPlay() {
        this.buttonSound.play();
        this.musicToLoop.stop();
        this.scene.start('game-scene');
        this.scene.stop();
        
    }

    clickButtonMusic(){
      this.buttonSound.play();
      if(musicON) {
        this.musicToLoop.pause();
        musicON = false;
        optionsButton.setText('Music OFF');
        
        
      }else{
        this.musicToLoop.resume();
        optionsButton.setText("Music ON");
        musicON = true;
      }  
    }

    


    



    
}

export default MenuScene;