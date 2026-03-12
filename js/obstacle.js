class Obstacle {
  constructor(x, ground, speed) {
    this.width = 22
    this.height = 45
    this.x = x
    this.y = ground - this.height
    this.speed = speed || 6
  }

  update() {
    this.x -= this.speed
  }

  draw(ctx) {
    ctx.font = "42px Arial"
    ctx.textAlign = "center"
    ctx.fillText("💩", this.x + this.width / 2, this.y + this.height - 2)
    ctx.textAlign = "left"
  }
}

class ObstacleManager {
  constructor(canvas, ground) {
    this.canvas = canvas
    this.ground = ground
    this.obstacles = []
    this.spawnTimer = 0
    this.nextSpawnInterval = 140
  }

  getSpeed(score) {
    const minSpeed = 2
    const maxSpeed = 10
    const speed = minSpeed + score / 400
    return Math.min(maxSpeed, speed)
  }

  getSpawnInterval(score) {
    const maxInterval = 180
    const minInterval = 95
    const interval = maxInterval - score / 28
    return Math.max(minInterval, interval)
  }

  update(score) {
    const speed = this.getSpeed(score)
    const baseInterval = this.getSpawnInterval(score)

    this.spawnTimer++
    if (this.spawnTimer >= this.nextSpawnInterval) {
      this.spawnTimer = 0
      const variation = 50
      this.nextSpawnInterval = baseInterval + (Math.random() * 2 - 1) * variation
      this.nextSpawnInterval = Math.max(70, Math.min(220, this.nextSpawnInterval))
      this.spawn(speed)
    }

    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      this.obstacles[i].speed = speed
      this.obstacles[i].update()
      if (this.obstacles[i].x < -60) {
        this.obstacles.splice(i, 1)
      }
    }
  }

  spawn(speed) {
    const obstacle = new Obstacle(this.canvas.width + 20, this.ground, speed)
    this.obstacles.push(obstacle)
  }

  draw(ctx) {
    this.obstacles.forEach(o => o.draw(ctx))
  }
}
