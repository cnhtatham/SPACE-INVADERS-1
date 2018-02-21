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
var playerDead = document.getElementById("playerDead");
//audio variables

var x = canvas.width / 2 - 26;
var y = canvas.height - 70;
var x2 = x2
var y2 = canvas.height - 80;
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
var invaderPaddingLeft = 14; //between columns
var invaderPaddingHeight = 20; //between rows
var invaderOffsetTop = 50;
var invaderOffsetLeft = 30;
var score = 0;
var moveLeft = true;
var moveRight = false;
var invaderSpeed = 0.5;
var invaderChange = 0;
var iShoot = false
var invaderShot = false;
var lives = 3
var boxWidth = 25
var boxHeight = 15
var Xinvader;
var Yinvader;
//These are all the global variables we use throughout the script in multiple functions


var Shield1 = []
var Shield2 = []
var Shield3 = []
var Shield4 = []
var Shields = [Shield1, Shield2, Shield3, Shield4]
//made an array containing the arrays for all the shields

for (d = 0; d < 4; d++) {
    var currentShield = Shields[d]
    for (s = 0; s < 5; s++) { // loops over every shield part of every shield
        currentShield[s] = {
            x: 0,
            y: 0,
            status: 4
        }//assigns an x and y and status variable to our shield array objects

        if (s == 0) {
            currentShield[s].x = (canvas.width / 5) * (d + 1) - boxWidth
            currentShield[s].y = canvas.height - 100
        } else if (s == 1) {
            currentShield[s].x = (canvas.width / 5) * (d + 1) - boxWidth
            currentShield[s].y = canvas.height - 115
        } else if (s == 2) {
            currentShield[s].x = (canvas.width / 5) * (d + 1)
            currentShield[s].y = canvas.height - 115
        } else if (s == 3) {
            currentShield[s].x = (canvas.width / 5) * (d + 1) + boxWidth
            currentShield[s].y = canvas.height - 115
        } else if (s == 4) {
            currentShield[s].x = (canvas.width / 5) * (d + 1) + boxWidth
            currentShield[s].y = canvas.height - 100
        }//sets the positions for each shield
    }
}

function drawShields() {
    for (d = 0; d < 4; d++) {
        var thisShield = Shields[d]
        for (s = 0; s < 5; s++) { //loops over every shield part
            if (thisShield[s].status == 4) { // checks the status of each shield and draws them in the appropriate
                ctx.beginPath();             // color at the correct position
                ctx.rect(thisShield[s].x, thisShield[s].y, boxWidth, boxHeight)
                ctx.fillStyle = "#ffffff"
                ctx.fill();
                ctx.closePath();
            } else if (thisShield[s].status == 3) {
                ctx.beginPath();
                ctx.rect(thisShield[s].x, thisShield[s].y, boxWidth, boxHeight)
                ctx.fillStyle = "green"
                ctx.fill();
                ctx.closePath();
            } else if (thisShield[s].status == 2) {
                ctx.beginPath();
                ctx.rect(thisShield[s].x, thisShield[s].y, boxWidth, boxHeight)
                ctx.fillStyle = "yellow"
                ctx.fill();
                ctx.closePath();
            } else if (thisShield[s].status == 1) {
                ctx.beginPath();
                ctx.rect(thisShield[s].x, thisShield[s].y, boxWidth, boxHeight)
                ctx.fillStyle = "red"
                ctx.fill();
                ctx.closePath();
            } 
        }
    }
}


function shipBulletShieldCollision() { //function to check if ship bullet collides with any of the shield parts
    for (d = 0; d < 4; d++) {          // and takes a point of health away from them and resets your ship bullet
        var thisShield = Shields[d]
        for (s = 0; s < 5; s++) {
            var thisShield = Shields[d]
            if (thisShield[s].status != 0) {
                if (x2 > thisShield[s].x && x2 < thisShield[s].x + boxWidth && y2 > thisShield[s].y && y2 < thisShield[s].y + boxHeight) {
                    thisShield[s].status -=1
                    bulletActive = true;
                    spacePressed = false;
                    y2 = canvas.height - 80;
                    bulletCount = 0
                }
            }
        }
    }
}

function invaderBulletShieldCollision() { //function to check if any of the invader bullets collide with the shields
    for (d = 0; d < 4; d++) {             //and removes a point of health and resets the invader bullet  
        var thisShield = Shields[d]
        for (s = 0; s < 5; s++) {
            var thisShield = Shields[d]
            if (thisShield[s].status != 0) {
                if (Xinvader > thisShield[s].x && Xinvader < thisShield[s].x + boxWidth && Yinvader < thisShield[s].y + boxHeight && Yinvader > thisShield[s].y) {
                    thisShield[s].status -=1
                    iShoot = false;
                    iShootCount = 0
                    invaderShot = false;
                }
            }
        }
    }
}

var invaders = []; // create a 2d array of space invaders

for (c = 0; c < invaderColumnCount; c++) {
    invaders[c] = [];
    for (r = 0; r < invaderRowCount; r++) { //these 2 for loops go over every item in our 2d array
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
        } //Making each row of invaders have a different score value
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
    ctx.drawImage(ship, x, y, 60, 60);
    ctx.closePath();
    if (rightPressed && x < canvas.width - ballRadius || rightPressed && x < ballRadius) {
        x += 3;
    } else if (leftPressed && x > 3 || leftPressed && x > ballRadius) {
        x -= 3;
    }
}
//Function to draw our ship at the current X and Y position whihc are changed when the movement keys are pressed
function drawBullet() {
    if (bulletActive == false) { //Check to see if a bullet is already on the screen
        ctx.beginPath();
        ctx.rect(x2, y2, 3.5, 25);
        ctx.fillStyle = "#9b59b6"
        ctx.fill(); // draws the bullet on screen
        ctx.closePath;
        bulletCount++
        if (y2 < 0) {
            spacePressed = false;
            y2 = canvas.height - 80;
            bulletCount = 0 // makes the bullet disappear when it hits the top of the canvas
        }
    }
}

function delayMove() {
    invaderOffsetChange = 5;
}


function moveInvaders() { // function that moves the invaders left then right at a rate which is determined
    if (moveLeft == true && moveRight == false) { // by the variable invaderSpeed
        invaderOffsetLeft += invaderSpeed;
    } else if (moveLeft == false && moveRight == true) {
        invaderOffsetLeft -= invaderSpeed;
    }
}



function sideDetection() {
    for (c = 0; c < invaderColumnCount; c++) {
        for (r = 0; r < invaderRowCount; r++) { //loops over each invader in our 2d array
            var i = invaders[c][r];
            if (i.x + invaderWidth > canvas.width) { //Checks to see if any invader has reached the right wall 
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
    moveInvaders();
}

function change() {
    if (invaderChange == 0) {
        invaderChange = 1
    } else if (invaderChange == 1) {
        invaderChange = 0
    }
}

function lose() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setInterval(drawGameOver, 10);
}

function drawGameOver() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.font = "40px 'Press Start 2P', cursive";
    ctx.fillStyle = "white";
    ctx.fillText("GAME OVER COCKMUNCHER!!", 150, 300);
    alternate();
}

function alternate() {
    drawBall();
    fire();
}

function win() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setInterval(drawWin, 10);
}

function drawWin() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.font = "40px 'Press Start 2P', cursive";
    ctx.fillStyle = "white";
    ctx.fillText("YOU WIN FUCK BRAINS", 150, 300);
    alternate();
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
                clearInterval();
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
                    y2 = canvas.height - 80;
                    bulletCount = 0
                    score += i.score;
                }
            }
        }
    }
}

function selectRandom() {
    invaderShot = true;
    var col = Math.floor(Math.random() * invaderColumnCount);
    if (invaders[col][4].status == 1) {
        var invaderX = (col * (invaderWidth + invaderPaddingLeft)) + invaderOffsetLeft;
        var invaderY = (4 * (invaderHeight + invaderPaddingHeight)) + invaderOffsetTop;
        invaders[col][4].x = invaderX
        invaders[col][4].y = invaderY
        Xinvader = invaderX + 20;
        Yinvader = invaderY + 45;
        iShoot = true;
        invaderShoot();
    } else if (invaders[col][3].status == 1) {
        var invaderX = (col * (invaderWidth + invaderPaddingLeft)) + invaderOffsetLeft;
        var invaderY = (3 * (invaderHeight + invaderPaddingHeight)) + invaderOffsetTop;
        invaders[col][3].x = invaderX
        invaders[col][3].y = invaderY
        Xinvader = invaderX + 20;
        Yinvader = invaderY + 45;
        iShoot = true;
        invaderShoot();
    } else if (invaders[col][2].status == 1) {
        var invaderX = (col * (invaderWidth + invaderPaddingLeft)) + invaderOffsetLeft;
        var invaderY = (2 * (invaderHeight + invaderPaddingHeight)) + invaderOffsetTop;
        invaders[col][2].x = invaderX
        invaders[col][2].y = invaderY
        Xinvader = invaderX + 20;
        Yinvader = invaderY + 45;
        iShoot = true;
        invaderShoot();
    } else if (invaders[col][1].status == 1) {
        var invaderX = (col * (invaderWidth + invaderPaddingLeft)) + invaderOffsetLeft;
        var invaderY = (1 * (invaderHeight + invaderPaddingHeight)) + invaderOffsetTop;
        invaders[col][1].x = invaderX
        invaders[col][1].y = invaderY
        Xinvader = invaderX + 20;
        Yinvader = invaderY + 45;
        iShoot = true;
        invaderShoot();
    } else if (invaders[col][0].status == 1) {
        var invaderX = (col * (invaderWidth + invaderPaddingLeft)) + invaderOffsetLeft;
        var invaderY = (0 * (invaderHeight + invaderPaddingHeight)) + invaderOffsetTop;
        invaders[col][0].x = invaderX
        invaders[col][0].y = invaderY
        Xinvader = invaderX + 20;
        Yinvader = invaderY + 45;
        iShoot = true;
        invaderShoot();
    } else {
        invaderShot = false;
    }
}

function invaderShoot() {
    if (iShoot) {
        ctx.beginPath();
        ctx.rect(Xinvader, Yinvader - 25, 3, 15);
        ctx.fillStyle = "white"
        ctx.fill();
        ctx.closePath;
        if (Xinvader > x && Xinvader < x + 60 && Yinvader < y + 60 && Yinvader > y) {
            iShoot = false;
            iShootCount = 0
            invaderShot = false;
            lives--;
            playerDead.play();
            x = canvas.width / 2 - 26;
            y = canvas.height - 70;
        } else if (Yinvader > canvas.height) {
            iShoot = false;
            iShootCount = 0
            invaderShot = false;
        }
    }
}

function drawScore() {
    ctx.font = "16px 'Press Start 2P', cursive";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}

function drawLives() {
    ctx.font = "16px 'Press Start 2P', cursive";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("LIVES: " + lives, 1000, 20);
}

function fire() {
    if (spacePressed) {
        if (bulletCount === 0) { //Take the first x position of the ship at fire
            x2 = x + 27.8;
            //audio
            shot.play();
        }
        y2 -= 6; //bullet will travel up the screen
        drawBullet();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawInvaders();
    drawBall();
    fire();
    drawScore();
    drawLives();
    collisionDetection();
    sideDetection();
    invaderShoot();
    drawShields();
    shipBulletShieldCollision();
    invaderBulletShieldCollision()
    // stops ball moving too far

    if (lives <= 0) {
        clearInterval(game);
        lose();
    }

    if (score >= 1500) {
        clearInterval(game);
        win();
    }

    if (invaderShot == false) {
        selectRandom();
    }

    if (iShoot) {
        Yinvader += 2; //bullet will travel down the screen
    }

}
var game = setInterval(draw, 10)