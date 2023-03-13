const myCustomCanvas = document.createElement("canvas");

myCustomCanvas.id = "myCustomCanvas";
myCustomCanvas.style = " margin-left: 18%; margin-top: 5%"
// myCustomCanvas.className = 'container';

document.body.appendChild(myCustomCanvas);

// var myCustomContext = myCustomCanvas.getContext('2d');

const config = {
  type: Phaser.WEBGL,
  parent: "phaser-example",
  width: 970,
  height: 700,
  backgroundColor: 0xFFFFFF,
  canvas: document.getElementById("myCustomCanvas"),
  scene: {
    preload: preload,
    create: create,
  },
};

const game = new Phaser.Game(config);

let background;
let part1;
let part2;
let part3;
function preload() {
    this.load.image('bg', '../img/shoe1.png')
    this.load.image('part1', '../img/part1.png');
    this.load.image('part2', '../img/part2.png');
    this.load.image('part3', '../img/part3.png');
    this.load.image('part4', '../../img/part4.png');
}

function create() {
  // background
  this.background = this.add.image(0, 0, "bg");
  this.background.setOrigin(0, 0)
  this.background.scaleX = 0.45;
  this.background.scaleY = 0.45;
// part1
  this.part1 = this.add.image(477, 272, 'part1')
  this.part1.scaleX = 0.45;
  this.part1.scaleY = 0.45;
  console.log(this.part1);
  // part2
  this.part2 = this.add.image(477, 272, 'part2')
  this.part2.setTint(0xFFFFFF)
  this.part2.scaleX = 0.45;
  this.part2.scaleY = 0.45;
  // part3
  this.part3 = this.add.image(477, 272, 'part3')
  this.part3.setTint(0xFF0000)
  this.part3.scaleX = 0.45;
  this.part3.scaleY = 0.45;
}