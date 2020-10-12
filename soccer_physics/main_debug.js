function main_debug() {

  Engine.update(engine);
  background(0, 100, 255);

  // SCORE LOGIC
  if (ball.body.position.x >= CANVAS_WIDTH - goal2.w && ball.body.position.y >= CANVAS_HEIGHT - goal2.h) {
    score1 = score1 + 1;
    ball.reset_loc();
  }
  if (ball.body.position.x <= goal1.w && ball.body.position.y >= CANVAS_HEIGHT - goal1.h) {
    score2 = score2 + 1;
    ball.reset_loc();
  }

  // TIMER - OK IT IS WORKING
  push();
  textSize(40);
  fill(255);
  stroke(0, 0, 0);
  if (frameCount % 60 == 0) {
    t_elapsed_sec = t_elapsed_sec + 1;
  }
  if (t_elapsed_sec >= 60) {
    t_elapsed_min = t_elapsed_min + 1;
    t_elapsed_sec = 0
  }
  text(nf(t_elapsed_min, 2, 0) + ":" + nf(t_elapsed_sec, 2, 0), (CANVAS_WIDTH / 2), 30);
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
  text('Press ESC key to return to menu', ((CANVAS_WIDTH  * 6) / 7), 30);
  pop();
  
	ball.show();
  ground.show();
	/*player1_atk.show();
  player1_def.show();
	player2_atk.show();
  player2_def.show();*/
  goal1.show();
  goal2.show();

  playerTest.show();
  playerTest.puppetFollow();

  playerTest2.show();
  playerTest2.puppetFollow();
  //playerTest.tilt();

  // CONTROLS
  if (keyIsDown(LEFT_ARROW)){
    //Body.applyForce(playerTest.main_body, playerTest.main_body.position, jumpForce2);
    push();
    var jumpForceTest = Matter.Vector.create(playerTest.main_body.axes[0].x * -0.2, -playerTest.main_body.axes[0].y * 0.2);
    text('Key Pressed', (CANVAS_WIDTH / 2), CANVAS_HEIGHT/2);
    translate(playerTest.main_body.position.x, playerTest.main_body.position.y);
    strokeWeight(4);
    stroke(255, 255, 255);
    line(0, 0, jumpForceTest.x*1000, jumpForceTest.y*1000);
    pop();
    console.log("Hello");
  }

  // DEBUG
  playerTestBodyGroundColl = Matter.SAT.collides(playerTest.main_body, ground.body);
  playerTestLeftLegGroundColl = Matter.SAT.collides(playerTest.leg_fixed_body, ground.body);
  playerTestRightLegGroundColl = Matter.SAT.collides(playerTest.leg_body, ground.body);
  playerTestFootGroundColl = Matter.SAT.collides(playerTest.foot_body, ground.body);

  isPlayerTestBodyOnGround = playerTestBodyGroundColl.collided;
  isPlayerTestLeftLegOnGround = playerTestLeftLegGroundColl.collided;
  isPlayerTestRightLegOnGround = playerTestRightLegGroundColl.collided;
  isPlayerTestFootOnGround = playerTestFootGroundColl.collided;

  isPlayerTestOnGround = isPlayerTestBodyOnGround || isPlayerTestLeftLegOnGround|| isPlayerTestRightLegOnGround || isPlayerTestFootOnGround;
  

  /*document.getElementById("player1_def_x").innerHTML = Math.round(player1_def.main_body.position.x);
  document.getElementById("player1_def_y").innerHTML = Math.round(player1_def.main_body.position.y);
  document.getElementById("player1_atk_x").innerHTML = Math.round(player1_atk.main_body.position.x);
  document.getElementById("player1_atk_y").innerHTML = Math.round(player1_atk.main_body.position.y);*/
  document.getElementById("playerTest_x").innerHTML = Math.round(playerTest.main_body.position.x);
  document.getElementById("playerTest_y").innerHTML = Math.round(playerTest.main_body.position.y);
  document.getElementById("playerTest_angle").innerHTML = Math.round((playerTest.main_body.angle * 180) / PI);
  document.getElementById("isPlayerTestBodyOnGround").innerHTML = isPlayerTestBodyOnGround;
  document.getElementById("isPlayerTestLeftLegOnGround").innerHTML = isPlayerTestLeftLegOnGround;
  document.getElementById("isPlayerTestRightLegOnGround").innerHTML = isPlayerTestRightLegOnGround;
  document.getElementById("isPlayerTestFootOnGround").innerHTML = isPlayerTestFootOnGround;
  document.getElementById("isPlayerTestOnGround").innerHTML = isPlayerTestOnGround;

  document.getElementById("jumpForce_x").innerHTML = jumpForce2.x;
  document.getElementById("jumpForce_y").innerHTML = jumpForce2.y;

  document.getElementById("playerTest_vertical_axis_x").innerHTML = Math.round(playerTest.main_body.axes[0].x * 1000) / 1000;
  document.getElementById("playerTest_vertical_axis_y").innerHTML = Math.round(playerTest.main_body.axes[0].y * 1000) / 1000;
  document.getElementById("playerTest_horizontal_axis_x").innerHTML = Math.round(playerTest.main_body.axes[1].x * 1000) / 1000;
  document.getElementById("playerTest_horizontal_axis_y").innerHTML = Math.round(playerTest.main_body.axes[1].y * 1000) / 1000;

  }