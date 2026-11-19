const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Raquetes
const paddleWidth = 10, paddleHeight = 100;
let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
let rightPaddleY = canvas.height / 2 - paddleHeight / 2;

// Bola
let ballX = canvas.width / 2, ballY = canvas.height / 2;
let ballSize = 10;
let ballSpeedX = 4, ballSpeedY = 4;

// Controles
const keys = {};
document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Raquetes
  ctx.fillStyle = "white";
  ctx.fillRect(20, leftPaddleY, paddleWidth, paddleHeight);
  ctx.fillRect(canvas.width - 30, rightPaddleY, paddleWidth, paddleHeight);

  // Bola
  ctx.fillRect(ballX, ballY, ballSize, ballSize);
}

function update() {
  // Movimento das raquetes
  if (keys["w"] && leftPaddleY > 0) leftPaddleY -= 5;
  if (keys["s"] && leftPaddleY < canvas.height - paddleHeight) leftPaddleY += 5;
  if (keys["ArrowUp"] && rightPaddleY > 0) rightPaddleY -= 5;
  if (keys["ArrowDown"] && rightPaddleY < canvas.height - paddleHeight) rightPaddleY += 5;

  // Movimento da bola
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Colisão com bordas
  if (ballY <= 0 || ballY >= canvas.height - ballSize) ballSpeedY *= -1;

  // Colisão com raquetes
  if (
    ballX <= 30 &&
    ballY + ballSize >= leftPaddleY &&
    ballY <= leftPaddleY + paddleHeight
  ) {
    ballSpeedX *= -1;
  }

  if (
    ballX >= canvas.width - 40 &&
    ballY + ballSize >= rightPaddleY &&
    ballY <= rightPaddleY + paddleHeight
  ) {
    ballSpeedX *= -1;
  }

  // Resetar bola se sair da tela
  if (ballX < 0 || ballX > canvas.width) {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX *= -1;
  }
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
