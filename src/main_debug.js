function main_debug() {

  Engine.update(engine);
  background(0, 100, 255);

  // SCORE LOGIC - OK
  gameScore.scoreCheck(ball, goal1, goal2);
  gameScore.show();
  
  // TIMER - OK IT IS WORKING
  gameTimer.timerTick();
  gameTimer.show();
  
  push();
  fill(0);
  textSize(20);
  stroke(0, 0, 0);
  text('Press ESC key to return to menu', ((CANVAS_WIDTH  * 6) / 7), 30);
  pop();

	ball.show();
  ground.show();

  goal1.show();
  goal2.show();

  player1_def.show();
  player1_def.showDebug();

  // TEST OF GETTING THE PLAYER 1 DEF UPRIGHT - WORKS PARTIALLY
  // TO DO : CREATE A VARYING FORCE (E.G. IT HAS TO BE STRONGER WHEN ANGLE OF PLAYER IS BIG) BUT IT MIGHT ALREADY BE THE CASE WHEN USING THE AXES ATTRIBUTE OF THE BODY
  // OR    : CREATE VARIOUS ANGLE BOUNDS WHERE THE tiltForceCoeff would change
  // THE puppetFollow() METHOD IS NOW USELESS
  // MUST FIX THE ISSUE WHERE THE PLAYER MAKE A COMPLETE TURN
  if (player1_def.isOnGround(ground)){
    var tiltForce = Matter.Vector.create(player1_def.main_body.axes[1].x * -tiltForceCoeff, -player1_def.main_body.axes[1].y * tiltForceCoeff);
    if ((player1_def.main_body.angle) % (2 * PI) >= PI/5) {
      // TEMPORISATION NEEDED ?
      Body.applyForce(player1_def.main_body, player1_def.main_body.position, Matter.Vector.neg(tiltForce));
      // DEBUG DISPLAY
      push();
      text('Positive angle', (CANVAS_WIDTH / 2), CANVAS_HEIGHT/3);
      text(player1_def.main_body.angle % 2*PI, (CANVAS_WIDTH / 2), CANVAS_HEIGHT/1.5);
      translate(player1_def.main_body.position.x, player1_def.main_body.position.y);
      strokeWeight(4);
      stroke(255, 255, 255);
      line(0, 0, -tiltForce.x*2000, -tiltForce.y*2000);
      pop();
    }
    if ((player1_def.main_body.angle) % (2 * PI) <= -PI/5) {
      Body.applyForce(player1_def.main_body, player1_def.main_body.position, tiltForce);
      // DEBUG DISPLAY
      push();
      text('Negative angle', (CANVAS_WIDTH / 2), CANVAS_HEIGHT/3);
      text(player1_def.main_body.angle, (CANVAS_WIDTH / 2), CANVAS_HEIGHT/1.5);
      translate(player1_def.main_body.position.x % 2*PI, player1_def.main_body.position.y);
      strokeWeight(4);
      stroke(255, 255, 255);
      line(0, 0, tiltForce.x*2000, tiltForce.y*2000);
      pop();
    }
    else {
      // Reset applied force when angle of player is enough to keep him upright
      Body.applyForce(player1_def.main_body, player1_def.main_body.position, Matter.Vector.create(0,0));
    }
  }

  /*player1_atk.show();
  player1_atk.puppetFollow();
  player1_atk.showDebug();

  player2_def.show();
  player2_def.puppetFollow();
  player2_def.showDebug();

  player2_atk.show();
  player2_atk.puppetFollow();
  player2_atk.showDebug();*/

  // CONTROLS
  if (keyIsDown(65)) {      
    //player1_def.kick();
    // JUMP VECTOR
    push();
    var jumpForceTest = Matter.Vector.create(player1_def.main_body.axes[0].x * -jumpForceCoeff, -player1_def.main_body.axes[0].y * jumpForceCoeff);
    text('Key Pressed', (CANVAS_WIDTH / 2), CANVAS_HEIGHT/2);
    translate(player1_def.main_body.position.x, player1_def.main_body.position.y);
    strokeWeight(4);
    stroke(255, 255, 255);
    line(0, 0, jumpForceTest.x*1000, jumpForceTest.y*1000);
    pop();

    // TEST OF KICK ON PLAYER 1 DEF
    var kForce = Matter.Vector.create(player1_def.main_body.axes[1].x * -kForceCoeff, player1_def.main_body.axes[1].y * -kForceCoeff);
    if (player1_def.main_body.angle - player1_def.leg_body.angle <= PI/2) { // THIS LINE SEEMS TO WORK
      Body.applyForce(player1_def.leg_body, player1_def.leg_body.position, kForce);
      // DISPLAY DEBUG
      push();
      text('KICK', (CANVAS_WIDTH / 2), CANVAS_HEIGHT/4);
      translate(player1_def.leg_body.position.x, player1_def.leg_body.position.y);
      strokeWeight(4);
      stroke(50, 255, 55);
      line(0, 0, kForce.x*1000, kForce.y*1000);
      pop();
    }
  }

  if (keyIsDown(RIGHT_ARROW)) {
    // JUMP VECTOR
    /*push();
    var jumpForceTest = Matter.Vector.create(player2_def.main_body.axes[0].x * -jumpForceCoeff, -player2_def.main_body.axes[0].y * jumpForceCoeff);
    text('Key Pressed', (CANVAS_WIDTH / 2), CANVAS_HEIGHT/2);
    translate(player2_def.main_body.position.x, player2_def.main_body.position.y);
    strokeWeight(4);
    stroke(255, 255, 255);
    line(0, 0, jumpForceTest.x*1000, jumpForceTest.y*1000);
    pop();*/

    
    
  }

  if (keyIsDown(LEFT_ARROW)){
    // JUMP VECTOR
    push();
    var jumpForceTest2 = Matter.Vector.create(player2_atk.main_body.axes[0].x * -jumpForceCoeff, -player2_atk.main_body.axes[0].y * jumpForceCoeff);
    text('Key Pressed', (CANVAS_WIDTH / 2), CANVAS_HEIGHT/2);
    translate(player2_atk.main_body.position.x, player2_atk.main_body.position.y);
    strokeWeight(4);
    stroke(255, 255, 255);
    line(0, 0, jumpForceTest2.x*1000, jumpForceTest2.y*1000);
    pop();

    // KICK TEST
    // *****************************************************************************************************************
    // I HAVE AN IDEA FOR THE KICK FUNCTION : ADD A CONSTRAINT BETWEEN THE FIXED LEG AND THE BACK OF THE MOVABLE LEG !!!
    // *****************************************************************************************************************
    // Also, maybe add the possibility to set the stiffness of the leg / fixed leg to a low value when the key is pressed and then set it to a high value

    var kickForceX = -player2_atk.leg_body.axes[1].x; // BEWARE !!! THIS HAS TO HAVE A POSITIVE SIGN FOR THE PLAYER 1
    var kickForceY = -player2_atk.leg_body.axes[1].y; // BEWARE !!! THIS HAS TO HAVE A POSITIVE SIGN FOR THE PLAYER 1
    var kickForce = Matter.Vector.create(kickForceX * -0.03, kickForceY * -0.03);
    //if (player2_atk.leg_body.angle < (PI / 2) % (2 * PI)) {
    /*if (player2_atk.leg_body.angle < (PI / 2)) {
      Body.applyForce(player2_atk.leg_body, player2_atk.leg_body.position, kickForce);
    }*/
    Body.applyForce(player2_atk.leg_body, player2_atk.leg_body.position, kickForce);
    //player2_atk.kick();
    
    push();
    text('Key Pressed', (CANVAS_WIDTH / 2), CANVAS_HEIGHT/2);
    translate(player2_atk.leg_body.position.x, player2_atk.leg_body.position.y);
    strokeWeight(4);
    stroke(0);
    line(0, 0, kickForce.x*5000, kickForce.y*5000);
    pop();
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