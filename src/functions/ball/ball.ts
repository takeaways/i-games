import Block from "./block";

export default class Ball {
  private vx = 0;
  private vy = 0;
  private x = 0;
  private y = 0;

  constructor(
    private stageWith: number = 0,
    private stageHeight: number = 0,
    private radius: number = 0,
    private speed: number = 0
  ) {
    this.vx = this.speed;
    this.vy = this.speed;

    const diameter = this.radius * 2;
    this.x = diameter + (Math.random() * this.stageWith - diameter);
    this.y = diameter + (Math.random() * this.stageHeight - diameter);
  }

  draw(
    ctx: CanvasRenderingContext2D,
    stageWidth: number,
    stageHeight: number,
    block: Block
  ): void {
    this.x += this.vx;
    this.y += this.vy;

    this.bounceWindow(stageWidth, stageHeight);
    this.bounceBlock(block);

    ctx.fillStyle = "#fdd700";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }

  bounceWindow(stageWidth: number, stageHeight: number): void {
    const minX = this.radius;
    const maxX = stageWidth - this.radius;
    const minY = this.radius;
    const maxY = stageHeight - this.radius;

    if (this.x <= minX || this.x >= maxX) {
      this.vx *= -1;
      this.x += this.vx;
    } else if (this.y <= minY || this.y >= maxY) {
      this.vy *= -1;
      this.y += this.vy;
    }
  }

  bounceBlock(block: Block) {
    const minX = block.x - this.radius;
    const maxX = block.maxX + this.radius;
    const minY = block.y - this.radius;
    const maxY = block.maxY + this.radius;

    if (this.x > minX && this.x < maxX && this.y > minY && this.y < maxY) {
      const x1 = Math.abs(minX - this.x);
      const x2 = Math.abs(this.x - maxX);
      const y1 = Math.abs(minY - this.y);
      const y2 = Math.abs(this.y - maxY);
      const min1 = Math.min(x1, x2);
      const min2 = Math.min(y1, y2);
      const min = Math.min(min1, min2);

      if (min === min1) {
        this.vx *= -1;
        this.x += this.vx;
      } else if (min === min2) {
        this.vy *= -1;
        this.y += this.vy;
      }
    }
  }
}
