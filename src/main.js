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

  // CANVAS BACKGROUND AND TEXT
  image(background0, 0, 0);
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
	player1_def.show();
  player1_atk.show();
  player2_def.show();
	player2_atk.show();

  // KEEP PLAYERS UPRIGHT
  if (player1_def.isOnGround(ground)){
    player1_def.updateAbsoluteAngle();
    player1_def.uprightTilt();
  }
  if (player1_atk.isOnGround(ground)){
    player1_atk.updateAbsoluteAngle();
    player1_atk.uprightTilt();
  }
  if (player2_def.isOnGround(ground)){
    player2_def.updateAbsoluteAngle();
    player2_def.uprightTilt();
  }
  if (player2_atk.isOnGround(ground)){
    player2_atk.updateAbsoluteAngle();
    player2_atk.uprightTilt();
  }

  // GAME CONTROLS
  if (keyIsDown(65)) {
    player1_def.cstr_legs.stiffness = 0.0001;      
    player1_def.kick();
  }

  if (keyIsDown(68)) {
    player1_atk.cstr_legs.stiffness = 0.0001;      
    player1_atk.kick();
  }

  if (keyIsDown(RIGHT_ARROW)) {
    player2_def.cstr_legs.stiffness = 0.0001;      
    player2_def.kick();
  }

  if (keyIsDown(LEFT_ARROW)){
    player2_atk.cstr_legs.stiffness = 0.0001;      
    player2_atk.kick();
  }
}