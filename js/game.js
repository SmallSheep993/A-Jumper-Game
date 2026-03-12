const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d")

const ground = 260

let gameState = "idle"

let dino = new Dino()
dino.ground = ground

let obstacles = new ObstacleManager(canvas, ground)
let score = new Score()

function collision(rect1, rect2) {
  return rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
}

function startGame() {
  gameState = "playing"
}

function resetGame() {
  gameState = "playing"
  dino = new Dino()
  dino.ground = ground
  obstacles = new ObstacleManager(canvas, ground)
  score = new Score()
}

function update() {
  if (gameState !== "playing") return

  dino.update()
  obstacles.update(score.value)
  score.update()

  obstacles.obstacles.forEach(o => {
    if (collision(dino, o)) {
      gameState = "gameover"
      score.saveHighScore()
    }
  })
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.strokeStyle = "#333"
  ctx.lineWidth = 2
  ctx.setLineDash([10, 10])
  ctx.beginPath()
  ctx.moveTo(0, ground)
  ctx.lineTo(canvas.width, ground)
  ctx.stroke()
  ctx.setLineDash([])

  dino.draw(ctx)
  obstacles.draw(ctx)
  score.draw(ctx)

  if (gameState === "idle") {
    ctx.fillStyle = "#555"
    ctx.font = "22px Arial"
    ctx.fillText("Press SPACE to start", 320, 140)
  }

  if (gameState === "gameover") {
    ctx.fillStyle = "rgba(0,0,0,0.4)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "#c0392b"
    ctx.font = "42px Arial"
    ctx.fillText("GAME OVER", 320, 120)
    ctx.fillStyle = "#333"
    ctx.font = "18px Arial"
    ctx.fillText("Press SPACE to restart", 340, 160)
  }
}

function loop() {
  update()
  draw()
  requestAnimationFrame(loop)
}

loop()
