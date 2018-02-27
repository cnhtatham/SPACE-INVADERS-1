var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
//Declaing variable to call on our canvas foir drawing all objects

var youWin = document.getElementById("youWin");
youWin.style.display = "none";
var youLose = document.getElementById("youLose");
youLose.style.display = "none";
var menu = document.getElementById("main");
menu.style.display = "none";

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

var redInvader = document.getElementById("red");

var shieldStatus4 = document.getElementById("shieldStatus4");
var shieldStatus3 = document.getElementById("shieldStatus3");
var shieldStatus2 = document.getElementById("shieldStatus2");
var shieldStatus1 = document.getElementById("shieldStatus1");

redInvader.style.display = "none";
shieldStatus4.style.display = "none";
shieldStatus3.style.display = "none";
shieldStatus2.style.display = "none";
shieldStatus1.style.display = "none";
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
var select = document.getElementById("select");
var moveSound = document.getElementById("faster");
var rSound = document.getElementById("redSound")
var rGSound = document.getElementById("redGo")
var laser = document.getElementById("invaderlaser")

//audio variables
var start = true;
var winActive = false;
var loseActive = false;
var win = false;
var lose = false;
var play = 0;
var options = false;
var mainMenu = false;
var level = 1
var nextLvl = false
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
var invaderColumnCount = 13;
var invaderWidth = 42; //individual sizing
var invaderHeight = 30; //individual sizing
var invaderPaddingLeft = 14; //between columns
var invaderPaddingHeight = 20; //between rows
var invaderOffsetTop = 70;
var invaderOffsetLeft = 30;
var score = 0;
var moveLeft = true;
var moveRight = false;
var invaderSpeed = 0.5 + (0.1 * level);
var invaderChange = 0;
var iShoot = false
var invaderShot = false;
var lives = 3;
var boxWidth = 25
var boxHeight = 15
var Xinvader;
var Yinvader;
var resetBoxHeight = 60;
var resetBoxWidth = 300;
var resetBoxY = 297;
var resetBoxLeftX = 212;
var resetBoxRightX = 648;
var invaderOffsetTop2 = 30;
var invaderOffsetLeft2 = 1200;
var redSpeed = 1;
var go = false;
var invaderRedX = 0;
var invaderRedY = 0;
var death = 0;
var soundtouse = 0
var invaderBulletCount = 0;

//These are all the global variables we use throughout the script in multiple functions

function livesImg() {
    if (lives === 2) {
        //document.getElementById("life1").style.display = "block";
        //document.getElementById("life2").style.display = "block";
        document.getElementById("life3").className = "iGInvis";
    }
    if (lives === 1) {
        //document.getElementById("life1").style.display = "block";
        document.getElementById("life2").className = "iGInvis";
    }
    if (lives === 0) {
        document.getElementById("life1").className = "iGInvis";
    }
}
//made a function for lives counter to take away ships from the side 
//side note
//thoughts for a wrecked/exploded ship instead of nothing?


// SHIELD >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
var Shield1 = []
var Shield2 = []
var Shield3 = []
var Shield4 = []
var Shields = [Shield1, Shield2, Shield3, Shield4]
//made an array containing the arrays for all the shields
function makeShields() {
    for (d = 0; d < 4; d++) {
        var currentShield = Shields[d]
        for (s = 0; s < 5; s++) { // loops over every shield part of every shield
            currentShield[s] = {
                x: 0,
                y: 0,
                status: 4
            } //assigns an x and y and status variable to our shield array objects

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
            } //sets the positions for each shield
        }
    }
}

makeShields()

function drawShields() {
    for (d = 0; d < 4; d++) {
        var thisShield = Shields[d]
        for (s = 0; s < 5; s++) { //loops over every shield part
            if (thisShield[s].status == 4) { // checks the status of each shield and draws them in the appropriate
                ctx.beginPath(); // color at the correct position
                ctx.drawImage(shieldStatus4, thisShield[s].x, thisShield[s].y, boxWidth, boxHeight);
                ctx.closePath();
            } else if (thisShield[s].status == 3) {
                ctx.beginPath();
                ctx.drawImage(shieldStatus3, thisShield[s].x, thisShield[s].y, boxWidth, boxHeight);
                ctx.closePath();
            } else if (thisShield[s].status == 2) {
                ctx.beginPath();
                ctx.drawImage(shieldStatus2, thisShield[s].x, thisShield[s].y, boxWidth, boxHeight);
                ctx.closePath();
            } else if (thisShield[s].status == 1) {
                ctx.beginPath();
                ctx.drawImage(shieldStatus1, thisShield[s].x, thisShield[s].y, boxWidth, boxHeight);
                ctx.closePath();
            }
        }
    }
}


function shipBulletShieldCollision() { //function to check if ship bullet collides with any of the shield parts
    for (d = 0; d < 4; d++) { // and takes a point of health away from them and resets your ship bullet
        var thisShield = Shields[d]
        for (s = 0; s < 5; s++) {
            var thisShield = Shields[d]
            if (thisShield[s].status != 0) {
                if (x2 > thisShield[s].x && x2 < thisShield[s].x + boxWidth && y2 > thisShield[s].y && y2 < thisShield[s].y + boxHeight) {
                    thisShield[s].status -= 1
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
    for (d = 0; d < 4; d++) { //and removes a point of health and resets the invader bullet  
        var thisShield = Shields[d]
        for (s = 0; s < 5; s++) {
            var thisShield = Shields[d]
            if (thisShield[s].status != 0) {
                if (Xinvader > thisShield[s].x && Xinvader < thisShield[s].x + boxWidth && Yinvader < thisShield[s].y + boxHeight && Yinvader > thisShield[s].y) {
                    thisShield[s].status -= 1
                    iShoot = false;
                    iShootCount = 0
                    invaderShot = false;
                }
            }
        }
    }
}


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// INVADERS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
var invaders = []; // create a 2d array of space invaders
function makeInvaders() {
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
}

makeInvaders()

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
                if (invaderOffsetTop < 390) {
                    invaderOffsetTop = invaderOffsetTop + 5;
                    invaderSpeed += 0.02;
                }
            } else if (i.x < 0) {
                moveLeft = true
                moveRight = false
                if (invaderOffsetTop < 390) {
                    invaderOffsetTop = invaderOffsetTop + 5;
                    invaderSpeed += 0.02;
                }
            }
        }
    }
    moveInvaders();
}

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
                lose();
            }
        }
    }
}

// check each invader if the bullet has hit
function collisionDetection() {
    for (c = 0; c < invaderColumnCount; c++) {
        for (r = 0; r < invaderRowCount; r++) {
            var i = invaders[c][r];
            if (i.status == 1) {
                //check to see if the bullets x value is greater than the x position of the invader including it's width, then check if the bullet has reached it's y value plus 27 for better effect.
                if (x2 > i.x && x2 < i.x + invaderWidth && y2 > i.y && y2 < i.y + invaderHeight) {
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
                    death++;
                }
                for (d = 0; d < 4; d++) {
                    var thisShield = Shields[d]
                    for (s = 0; s < 5; s++) {
                        var thisShield = Shields[d]
                        if (thisShield[s].status != 0) {
                            if (i.x > thisShield[s].x && i.x < thisShield[s].x + boxWidth && i.y - 30 < thisShield[s].y + boxHeight && i.y > thisShield[s].y - 30) {
                                thisShield[s].status = 0
                            }
                        }
                    }
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
        invaderBulletCount++;
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
            invaderBulletCount = 0
        } else if (Yinvader > canvas.height) {
            iShoot = false;
            iShootCount = 0
            invaderShot = false;
            invaderBulletCount = 0
        }
    }
}

function change() {
    if (invaderChange == 0) {
        invaderChange = 1
        moveSound.play();
        if (soundChangespeed > 240) {
            soundChangespeed -= 20;
            setTimeout(change, soundChangespeed);
        } else {
            setTimeout(change, soundChangespeed);
        }
    } else if (invaderChange == 1) {
        invaderChange = 0
        moveSound.play();
        if (soundChangespeed > 240) {
            soundChangespeed -= 20;
            setTimeout(change, soundChangespeed);
        } else {
            setTimeout(change, soundChangespeed);
        }
    }
}

var soundChangespeed = 1500;
var Interval = setTimeout(change, soundChangespeed);

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//RED INVADER>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

var redI = {
    x: 0,
    y: 0,
    status: 1,
    score: 150
}

function drawRed() {
    if (redI.status == 1) {
        redI.x = redInvaderX
        redI.y = redInvaderY
        ctx.drawImage(redInvader, redI.x, redI.y, 32, invaderHeight);
    }
}

function turnTrue() {
    invaderOffsetLeft2 = 1200;
    redInvaderX = 1200;
    redInvaderY = 30;
    redI.status = 1
    go = true;
    rGSound.play();
}

if(start == true) {
setInterval(turnTrue, Math.floor(Math.random() * 10000) + 20000);
}

function moveRed() {
    if (go == true) {
        redInvaderX -= redSpeed;
    }
}

function redDetection() {
    if (go) {
        if (redI.status == 1) {
            if (x2 > redInvaderX && x2 < redInvaderX + invaderWidth && y2 > redInvaderY && y2 < redInvaderY + invaderHeight) {
                rSound.play();
                /*ctx.beginPath();
                ctx.drawImage(kill, i.x + 10, i.y, 20, 20);
                ctx.closePath();*/
                bulletActive = true;
                spacePressed = false;
                y2 = canvas.height - 80;
                bulletCount = 0
                score += redI.score;
                go = false;
                redInvaderX = 1200
                redInvaderY = 30
                redI.status = 0
            } else if (redInvaderX + invaderWidth <= 0) {
                go = false;
                redInvaderX = 1200
                redInvaderY = 30
            }
        }
    }
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


//SHIP>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
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
function drawShip() {
    ctx.beginPath();
    ctx.drawImage(ship, x, y, 60, 60);
    ctx.closePath();
    if (rightPressed && x < canvas.width - ballRadius || rightPressed && x < ballRadius) {
        x += 3;
    } else if (leftPressed && x > 3 || leftPressed && x > ballRadius) {
        x -= 3;
    }
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

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//changes the invaders img

//MENU FUNCTIONS>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function result() {
    if (win == true) {
        drawWin();
        winActive = true;
        drawShip();
        fire();
        makeInvaders();
        makeShields()
        invaderOffsetLeft = 30;
        invaderOffsetTop = 70;
        death = 0;
        moveLeft = true;
        moveRight = false;
        invaderSpeed = 0.5 + (0.1 * level);
        if (mainMenu == true) {
            drawMainMenu();
            winActive = false;
            youWin.style.display = "none";

        }
    } else if (lose == true) {
        drawLose();
        loseActive = true;
        drawShip();
        fire();
        makeInvaders();
        makeShields();
        invaderOffsetLeft = 30;
        invaderOffsetTop = 50;
        score = 0;
        death = 0;
        moveLeft = true;  
        moveRight = false;
        invaderSpeed = 0.5 + (0.1 * level);
        if (mainMenu == true) {
            drawMainMenu();
            youLose.style.display = "none";
        }
    }
}

function drawLose() {
    youLose.style.display = "inLine";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //alternateLose();

    /* This is the menu box */
    ctx.beginPath()
    ctx.fillStyle = "white";
    ctx.fillRect(resetBoxLeftX, resetBoxY, resetBoxWidth, resetBoxHeight)
    ctx.closePath()
    mainMenuCollision()

    /* This is the restart box */
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.fillRect(resetBoxRightX, resetBoxY, resetBoxWidth, resetBoxHeight)
    ctx.closePath();
    restartCollision();
}

function drawWin() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    youWin.style.display = "inLine";

    /* This is the menu box */
    ctx.beginPath()
    ctx.fillStyle = "white";
    ctx.fillRect(resetBoxLeftX, resetBoxY, resetBoxWidth, resetBoxHeight)
    ctx.closePath()
    mainMenuCollision()

    /* This is the level box */
    ctx.beginPath()
    ctx.fillStyle = "white";
    ctx.fillRect(resetBoxRightX, resetBoxY, resetBoxWidth, resetBoxHeight)
    ctx.closePath()
    nextLvlCollision()
    //console.log(mainMenu)
}

function mainMenuCollision() {
    if (winActive == true || loseActive == true) {
        if (x2 > resetBoxRightX && x2 < resetBoxRightX + resetBoxWidth && y2 > resetBoxY && y2 < resetBoxY + resetBoxHeight) {
            bulletActive = true;
            spacePressed = false;
            y2 = canvas.height - 80;
            bulletCount = 0
            select.currentTime = 0;
            select.play();
            loseActive = false;
            //draw mainMenu function here
            mainMenu = true;
            console.log(mainMenu)
        }
    }
}

function nextLvlCollision() {
    if (winActive == true && x2 > resetBoxLeftX && x2 < resetBoxLeftX + resetBoxWidth && y2 > resetBoxY && y2 < resetBoxY + resetBoxHeight) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        youWin.style.display = "none";
        bulletActive = true;
        spacePressed = false;
        y2 = canvas.height - 80;
        bulletCount = 0;
        //nextLvl = true;
        select.currentTime = 0;
        select.play();
        level++
        start = true;
        lose = false
        win = false;
        console.log(level)
    }
}

function restartCollision() {
    if (loseActive == true && x2 > resetBoxLeftX && x2 < resetBoxLeftX + resetBoxWidth && y2 > resetBoxY && y2 < resetBoxY + resetBoxHeight) {
        bulletActive = true;
        spacePressed = false;
        y2 = canvas.height - 80;
        bulletCount = 0
        level = 1
        lives = 3
        start = true;
        select.currentTime = 0;
        select.play();
        console.log(level)
        youLose.style.display = "none";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //draw restart function here
    }
}

function drawMainMenu() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    menu.style.display = "inLine";
    //youWin.style.display = "none"
    //youLose.style.display = "none";
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawShip();
    fire();
    playCollision();
    drawPlay();
    drawOptions();
}

function drawPlay() {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.fillRect(resetBoxLeftX, resetBoxY, resetBoxWidth, resetBoxHeight)
    ctx.closePath();
    playCollision();
}

function drawOptions() {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.fillRect(resetBoxRightX, resetBoxY, resetBoxWidth, resetBoxHeight)
    ctx.closePath();
    optionsCollision();
}

//Play collision and options collision copied from menuC and nextlvlC -> dont work independently 
function playCollision() {
    if (mainMenu == true && x2 > resetBoxLeftX && x2 < resetBoxLeftX + resetBoxWidth && y2 > resetBoxY && y2 < resetBoxY + resetBoxHeight) {
        bulletActive = true;
        spacePressed = false;
        y2 = canvas.height - 80;
        bulletCount = 0;
        select.currentTime = 0;
        select.play();
        play++;
        lose = false;
        winActive = false;
        lives = 3
        start = true;
        menu.style.display = "none";
        mainMenu = false;
        console.log(start)
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

function optionsCollision() {
    if (mainMenu == true && x2 > resetBoxRightX && x2 < resetBoxRightX + resetBoxWidth && y2 > resetBoxY && y2 < resetBoxY + resetBoxHeight) {
        bulletActive = true;
        spacePressed = false;
        y2 = canvas.height - 80;
        bulletCount = 0
        select.currentTime = 0;
        select.play();
        //options = true;
        //console.log(options)
        play--;
        console.log(play)
    }
}


function disapear() {
    i.style.display = "none";
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

function draw() {
    if (start == true) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawInvaders();
        drawShip();
        fire();
        drawScore();
        drawLives();
        collisionDetection();
        sideDetection();
        invaderShoot();
        drawShields();
        shipBulletShieldCollision();
        invaderBulletShieldCollision()
        livesImg();

        if (lives <= 0) {
            start = false;
            lose = true;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            result();
        }

        if (death == 65) {
            win = true;
            start = false;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            result();
        }

        if (invaderShot == false) {
            selectRandom();
        }

        if (iShoot) {
            Yinvader += 2 + (0.5 * (level - 1)); //bullet will travel down the screen
        }

        if (go) {
            drawRed();
            moveRed();
            redDetection();
        }
    } else if (start == false) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawShip();
        fire();
        result();
    }
}
var game = setInterval(draw, 10)