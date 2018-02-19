var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var ship = document.getElementById("ship");
ship.style.display = "none";
var kill = document.getElementById("invaderKilled");
kill.style.display = "none";

var lowInvaderA = document.getElementById("lowA");
var lowInvaderB = document.getElementById("lowB");

var midInvaderA = document.getElementById("midA");
var midInvaderB = document.getElementById("midB");

var highInvaderA = document.getElementById("highA");
var highInvaderB = document.getElementById("highB");

lowInvaderA.style.display = "none";
lowInvaderB.style.display = "none";
midInvaderA.style.display = "none";
midInvaderB.style.display = "none";
highInvaderA.style.display = "none";
highInvaderB.style.display = "none";

//audio's
var explode = document.getElementById("explosion");
var shot = document.getElementById("fireSound");

var x = canvas.width / 2;
var y = canvas.height - 55
var x2 = x2
var y2 = canvas.height - 30
var dx = 2;
var dy = -2;
var ballRadius = 52
var rightPressed = false
var leftPressed = false
var spacePressed = false
var bulletCount = 0
var bulletActive = false;
var invaderRowCount = 5;
var invaderColumnCount = 11;
var invaderWidth = 48;
var invaderHeight = 32;
var invaderPadding = 10;
var invaderOffsetTop = 30;
var invaderOffsetLeft = 30;
var score = 0;
var moveLeft = true; 
var moveRight = false;
var invaderSpeed = 0.3;

var invaders = []; // create a 2d array of space invaders
for (c = 0; c < invaderColumnCount; c++) {
    invaders[c] = [];
    for (r = 0; r < invaderRowCount; r++) {
        invaders[c][r] = {
        x: 0,
        y: 0,
        status: 1,
        score: 0
       }
        if (r==0){
            invaders[c][r].score = 40 
        }
        else if(r==1){
            invaders[c][r].score = 20
        }
        else if(r==2){
            invaders[c][r].score = 20
        }
        else if(r==3){
            invaders[c][r].score = 10
        }
        else if(r==4){
            invaders[c][r].score = 10
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
        invaderOffsetLeft += invaderSpeed;
    }
    else if (moveLeft == false && moveRight == true) {
        invaderOffsetLeft -= invaderSpeed;
    }
}



function sideDetection() {
    for (c = 0; c < invaderColumnCount; c++) {
        for (r = 0; r < invaderRowCount; r++) { 
            var i = invaders[c][r];
            if (i.x + invaderWidth > canvas.width) {
                moveLeft = false;
                moveRight = true
                invaderOffsetTop = invaderOffsetTop + 3;
            } else if (i.x < 0) {
                moveLeft = true
                moveRight = false
                invaderOffsetTop = invaderOffsetTop + 3;
                invaderSpeed += 0.03;
            }
        }
    }
    moveInvaders()
}

function drawInvaders() { //create a 2 day array and paint each invader in it's location
        function switchLow() {
            ctx.drawImage(lowInvaderB, invaderX, invaderY, invaderWidth, invaderHeight)
        }
    for (c = 0; c < invaderColumnCount; c++) {
        for (r = 0; r < invaderRowCount; r++) {
            if (invaders[c][r].status == 1) {
                var invaderX = (c * (invaderWidth + invaderPadding)) + invaderOffsetLeft;
                var invaderY = (r * (invaderHeight + invaderPadding)) + invaderOffsetTop;
                invaders[c][r].x = invaderX
                invaders[c][r].y = invaderY
                if (r==0){
                    ctx.beginPath();
                    ctx.drawImage(highInvaderA, invaderX, invaderY, invaderWidth, invaderHeight);
                    ctx.closePath();
                    //setTimeout(switchLow,1000);
                }
                else if(r==1){
                    ctx.beginPath();
                    ctx.drawImage(lowInvaderA, invaderX, invaderY, invaderWidth, invaderHeight);
                    ctx.closePath();
                }
                else if(r==2){
                    ctx.beginPath();
                    ctx.drawImage(lowInvaderB, invaderX, invaderY, invaderWidth, invaderHeight);
                    ctx.closePath();
                }
                else if(r==3){
                    ctx.beginPath();
                    ctx.drawImage(midInvaderB, invaderX, invaderY, invaderWidth, invaderHeight);
                    ctx.closePath();
                }
                else if(r==4){
                    ctx.beginPath();
                    ctx.drawImage(midInvaderA, invaderX, invaderY, invaderWidth, invaderHeight);
                    ctx.closePath();
                }
            }
        }
    }
}

function disapear() {
    i.style.display = "none";
}

// check each invader if the bullet has hit
function collisionDetection() {
    for (c = 0; c < invaderColumnCount; c++) {
        for (r = 0; r < invaderRowCount; r++) {
            var i = invaders[c][r];
            if (i.status == 1) {
                //check to see if the bullets x value is greater than the x position of the invader including it's width, then check if the bullet has reached it's y value plus 27 for better effect.
                if (x2 > i.x && x2 < i.x + invaderWidth && y2 > i.y && y2 < i.y + invaderHeight + 27) {
                    i.status = 2;
                    explode.play();
                    ctx.beginPath();
                    ctx.drawImage(kill, i.x+10, i.y, 20, 20);
                    ctx.closePath();
                    bulletActive = true;
                    spacePressed = false;
                    y2 = canvas.height - 30;
                    bulletCount = 0
                    score += i.score;
                    if (score >= 1100) {
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
            //audio
            shot.play();
        }
        y2 -= 6; //bullet will travel up the screen
        drawBullet();
        
    }

}
setInterval(draw, 10)