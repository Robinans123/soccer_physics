// ************************************************
// Teugg Soccer Physics
// Rip-off of the once popular Soccer Physics game
// Horribly coded by : Kevin Le Teugg, 2020
// File : main_debug.js
// Description : Main function used for debugging purposes
// ************************************************

function main_debug() {

  // GAME ENGINE UPDATE - OK
  Engine.update(engine);

  // CANVAS BACKGROUND AND TEXT - OK
  image(background0, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  push();
  fill(0);
  textSize(20);
  stroke(0, 0, 0);
  //text('Press ESC key to return to menu', ((CANVAS_WIDTH  * 6) / 7), 30);
  pop();

  // SCORE LOGIC - OK
  gameScore.scoreCheck(ball, goal1, goal2);
  gameScore.show();
  
  // TIMER - OK
  gameTimer.timerTick();
  gameTimer.show();
  
  // SHOW GRAPHICS - OK
	ball.show();
  ground.show();
  goal1.show();
  goal2.show();
  player1Def.show();
  player1Atk.show();
  player2Def.show();
  player2Atk.show();

  // SHOW DEBUG GRAPHICS - OK
  player1Def.showDebug();
  player1Atk.showDebug();
  player2Def.showDebug();
  player2Atk.showDebug();

  // KEEP PLAYERS UPRIGHT - ALMOST OK
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

  // GAME CONTROLS - OK
  if (keyIsDown(65)) {
    player1Def.cstr_legs.stiffness = 0.00001;      
    player1Def.kick(kickForceCoeff); 
  }

  if (keyIsDown(68)) {
    player1Atk.cstr_legs.stiffness = 0.00001;      
    player1Atk.kick(kickForceCoeff);
  }

  if (keyIsDown(RIGHT_ARROW)) {
    player2Def.cstr_legs.stiffness = 0.00001;      
    player2Def.kick(kickForceCoeff);
  }

  if (keyIsDown(LEFT_ARROW)){
    player2Atk.cstr_legs.stiffness = 0.00001;      
    player2Atk.kick(kickForceCoeff);
  }

  // ********************************************************************************************************************************
  // DO NOT FORGET : WHEN RESETTING PLAYERS, use this function to get rid of the previous players : Matter.World.remove(world, body);
  // ********************************************************************************************************************************

  // DEBUG --------------------------------------------------------------------------------------------------------------------------

  // DEBUG DATA TO BE DISPLAYED ON THE HTML PAGE
  document.getElementById("playerMainBodyDensity").innerHTML = player1Def.main_body.density;
  document.getElementById("playerMovableLegDensity").innerHTML = player1Def.leg_body.density;
  document.getElementById("playerFixedLegDensity").innerHTML = player1Def.leg_fixed_body.density;
  document.getElementById("playerFootDensity").innerHTML = player1Def.foot_body.density;
  document.getElementById("gravity").innerHTML = world.gravity.y;
}