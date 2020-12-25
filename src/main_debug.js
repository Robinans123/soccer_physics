// ************************************************
// Teugg Soccer Physics
// Rip-off of the once popular Soccer Physics game
// Horribly coded by : Kevin Le Teugg, 2020
// File : main_debug.js
// Description :
// ************************************************

function main_debug() {

  Engine.update(engine);
  background(0, 100, 255);
  push();
  fill(0);
  textSize(20);
  stroke(0, 0, 0);
  text('Press ESC key to return to menu', ((CANVAS_WIDTH  * 6) / 7), 30);
  pop();

  // SCORE LOGIC - OK
  gameScore.scoreCheck(ball, goal1, goal2);
  gameScore.show();
  
  // TIMER - OK IT IS WORKING
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

  player1_def.showDebug();
  /*player1_atk.showDebug();
  player2_def.showDebug();
  player2_atk.showDebug();*/



  // GETTING THE ABSOLUTE ANGLE OF THE PLAYER (ANGLE BOUND BETWEEN -PI and PI) -> OK IT IS WORKING BUT CAN BE REFACTORED
  // FIRST QUADRANT [0 ... +90°[
  if (Math.sin(player1_def.main_body.angle) > 0 && Math.cos(player1_def.main_body.angle) > 0){
    if (player1_def.main_body.angle >= 0){
      player1_def.absoluteAngle = player1_def.main_body.angle % (2 * PI);
    }
    else {
      player1_def.absoluteAngle = (2 * PI) + (player1_def.main_body.angle % (2 * PI));
    }

    // DEBUG DISPLAY
    push();
    fill(0);
    textSize(20);
    stroke(0, 0, 0);
    text("1st quadrant - positive", (CANVAS_WIDTH / 2), CANVAS_HEIGHT / 2);
    pop();
  }
  // SECOND QUADRANT ]0 ... -90°]
  if (Math.sin(player1_def.main_body.angle) < 0 && Math.cos(player1_def.main_body.angle) > 0){
    if (player1_def.main_body.angle < 0){
      player1_def.absoluteAngle = player1_def.main_body.angle % (2 * PI);
    }
    else {
      player1_def.absoluteAngle = (player1_def.main_body.angle % (2 * PI)) - (2 * PI);
    }
    // DEBUG DISPLAY
    push();
    fill(0);
    textSize(20);
    stroke(0, 0, 0);
    text("2nd quadrant - negative", (CANVAS_WIDTH / 2), CANVAS_HEIGHT / 2);
    pop();
  }
  // THIRD QUADRANT ]-90 ... -180°]
  if (Math.sin(player1_def.main_body.angle) < 0 && Math.cos(player1_def.main_body.angle) < 0){
    if (player1_def.main_body.angle <= 0){
      player1_def.absoluteAngle = player1_def.main_body.angle % (2 * PI);
    }
    else {
      player1_def.absoluteAngle = (player1_def.main_body.angle % (2 * PI)) - (2 * PI);
    }
    // DEBUG DISPLAY
    push();
    fill(0);
    textSize(20);
    stroke(0, 0, 0);
    text("3rd quadrant - negative", (CANVAS_WIDTH / 2), CANVAS_HEIGHT / 2);
    pop();
  }
  // FOURTH QUADRANT [+90 ... +180°[
  if (Math.sin(player1_def.main_body.angle) > 0 && Math.cos(player1_def.main_body.angle) < 0){
    if (player1_def.main_body.angle > 0){
      player1_def.absoluteAngle = player1_def.main_body.angle % (2 * PI);
    }
    else {
      player1_def.absoluteAngle = (2 * PI) + player1_def.main_body.angle % (2 * PI);
    }
    // DEBUG DISPLAY
    push();
    fill(0);
    textSize(20);
    stroke(0, 0, 0);
    text("4th quadrant - positive", (CANVAS_WIDTH / 2), CANVAS_HEIGHT / 2);
    pop();
  }

  // DEBUG DISPLAY
  push();
  fill(0);
  textSize(20);
  stroke(0, 0, 0);
  text("Absolute angle : " + Math.floor(player1_def.absoluteAngle * 180 / PI) + "°", (CANVAS_WIDTH / 2), CANVAS_HEIGHT / 4);
  pop();

  push();
  fill(0);
  textSize(20);
  stroke(255, 0, 0);
  text("Body full angle : " + Math.floor(player1_def.main_body.angle * 180 / PI) + "°", (CANVAS_WIDTH / 2), CANVAS_HEIGHT / 4.5);
  pop();
  

  // TEST OF GETTING THE PLAYER 1 DEF UPRIGHT - WORKS PARTIALLY
  // TO DO : CREATE A VARYING FORCE (E.G. IT HAS TO BE STRONGER WHEN ANGLE OF PLAYER IS BIG) BUT IT MIGHT ALREADY BE THE CASE WHEN USING THE AXES ATTRIBUTE OF THE BODY
  // OR    : CREATE VARIOUS ANGLE BOUNDS WHERE THE tiltForceCoeff would change
  // MUST FIX THE ISSUE WHERE THE PLAYER MAKE A COMPLETE TURN
  if (player1_def.isOnGround(ground)){
    player1_def.uprightTilt();
  }

  // CONTROLS
  if (keyIsDown(65)) {
    player1_def.cstr_legs.stiffness = 0.0001;      
    player1_def.kick();
    // DEBUG DISPLAY - JUMP VECTOR
    push();
    var jumpForceDebug = Matter.Vector.create(player1_def.main_body.axes[0].x * -jumpForceCoeff, -player1_def.main_body.axes[0].y * jumpForceCoeff);
    translate(player1_def.main_body.position.x, player1_def.main_body.position.y);
    strokeWeight(4);
    stroke(255, 255, 255);
    line(0, 0, jumpForceDebug.x*1000, jumpForceDebug.y*1000);
    pop();    
  }

  if (keyIsDown(68)) {
    
  }

  if (keyIsDown(RIGHT_ARROW)) {
    
  }

  if (keyIsDown(LEFT_ARROW)){
    //var kickForceX = -player2_atk.leg_body.axes[1].x; // BEWARE !!! THIS HAS TO HAVE A POSITIVE SIGN FOR THE PLAYER 1
    //var kickForceY = -player2_atk.leg_body.axes[1].y; // BEWARE !!! THIS HAS TO HAVE A POSITIVE SIGN FOR THE PLAYER 1
    //var kickForce = Matter.Vector.create(kickForceX * -0.03, kickForceY * -0.03);
    //if (player2_atk.leg_body.angle < (PI / 2) % (2 * PI)) {
    /*if (player2_atk.leg_body.angle < (PI / 2)) {
      Body.applyForce(player2_atk.leg_body, player2_atk.leg_body.position, kickForce);
    }*/
    //Body.applyForce(player2_atk.leg_body, player2_atk.leg_body.position, kickForce);
  }

  // ********************************************************************************************************************************
  // DO NOT FORGET : WHEN RESETTING PLAYERS, use this function to get rid of the previous players : Matter.World.remove(world, body);
  // ********************************************************************************************************************************

  // DEBUG -------------------------------------------------------------------------------------------------------------------------------------------------------------

  // DEBUG DATA TO BE DISPLAYED ON THE HTML PAGE
  document.getElementById("playerMainBodyDensity").innerHTML = player1_def.main_body.density;
  document.getElementById("playerMovableLegDensity").innerHTML = player1_def.leg_body.density;
  document.getElementById("playerFixedLegDensity").innerHTML = player1_def.leg_fixed_body.density;
  document.getElementById("playerFootDensity").innerHTML = player1_def.foot_body.density;
  document.getElementById("gravity").innerHTML = world.gravity.y;
}