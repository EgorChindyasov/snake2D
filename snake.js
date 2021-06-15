const canvas = document.getElementById('game')

const context = canvas.getContext('2d')

const grid = 16

let spead = 0

let count = 0

const snake = {
    x: 160,
    y: 160,
    dx: grid,
    dy: 0,
    cells: [],
    maxCells: 3
}

const apple = {
    x: 320,
    y: 320
}

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}

const gameOver = () => {
    snake.x = 160
    snake.y = 160
    snake.cells = []
    snake.maxCells = 3
    snake.dx = grid
    snake.dy = 0

    apple.x = getRandomInt(0, canvas.width / grid) * grid
    apple.y = getRandomInt(0, canvas.height / grid) * grid

    document.getElementById('count').innerHTML = 'Apples eaten: 0'

    count = 0
}

// game loop
const loop = () => {
    // slow down the speed of the game
    requestAnimationFrame(loop)
    if (++spead < 5) {
      return
    }

    spead = 0
    // cleare the game area
    context.clearRect(0, 0, canvas.width, canvas.height)
    // moving the snake
    snake.x += snake.dx
    snake.y += snake.dy
    
    // if the snake has reached the edge of the field horizontally
    if (snake.x < 0 || snake.x >= canvas.width) {
        gameOver()
    }
    // if the snake has reached the edge of the field vertically
    if (snake.y < 0 || snake.y >= canvas.height) {
        gameOver()
    }
    
    snake.cells.unshift({ x: snake.x, y: snake.y })
    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop()
    }

    // draw the apple
    context.fillStyle = 'red'
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1)
    
    // draw body of the snake 
    context.fillStyle = 'green'
    snake.cells.forEach((cell, index) => {
        context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
        if (cell.x === apple.x && cell.y === apple.y) {
            snake.maxCells++
            count++
            document.getElementById('count').innerHTML = `Apples eaten: ${count}`
            apple.x = getRandomInt(0, canvas.width / grid) * grid
            apple.y = getRandomInt(0, canvas.height / grid) * grid
        }
     
        for (let i = index + 1; i < snake.cells.length; i++) {
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                gameOver()
            }
        }
    })
}

document.addEventListener('keydown', (e) => {

    // left arrow 
    if (e.which === 37 && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    }
    // up arrow
    else if (e.which === 38 && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    }
    // right arrow
    else if (e.which === 39 && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    }
    // down arrow
    else if (e.which === 40 && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }
  });

requestAnimationFrame(loop)