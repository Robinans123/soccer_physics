// ************************************************
// Teugg Soccer Physics
// Rip-off of the once popular Soccer Physics game
// Horribly coded by : Kevin Le Teugg, 2020
// File : main.js
// Description : Main function of the code
// ************************************************

function main() {

  // GAME ENGINE UPDATE
  Engine.update(engine);

  // SOCKET EMIT
  //socket.emit('keys', keyPressed());

  // CANVAS BACKGROUND AND TEXT
  image(background0, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  push();
  fill(0);
  textSize(20);
  stroke(0, 0, 0);
  //text('Press ESC key to return to menu', ((CANVAS_WIDTH  * 6) / 7), 30);
  pop();

  // SCORE LOGIC
  gameScore.scoreCheck(ball, goal1, goal2);
  gameScore.show();
  
  // TIMER
  gameTimer.timerTick();
  gameTimer.show();

  // SHOW GRAPHICS
	ball.show();
  ground.show();
  goal1.show();
  goal2.show();
	player1Def.show();
  player1Atk.show();
  player2Def.show();
	player2Atk.show();

  singlePlayerAI(menu);
  
  // KEEP PLAYERS UPRIGHT
  if (player1Def.isOnGround(ground)){
    player1Def.updateAbsoluteAngle();
    player1Def.uprightTilt();
  }
  if (player1Atk.isOnGround(ground)){
    player1Atk.updateAbsoluteAngle();
    player1Atk.uprightTilt();
  }
  if (player2Def.isOnGround(ground)){
    player2Def.updateAbsoluteAngle();
    player2Def.uprightTilt();
  }
  if (player2Atk.isOnGround(ground)){
    player2Atk.updateAbsoluteAngle();
    player2Atk.uprightTilt();
  }

  // GAME CONTROLS
  if (keyIsDown(65) && menu == P1_LOCAL_LEFT_SELECTED) {
    player1Def.cstrLegs.stiffness = 0.00001;      
    player1Def.kick(kickForceCoeff);
  }

  if (keyIsDown(68) && menu == P1_LOCAL_LEFT_SELECTED) {
    player1Atk.cstrLegs.stiffness = 0.00001;      
    player1Atk.kick(kickForceCoeff);
  }

  if (keyIsDown(RIGHT_ARROW) && menu == P1_LOCAL_RIGHT_SELECTED) {
    player2Def.cstrLegs.stiffness = 0.00001;      
    player2Def.kick(kickForceCoeff);
  }

  if (keyIsDown(LEFT_ARROW) && menu == P1_LOCAL_RIGHT_SELECTED){
    player2Atk.cstrLegs.stiffness = 0.00001;      
    player2Atk.kick(kickForceCoeff);
  }
}