function main() {

  background(80, 255, 0);
  fill(0);
  textSize(20);
  stroke(0, 0, 0);
  text('Right Click to return to menu', (CANVAS_WIDTH / 2), 30);
  ball.update();
	ball.show();
	player1_atk.update();
	player1_atk.show();
  player1_def.update();
  player1_def.show();
	player2_atk.update();
	player2_atk.show();
  player2_def.update();
  player2_def.show();
  goal1.show();
  goal2.show();
}