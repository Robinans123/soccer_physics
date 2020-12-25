function main() {

  Engine.update(engine);
  background(80, 255, 0);
  push();
  fill(0);
  textSize(20);
  stroke(0, 0, 0);
  text('Press ESC key to return to menu', ((CANVAS_WIDTH  * 6) / 7), 30);
  pop();

  // SCORE LOGIC
  gameScore.scoreCheck(ball, goal1, goal2);
  gameScore.show();
  
  // TIMER
  gameTimer.timerTick();
  gameTimer.show();

	ball.show();
  ground.show();
  goal1.show();
  goal2.show();
	player1_def.show();
  /*player1_atk.show();
  player2_def.show();
	player2_atk.show();*/

  if (player1_def.isOnGround(ground)){
    player1_def.uprightTilt();
  }

  // CONTROLS
  if (keyIsDown(65)) {
    player1_def.cstr_legs.stiffness = 0.0001;      
    player1_def.kick();  
  }

  if (keyIsDown(68)) {
    
  }

  if (keyIsDown(RIGHT_ARROW)) {
    
  }

  if (keyIsDown(LEFT_ARROW)){

  }
}