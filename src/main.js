function main() {

  Engine.update(engine);
  background(80, 255, 0);
  fill(0);
  textSize(20);
  stroke(0, 0, 0);
  text('Press ESC key to return to menu', ((CANVAS_WIDTH  * 6) / 7), 30);

  gameScore.scoreCheck(ball, goal1, goal2);
  gameScore.show();
  
  gameTimer.timerTick();
  gameTimer.show();

	ball.show();
	player1_def.show();
  player1_def.puppetFollow();
  player1_atk.show();
  player1_atk.puppetFollow();

  player2_def.show();
  player2_def.puppetFollow();
	player2_atk.show();
  player2_atk.puppetFollow();
  
  goal1.show();
  goal2.show();
}