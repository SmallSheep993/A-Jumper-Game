class Dino {
  constructor() {
    this.x = 80
    this.y = 0
    this.width = 40
    this.height = 40
    this.velocityY = 0
    this.gravity = 0.8
    this.jumpForce = -15
    this.ground = 0
    this.image = new Image()
    this.image.src = "assets/jumper.jpg"
  }

  update() {
    this.velocityY += this.gravity
    this.y += this.velocityY

    if (this.y > this.ground - this.height) {
      this.y = this.ground - this.height
      this.velocityY = 0
    }
  }

  jump() {
    if (this.y >= this.ground - this.height) {
      this.velocityY = this.jumpForce
    }
  }

  draw(ctx) {
    if (this.image.complete && this.image.naturalWidth) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    } else {
      ctx.fillStyle = "#333"
      ctx.fillRect(this.x, this.y, this.width, this.height)
    }
  }
}
