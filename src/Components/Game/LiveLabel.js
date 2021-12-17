import Phaser from "phaser";

const formatLive = (live) => `Live: ${live}`;

export default class ScoreLabel extends Phaser.GameObjects.Text {
  constructor(scene, x, y, score, style) {
    super(scene, x, y, formatLive(score), style);
    console.log("inside class", this.text);
    this.live= live;
  }

  setLive(live) {
    this.live = live;
    this.updateLiveText();
  }

  add(points) {
    this.setLive(this.live + points);
  }

  remove(points){
      this.setLive(this.live - points);
  }

  updateLiveText() {
    this.setText(formatScore(this.live));
  }
  getScore(){
    return this.score;
  }

}
