function doAction() {
  if (gameState === "idle") {
    startGame()
    return
  }
  if (gameState === "gameover") {
    resetGame()
    return
  }
  if (gameState === "playing") {
    dino.jump()
  }
}

window.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    e.preventDefault()
    doAction()
  }
})

window.addEventListener("click", function () {
  doAction()
})
