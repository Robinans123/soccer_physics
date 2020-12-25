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
  player1_atk.show();
  player2_def.show();
  player2_atk.show();

  player1_def.showDebug();
  player1_atk.showDebug();
  player2_def.showDebug();
  player2_atk.showDebug();

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

  // CONTROLS
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