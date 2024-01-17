// Board
let board;
let boardWidth = 500;
let boardHeight = 500;
let context;




// Players
let playerwidth = 10;
let playerheight = 50;
let playerVelocityY = 0;

let player1 = {
    x: 10, // <----- positions paddle 10px from the wall.
    y: boardHeight/2, // <---- positions paddle at half the height of the board, AKA the midway point. 
    width: playerwidth,
    height: playerheight,
    velocityY : playerVelocityY
}

let player2 = {
    x: boardWidth - playerwidth - 10, // <----- positions paddle horizontally
    y: boardHeight/2, // <---- positions paddle at half the height of the board, AKA the midway point. 
    width: playerwidth,
    height: playerheight,
    velocityY : playerVelocityY
}



// Ball
let ballWidth = 10;
let ballHeight = 10;
let ball = {
    x: boardWidth/2,
    y: boardHeight/2,
    width: ballWidth,
    height: ballHeight,
    velocityX: 1, // <-- ball will move 1px going left or right (right in this case)
    velocityY: 2, // <-- ball will move 2px going up or down (down in this case)
}



let player1Score = 0;
let player2Score = 0;





window.onload = function() { // <-- This means that something happens as soon as the page loads.
    board = document.getElementById('board');
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext('2d'); // Used for drawing on the board (canvas)

    // Draw initial player 1
    context.fillStyle = 'skyblue'; // <-- this sets the color of the 'pen'.
    context.fillRect(player1.x, player1.y, player1.width, player1.height);



    requestAnimationFrame(update);
    document.addEventListener('keyup', movePlayer)
}


function update() {
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height)

    // Player 1
    context.fillStyle = 'skyblue'; // <-- this sets the color of the 'pen'.
    // player1.y += player1.velocityY;
    let nextPlayer1Y = player1.y + player1.velocityY;
    if (!outOfBounds(nextPlayer1Y)) {
        player1.y = nextPlayer1Y
    }
    context.fillRect(player1.x, player1.y, player1.width, player1.height);

    // Player 2
    // player2.y += player2.velocityY;
    let nextPlayer2Y = player2.y + player2.velocityY;
    if (!outOfBounds(nextPlayer2Y)) {
        player2.y = nextPlayer2Y
    };
    context.fillRect(player2.x, player2.y, player2.width, player2.height)

    // Ball
    context.fillStyle = "white";
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    context.fillRect(ball.x, ball.y, ball.width, ball.height);

    // If ball touches top or bottom of canvas
    if(ball.y <= 0 || (ball.y + ball.height >= boardHeight)) {
        ball.velocityY *= -1; // <-- This reverses the ball's direction.
    }

    // Bounce the ball back
    if(detectCollision(ball, player1)) {
        if(ball.x <= player1.x + player1.width) {
            //left side of ball touches right side of player1
            ball.velocityX *= -1; // Flips the ball's x direction

        }
    } else if(detectCollision(ball, player2)) {
        if(ball.x + ballWidth >= player2.x)
        //right side of ball touches left side of player 2
    ball.velocityX *= -1;  // Flips the ball's x direction
    }


    // Game over for each round
    if(ball.x < 0) {
        player2Score++;
        resetGame(1);
    }
    else if(ball.x + ballWidth > boardWidth) {
        player1Score++;
        resetGame(-1);
    }

    // Scoreboard
    context.font = "45px sans-serif";
    context.fillText(player1Score, boardWidth/5, 45);
    context.fillText(player2Score, boardWidth*4/5 -45, 45)

    // Draw dotted line down the middle 
    for (let i = 10; i < board.height; i += 25) {
        // i = starting y position, draw a square every 25 pixels down 
        context.fillRect(board.width/2 -10, i, 5, 5)

    }


}

function outOfBounds(yPosition) {
    return (yPosition < 0 || yPosition + playerheight > boardHeight)
}

function movePlayer(e) {
   // Player 1
   if (e.code == "KeyW") {
     player1.velocityY = -3;
   } else if (e.code == "KeyS") {
    player1.velocityY = 3;
   }

   // Player 2
   if (e.code == "ArrowUp") {
    player2.velocityY = -3;
   } else if (e.code == 'ArrowDown') {
    player2.velocityY = 3;
   }
}


function detectCollision(a, b) {
    return a.x < b.x + b.width && // a's top left corner doesnt reach b's top right corner 
           a.x + a.width > b.x && // a's top right corner passses b's top left corner 
           a.y < b.y + b.height && // a's top left corner doesnt reach b's bottom left corner
           a.y + a.height > b.y; //a's bottom left corner passes b's top left corner
}


function resetGame(direction) {
    ball = {
        x: boardWidth/2,
        y: boardHeight/2,
        width: ballWidth,
        height: ballHeight,
        velocityX: direction, 
        velocityY: 2, 
    
}
}