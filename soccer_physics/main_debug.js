function main_debug() {

  background(0, 100, 255);

  // SCORE LOGIC
  if (ball.x >= CANVAS_WIDTH - goal2.w && ball.y >= CANVAS_HEIGHT - goal2.h) {
    score1 = score1 + 1;
    ball.reset_loc();
  }
  if (ball.x <= goal1.w && ball.y >= CANVAS_HEIGHT - goal1.h) {
    score2 = score2 + 1;
    ball.reset_loc();
  }

  // DISPLAY ELAPSED TIME
  push();
  textSize(40);
  fill(255);
  stroke(0, 0, 0);
  t_elapsed_sec = round((millis() / 1000) % 60);
  if (t_elapsed_sec % 60 == 0) {
    t_elapsed_min = t_elapsed_min + 1;
    t_elapsed_sec = 0;
  }
  text(t_elapsed_min + ":" + t_elapsed_sec, (CANVAS_WIDTH / 2), 30);
  pop();

  // DISPLAY SCORE
  push();
  textSize(90);
  stroke(0, 0, 0);
  text(score1 + ' - ' + score2, (CANVAS_WIDTH / 2), 100);
  pop();
  
  push();
  fill(0);
  textSize(20);
  stroke(0, 0, 0);
  text('Right Click to return to menu', ((CANVAS_WIDTH  * 6) / 7), 30);
  pop();
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

  // GAME LOGIC
  if (player1_atk.contact(ball)) {
    ball.xspeed = ball.xspeed * -1;
    ball.yspeed = ball.yspeed * -1;
  }
  if (player1_def.contact(ball)) {
    ball.xspeed = ball.xspeed * -1;
    ball.yspeed = ball.yspeed * -1;
  }
  if (player2_atk.contact(ball)) {
    ball.xspeed = ball.xspeed * -1;
    ball.yspeed = ball.yspeed * -1;
  }
  if (player2_def.contact(ball)) {
    ball.xspeed = ball.xspeed * -1;
    ball.yspeed = ball.yspeed * -1;
  }
}