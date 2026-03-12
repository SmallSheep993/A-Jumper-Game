const STORAGE_KEY = "dinoHighScore"

class Score {
  constructor() {
    this.value = 0
    this.highScore = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10)
  }

  update() {
    this.value += 1
  }

  saveHighScore() {
    if (this.value > this.highScore) {
      this.highScore = this.value
      try {
        localStorage.setItem(STORAGE_KEY, String(this.highScore))
      } catch (e) {}
    }
  }

  draw(ctx) {
    ctx.fillStyle = "#333"
    ctx.font = "20px Arial"
    ctx.fillText("Score: " + this.value, 720, 28)
    ctx.fillStyle = "#666"
    ctx.font = "16px Arial"
    ctx.fillText("Best: " + this.highScore, 720, 52)
  }
}
