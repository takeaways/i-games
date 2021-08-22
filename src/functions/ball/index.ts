import Ball from "src/functions/ball/ball";
import Block from "src/functions/ball/block";

class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private container: HTMLDivElement;
  private stageWidth = 0;
  private stageHeight = 0;
  private ball: Ball;
  private block: Block;

  constructor() {
    this.container = document.querySelector("#ball")! as HTMLDivElement;
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d")!;

    this.container.append(this.canvas);
    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    this.ball = new Ball(this.stageWidth, this.stageHeight, 60, 16);
    this.block = new Block(700, 30, 300, 450);
    requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = this.container.clientWidth;
    this.stageHeight = this.container.clientHeight;

    this.canvas.width = this.stageWidth * 2;
    this.canvas.height = this.stageHeight * 2;
    this.ctx.scale(2, 2);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.block.draw(this.ctx);
    this.ball.draw(this.ctx, this.stageWidth, this.stageHeight, this.block);
  }
}
new Game();
