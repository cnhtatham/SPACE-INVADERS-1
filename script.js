var canvas = document.getElementById("myCanvas"); 
var ctx = canvas.getContext("2d"); 
//Declaing variable to call on our canvas foir drawing all objects

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
//Setting all source images in HTML so they do not show in the body

var explode = document.getElementById("explosion");
var shot = document.getElementById("fireSound");
//audio variables

var x = canvas.width / 2 - 26;
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
var invaderColumnCount = 15;
var invaderWidth = 42; //individual sizing
var invaderHeight = 30; //individual sizing
var invaderPaddingLeft = 10; //between columns
var invaderPaddingHeight = 20; //between rows
var invaderOffsetTop = 50;
var invaderOffsetLeft = 30;
var score = 0;
var moveLeft = true;
var moveRight = false;
var invaderSpeed = 0.5;
var invaderChange = 0;

var Shield1 = []
var Shield2 = []
var Shield3 = []
var Shield4 = []
//These are all the global variables we use throughout the script in multiple functions

var invaders = []; // create a 2d array of space invaders
for (c = 0; c < invaderColumnCount; c++) {
    invaders[c] = [];
    for (r = 0; r < invaderRowCount; r++) {//these 2 for loops go over every item in our 2d array
        invaders[c][r] = {
            x: 0,
            y: 0,
            status: 1,
            score: 0 //Treating the 2d array like an object, we can call and change different values for each item in the array
        }
        if (r == 0) {
            invaders[c][r].score = 40
        } else if (r == 1) {
            invaders[c][r].score = 20
        } else if (r == 2) {
            invaders[c][r].score = 20
        } else if (r == 3) {
            invaders[c][r].score = 10
        } else if (r == 4) {
            invaders[c][r].score = 10
        }//Making each row of invaders have a different score value
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("keydown", spaceBarHandler, false);
//Declaring our movement and shooting event listeners

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    } else if (e.keyCode == 37) {
        leftPressed = true;
    }
}
//Function to make our ship move left or right when the corresponding key is pressed
function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    } else if (e.keyCode == 37) {
        leftPressed = false;
    }
}
//Function to stop the movement of the ship when the key is released
function spaceBarHandler(e) {
    if (e.keyCode == 32) {
        spacePressed = true;
        bulletActive = false;
    }
}
//Function to shoot when soace is pressed, but only if noo bullet is currently on the screen
function drawBall() {
    ctx.beginPath();
    ctx.drawImage(ship, x, y, 50, 50);
    ctx.closePath();
}
//Function to draw our ship at the current X and Y position whihc are changed when the movement keys are pressed
function drawBullet() {
    if (bulletActive == false) { //Check to see if a bullet is already on the screen
        ctx.beginPath();
        ctx.rect(x2, y2 - 25, 1, 15);
        ctx.fillStyle = "#ffffff"
        ctx.fill(); // draws the bullet on screen
        ctx.closePath;
        bulletCount++
        if (y2 < 0) {
            spacePressed = false;
            y2 = canvas.height - 30;
            bulletCount = 0 // makes the bullet disappear when it hits the top of the canvas
        }
    }
}
 
function delayMove() {
    invaderOffsetChange = 5;
}


function moveInvaders() { // function that moves the invaders left then right at a rate which is determined
    if (moveLeft == true && moveRight == false) {// by the variable invaderSpeed
        invaderOffsetLeft += invaderSpeed;
    } else if (moveLeft == false && moveRight == true) {
        invaderOffsetLeft -= invaderSpeed;
    }
}



function sideDetection() {
    for (c = 0; c < invaderColumnCount; c++) {
        for (r = 0; r < invaderRowCount; r++) {//loops over each invader in our 2d array
            var i = invaders[c][r];
            if (i.x + invaderWidth > canvas.width) {//Checks to see if any invader has reached the right wall 
                moveLeft = false; //and moves them down a peg and starts moving them left
                moveRight = true
                invaderOffsetTop = invaderOffsetTop + 1;
            } else if (i.x < 0) {
                moveLeft = true
                moveRight = false
                invaderOffsetTop = invaderOffsetTop + 1;
                //invaderSpeed += 0.01;
            }
        }
    }
    setTimeout(moveInvaders(), 5000);
}

function change() {
    if (invaderChange == 0) {
        invaderChange = 1
    } 
    else if (invaderChange == 1) {
        invaderChange = 0
    }
}

function drawGameOver() {
    clearInterval();
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.font = "40px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("GAME OVER COCKMUNCHER!!", 200, 300);
}

setInterval(change, 600)

function drawInvaders() { //create a 2 day array and paint each invader in it's location
    function switchHigh() {
        if (invaderChange == 0) {
            ctx.drawImage(highInvaderA, invaderX + 5, invaderY, 32, invaderHeight);
        } else if (invaderChange == 1) {
            ctx.drawImage(highInvaderB, invaderX + 5, invaderY, 32, invaderHeight);
        }
    }

    function switchMid() {
        if (invaderChange == 0) {
            ctx.drawImage(midInvaderA, invaderX, invaderY, invaderWidth, invaderHeight);
        } else if (invaderChange == 1) {
            ctx.drawImage(midInvaderB, invaderX, invaderY, invaderWidth, invaderHeight);
        }
    }
    function switchMid2() {
        if (invaderChange == 0) {
            ctx.drawImage(midInvaderB, invaderX, invaderY, invaderWidth, invaderHeight);
        } else if (invaderChange == 1) {
            ctx.drawImage(midInvaderA, invaderX, invaderY, invaderWidth, invaderHeight);
        }
    }

    function switchLow() {
        if (invaderChange == 0) {
            ctx.drawImage(lowInvaderA, invaderX, invaderY, invaderWidth, invaderHeight);
        } else if (invaderChange == 1) {
            ctx.drawImage(lowInvaderB, invaderX, invaderY, invaderWidth, invaderHeight);
        }
    }
    function switchLow2() {
        if (invaderChange == 0) {
            ctx.drawImage(lowInvaderB, invaderX, invaderY, invaderWidth, invaderHeight);
        } else if (invaderChange == 1) {
            ctx.drawImage(lowInvaderA, invaderX, invaderY, invaderWidth, invaderHeight);
        }
    }

    for (c = 0; c < invaderColumnCount; c++) {
        for (r = 0; r < invaderRowCount; r++) {
            if (invaders[c][r].status == 1) {
                var invaderX = (c * (invaderWidth + invaderPaddingLeft)) + invaderOffsetLeft;
                var invaderY = (r * (invaderHeight + invaderPaddingHeight)) + invaderOffsetTop;
                invaders[c][r].x = invaderX
                invaders[c][r].y = invaderY
                if (r == 0) {
                    ctx.beginPath();
                    switchHigh();
                    ctx.closePath();
                    //setTimeout(switchLow,1000);
                } else if (r == 1) {
                    ctx.beginPath();
                    switchMid();
                    ctx.closePath();
                } else if (r == 2) {
                    ctx.beginPath();
                    switchMid2();
                    ctx.closePath();
                } else if (r == 3) {
                    ctx.beginPath();
                    switchLow();
                    ctx.closePath();
                } else if (r == 4) {
                    ctx.beginPath();
                    switchLow2();
                    ctx.closePath();
                }
            }
            if (invaderY >= canvas.height - 100) {
                drawGameOver();
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
                    i.status = 0;
                    explode.play();
                    /*ctx.beginPath();
                    ctx.drawImage(kill, i.x + 10, i.y, 20, 20);
                    ctx.closePath();*/
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
    } else if (leftPressed && x > 3 || leftPressed && x > ballRadius) {
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

//setInterval(drawInvaders, 20)

setInterval(draw, 10) 
