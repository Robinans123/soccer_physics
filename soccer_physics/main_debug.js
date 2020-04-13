function main_debug() {

  background(0, 100, 255);
  fill(0);
  textSize(20);
  stroke(0, 0, 0);
  text('Right Click to return to menu', (CANVAS_WIDTH / 2), 30);
  ball.update();
	ball.show();
	player1.update();
	player1.show();
	player2.update();
	player2.show();
  goal1.show();
  goal2.show();
}