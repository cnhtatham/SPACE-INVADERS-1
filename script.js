var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var ship = document.getElementById("ship");
ship.style.display = 'none';

var shot = document.getElementById("fireSound");

var x = canvas.width / 2;
var y = canvas.height - 55
var x2 = x2
var y2 = canvas.height - 30
var dx = 2;
var dy = -2;
var ballRadius = 10
var rightPressed = false
var leftPressed = false
var spacePressed = false
var bulletCount = 0
var bulletActive = false;
var invaderRowCount = 5;
var invaderColumnCount = 11;
var invaderWidth = 40;
var invaderHeight = 20;
var invaderPadding = 10;
var invaderOffsetTop = 30;
var invaderOffsetLeft = 30;
var score = 0;
var moveLeft = true; 
var moveRight = false;

var invaders = []; // create a 2d array of space invaders
for (c = 0; c < invaderColumnCount; c++) {
    invaders[c] = [];
    for (r = 0; r < invaderRowCount; r++) {
        invaders[c][r] = {
            x: 0,
            y: 0,
            status: 1
        }
    }
}


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("keydown", spaceBarHandler, false)

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    } else if (e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    } else if (e.keyCode == 37) {
        leftPressed = false;
    }
}

function spaceBarHandler(e) {
    if (e.keyCode == 32) {
        spacePressed = true;
        bulletActive = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.drawImage(ship, x, y, 50, 50);
    ctx.closePath();
}



function drawBullet() {
    if (bulletActive == false) {
        ctx.beginPath();
        ctx.rect(x2, y2 - 25, 1, 15);
        ctx.fillStyle = "black"
        ctx.fill();
        ctx.stroke();
        ctx.closePath;
        bulletCount++
        if (y2 < 0) {
            spacePressed = false;
            y2 = canvas.height - 30;
            bulletCount = 0
        }
    }
}

function moveInvaders () {
    if (moveLeft == true && moveRight == false) {
        invaderOffsetLeft++
    }
    else if (moveLeft == false && moveRight == true) {
        invaderOffsetLeft -- 
    }
}

function sideDetection() {
    for (c = 0; c < invaderColumnCount; c++) {
        for (r = 0; r < invaderRowCount; r++) { 
            var i = invaders[c][r];
            if (i.x + invaderWidth > canvas.width) {
                moveLeft = false;
                moveRight = true
                invaderOffsetTop = invaderOffsetTop + 5;
            } else if (i.x < 0) {
                moveLeft = true
                moveRight = false
                invaderOffsetTop = invaderOffsetTop + 5;
            }
        }
    }
    moveInvaders()
}




function drawInvaders() { //create a 2 day array and paint each invader in it's location
    for (c = 0; c < invaderColumnCount; c++) {
        for (r = 0; r < invaderRowCount; r++) {
            if (invaders[c][r].status == 1) {
                var invaderX = (c * (invaderWidth + invaderPadding)) + invaderOffsetLeft;
                var invaderY = (r * (invaderHeight + invaderPadding)) + invaderOffsetTop;
                invaders[c][r].x = invaderX
                invaders[c][r].y = invaderY
                ctx.beginPath();
                ctx.rect(invaderX, invaderY, invaderWidth, invaderHeight);
                ctx.fillStyle = 'green';
                ctx.fill();
                ctx.closePath();
            }
        }
    }
    //setInterval(invaderOffsetLeft++, 10)
}



// check each invader if the bullet has hit
function collisionDetection() {
    for (c = 0; c < invaderColumnCount; c++) {
        for (r = 0; r < invaderRowCount; r++) {
            var i = invaders[c][r];
            if (i.status == 1) {
                //check to see if the bullets x value is greater than the x position of the invader including it's width, then check if the bullet has reached it's y value plus 27 for better effect.
                if (x2 > i.x && x2 < i.x + invaderWidth && y2 > i.y && y2 < i.y + invaderHeight + 27) {
                    i.status = 0
                    bulletActive = true;
                    spacePressed = false;
                    y2 = canvas.height - 30;
                    bulletCount = 0
                    score++;
                    if (score == 55) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawInvaders();
    drawBall();
    drawScore();
    collisionDetection();
    sideDetection();
    // stops ball moving too far
    if (rightPressed && x < canvas.width - ballRadius || rightPressed && x < ballRadius) {
        x += 3;
    } else if (leftPressed && x > 0 + ballRadius || leftPressed && x > ballRadius) {
        x -= 3;
    }

    if (spacePressed) {
        if (bulletCount === 0) { //Take the first x position of the ship at fire
            x2 = x + 24.5;
        }
        y2 -= 6; //bullet will travel up the screen
        drawBullet();
        shot.play();
    }

}
setInterval(draw, 10)