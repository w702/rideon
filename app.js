var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");

var RocketWidth = 10;
var RocketHeight = 30;
var RocketX = (canvas.width / 2) - RocketWidth;
var RocketY = canvas.height - 60;

var rightPress = false;
var leftPress = false;
var BeamPress = false;

var BeamY = canvas.height - 60;
var BeamX = (canvas.width / 2) - RocketWidth;

//各爆弾の定義（横座標はランダム）
var BombX = Math.random() * 400;
var BombY = 10;

var Bomb1X = Math.random() * 400;
var Bomb1Y = 10;

var Bomb2X = Math.random() * 400;
var Bomb2Y = 10;

var Bomb3X = Math.random() * 400;
var Bomb3Y = 10;

var Bomb4X = Math.random() * 400;
var Bomb4Y = 10;

var RX = 3;
var BY = 9;

var score = 0;

//敵の定義
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 20;
var brickHeight = 20;
var brickPadding = 40;
var brickOffsetTop = 30;
var brickOffsetLeft = 60;

var bricks = [];

//スコアの描画
function drawScore() {
    ctx.font = '16px Arial';
    ctx.fillStyle = 'green';
    ctx.fillText("Score:" + score, 8, 20);
}

for(var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for(var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = {x: 0, y: 0, status: 1};
    }
}

function bomb() {
    ctx.beginPath();
    ctx.rect(BombX, BombY, 20, 20);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}

function bomb1() {
    ctx.beginPath();
    ctx.rect(Bomb1X, Bomb1Y, 20, 20);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}
function bomb2() {
    ctx.beginPath();
    ctx.rect(Bomb2X, Bomb2Y, 20, 20);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}
function bomb3() {
    ctx.beginPath();
    ctx.rect(Bomb3X, Bomb3Y, 20, 20);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}
function bomb4() {
    ctx.beginPath();
    ctx.rect(Bomb4X, Bomb4Y, 20, 20);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}


//ビームと敵の衝突判定
function collisionDetection() {
    for(var c = 0; c < brickColumnCount; c++) {
        for(var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r]; 

            if(b.status == 1) {
                if(BeamX > b.x && BeamX < b.x + brickWidth && BeamY > b.y && BeamY < b.y + brickHeight) {
                    //レンガを消す
                    b.status = 0;
                    score++;
                    //敵にビームが当たるとまたビームが打てるようになる
                    if(b.status == 0) {
                        BeamY = canvas.height - 60;
                        BeamPress = false;
                    }
                }
            }
            //全ての敵を倒すとゲームクリア
            if(score == brickRowCount * brickColumnCount) {
                alert("YOU WIN");
                document.location.reload();
            }
        }
    }
}

//敵の描写(複数)
function drawBricks() {
    for(var c = 0; c < brickColumnCount; c++) {
        for(var r = 0; r < brickRowCount; r++) {

            if(bricks[c][r].status == 1) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;

                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "green";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
//このゲームの敗北条件
function GAMESET() {
    if(BombX + 20 > RocketX && BombX < RocketX + RocketWidth && BombY + 20 > RocketY && BombY < RocketY + RocketHeight) {
        alert("YOU_LOSE");
        document.location.reload();
    }
    if(Bomb1X + 20 > RocketX && Bomb1X < RocketX + RocketWidth && Bomb1Y + 20 > RocketY && Bomb1Y < RocketY + RocketHeight) {
        alert("YOU_LOSE");
        document.location.reload();
    }
    if(Bomb2X + 20 > RocketX && Bomb2X < RocketX + RocketWidth && Bomb2Y + 20 > RocketY && Bomb2Y < RocketY + RocketHeight) {
        alert("YOU_LOSE");
        document.location.reload();
    }
    if(Bomb3X + 20 > RocketX && Bomb3X < RocketX + RocketWidth && Bomb3Y + 20 > RocketY && Bomb3Y < RocketY + RocketHeight) {
        alert("YOU_LOSE");
        document.location.reload();
    }
    if(Bomb4X + 20 > RocketX && Bomb4X < RocketX + RocketWidth && Bomb4Y + 20 > RocketY && Bomb4Y < RocketY + RocketHeight) {
        alert("YOU_LOSE");
        document.location.reload();
    }
}
function drawRocket() {
    ctx.beginPath();
    ctx.rect(RocketX, RocketY, RocketWidth, RocketHeight);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}

function drawBeam() {
    ctx.beginPath();
    ctx.rect(BeamX, BeamY, 5, 15);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRocket();
    drawBeam();
    drawBricks();
    collisionDetection();
    drawScore();
    GAMESET();
    bomb();
    bomb1();
    bomb2();
    bomb3();
    bomb4();

    if(rightPress && RocketX < canvas.width - RocketWidth) {
        RocketX += RX;
    }
    else if(leftPress && RocketX > 0) {
        RocketX -= RX;
    }
    if(rightPress && BeamX < canvas.width - 5) {
        BeamX += RX;
    }
    else if(leftPress && BeamX > 0) {
        BeamX -= RX;
    }
    //ビームを打っている間はロケットは動けなくしている
    if(BeamPress) {
        BeamY -= BY;
        if(BeamY < 540) {
            rightPress = false;
            leftPress = false;
        }
    }
    
    //ビールが画面外に出るまで次の射撃が出来ない
    if(BeamY < 0) {
        BeamY = canvas.height - 60;
        BeamPress = false;
    }

    BombY += 3;
    if(BombY > 580) {
        BombX = Math.random() * 400;
        BombY = 10;
    }
    Bomb1Y += 3;
    if(Bomb1Y > 580) {
        Bomb1X = Math.random() * 400;
        Bomb1Y = 10;
    }
    Bomb2Y += 3;
    if(Bomb2Y > 580) {
        Bomb2X = Math.random() * 400;
        Bomb2Y = 10;
    }
    Bomb3Y += 3;
    if(Bomb3Y > 580) {
        Bomb3X = Math.random() * 400;
        Bomb3Y = 10;
    }
    Bomb4Y += 3;
    if(Bomb4Y > 580) {
        Bomb4X = Math.random() * 400;
        Bomb4Y = 10;
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPress = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPress = true;
    }
    else if (e.keyCode == 32) {
        BeamPress = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPress = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPress = false;
    }
    else if (e.keyCode == 32) {
        BeamPress = true;
    }
}


setInterval(draw, 10);
draw();