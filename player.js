// ************************************************
// Teugg Soccer Physics
// Rip-off of the once popular Soccer Physics game
// Horribly coded by : Kevin Le Teugg, 2020
// File : player.js
// Description : Player class
// ************************************************

function Player(mainX, mainY, mainW, mainH, legW, legH, isPlayer1) {
  // TO DO : REFACTOR !!! AND ADD COMMENTS !!!
  // EXPLANATIONS OF THE PLAYER CLASS IS EXPLAINED AT THE BOTTOM OF THE CODE
  this.mainX = mainX;
  this.mainY = mainY;
  this.mainH = mainH;
  this.mainW = mainW;
  this.legW = legW;
  this.legH = legH;
  this.isPlayer1 = isPlayer1;
  this.legFixedW = legW;
  this.legFixedH = legH;
  this.footW = this.legW;
  this.footH = 8; // TO BE TUNED
  this.legX = 0;
  this.legY = 0;
  this.counterweightW = this.legFixedW + this.legW + this.footW;
  this.counterweightH = 4;
  this.absoluteAngle = 0;
  this.flipImageX = 0;

  // BODY -----------------------------------------------------------------------------------------------------------------------------------------------------------------
  // BODIES CREATION - OPTIONS
  // IMPORTANT NOTE : I THINK THAT THE DENSITY OF THE MAIN BODY MUST BE EQUIVALENT TO THE ONE OF THE MOVABLE LEG (VERY LIGHT)
  // 99% OF THE MASS SHOULD BE CONCENTRATED IN THE FIXED LEG (AND ALSO MAYBE A FRACTION OF THIS PERCENTAGE INTO THE FOOT)
  // HOWEVER, IT SEEMS THAT KEEPING DEFAULT VALUES WORKS MUCH BETTER
  var main_options = {
    friction: 0.8,
    restitution: 0.1,
    angle: 0,
    density: 0.001,
    collisionFilter: {
      category: generalCollCategory,
      mask: generalCollCategory | groundCollCategory
    }
  }

  var leg_options = {
    friction: 0.8,
    restitution: 0.1,
    angle: 0,
    density: 0.00002,
    collisionFilter: {
      category: generalCollCategory,
      mask: generalCollCategory | groundCollCategory
    }
  }

  var leg_fixed_options = {
    friction: 0.8,
    restitution: 0.1,
    angle: 0,
    density: 0.001,
    //inertia: 0.0001,
    //inverseInertia: 1/0.0001,
    collisionFilter: {
      category: generalCollCategory,
      mask: generalCollCategory | groundCollCategory
    }
  }

  var foot_options = {
    friction: 0.8,
    restitution: 0.1,
    angle: 0,
    density: 0.00005,
    collisionFilter: {
      category: generalCollCategory,
      mask: generalCollCategory | groundCollCategory
    }
  }

  var counterweight_options = {
    friction: 0.99,
    restitution: 0.1,
    angle: 0,
    density: 0.02,
    collisionFilter: {
      category: generalNoCollCategory,
      mask: groundCollCategory
    }
  }

  // BODIES CREATION - MAIN BODY
  this.main_body = Bodies.rectangle(this.mainX, this.mainY, this.mainW, this.mainH, main_options);
  World.add(world,this.main_body);

  // BODIES CREATION - LEG BODY
  if (this.isPlayer1) {
    this.legX = this.main_body.position.x + (this.mainW / 2) + (this.legW / 2);
    this.legY = this.main_body.position.y + (this.mainH / 2) + (this.legH / 2);
    this.leg_body = Bodies.rectangle(this.legX, this.legY, this.legW, this.legH, leg_options);
    World.add(world,this.leg_body);
  }
  else {
    this.legX = this.main_body.position.x - (this.mainW / 2) - (this.legW / 2);
    this.legY = this.main_body.position.y + (this.mainH / 2) + (this.legH / 2);
    this.leg_body = Bodies.rectangle(this.legX, this.legY, this.legW, this.legH, leg_options);
    World.add(world,this.leg_body);
  }
  

  // BODIES CREATION - FIXED LEG BODY
  if (this.isPlayer1) {
    this.leg_fixed_x = this.main_body.position.x - (this.mainW / 2) + (this.legFixedW / 2);
    this.leg_fixed_y = this.main_body.position.y + (this.mainH / 2) + (this.legFixedH / 2);
    this.leg_fixed_body = Bodies.rectangle(this.leg_fixed_x, this.leg_fixed_y, this.legFixedW, this.legFixedH, leg_fixed_options);
    World.add(world,this.leg_fixed_body);
  }
  else {
    this.leg_fixed_x = this.main_body.position.x + (this.mainW / 2) - (this.legFixedW / 2);
    this.leg_fixed_y = this.main_body.position.y + (this.mainH / 2) + (this.legFixedH / 2);
    this.leg_fixed_body = Bodies.rectangle(this.leg_fixed_x, this.leg_fixed_y, this.legFixedW, this.legFixedH, leg_fixed_options);
    World.add(world,this.leg_fixed_body);
  }


  // BODIES CREATION - FOOT BODY
  if (this.isPlayer1) {
    this.foot_x = this.leg_body.position.x + (this.legW / 2) + (this.footW / 2);
    this.foot_y = this.leg_body.position.y + (this.legH / 2) - (this.footH / 2);
    this.foot_body = Bodies.rectangle(this.foot_x, this.foot_y, this.footW, this.footH, foot_options);
    World.add(world, this.foot_body);
  }
  else {
    this.foot_x = this.leg_body.position.x - (this.legW / 2) - (this.footW / 2);
    this.foot_y = this.leg_body.position.y + (this.legH / 2) - (this.footH / 2);
    this.foot_body = Bodies.rectangle(this.foot_x, this.foot_y, this.footW, this.footH, foot_options);
    World.add(world, this.foot_body);
  }

  // BODIES CREATION - COUNTERWEIGHT BODY (counterweight that will be put under the player)
  this.counterweight_x = this.leg_fixed_body.position.x + (this.legFixedW / 2);
  this.counterweight_y = this.leg_fixed_body.position.y + (this.legFixedH / 2) + (this.counterweightH / 2);
  // MAYBE MAKE THE COUNTERWEIGHT A LITTLE BIT WIDER, FOR NOW IT IS WIDTH OF LEG + WIDTH OF FIXED LEG
  this.counterweight_body = Bodies.rectangle(this.counterweight_x, this.counterweight_y, this.counterweightW, this.counterweightH, counterweight_options);
  World.add(world, this.counterweight_body);

  // CONSTRAINTS -----------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // CONSTRAINTS CREATION - CONSTRAINT BETWEEN MAIN BODY AND LEG BODY
  // Creating two vectors for each point of the constraint
  if (this.isPlayer1) {
    this.cstr_A = Matter.Vector.create((this.mainW / 2) + 1, (this.mainH / 2) + 1);
    this.cstr_B = Matter.Vector.create((this.legW / 2), -(this.legH / 2));
  }
  else {
    this.cstr_A = Matter.Vector.create(-(this.mainW / 2) - 1, (this.mainH / 2) + 1);
    this.cstr_B = Matter.Vector.create(-(this.legW / 2), -(this.legH / 2));
  }
  

  // Creating options of constraint between main body and leg
  var cstr_options = {
    bodyA: this.main_body,
    bodyB: this.leg_body,
    pointA: this.cstr_A,
    pointB: this.cstr_B,
    length: 0,
    stiffness: 0.9,
    damping: 0,
  }
  this.cstr = Matter.Constraint.create(cstr_options); // Creating constraint between main body and leg
  World.add(world, this.cstr); // Adding the constraint to the world

  // CONSTRAINTS CREATION - CONSTRAINTS BETWEEN MAIN BODY AND FIXED LEG BODY

  // TO BE FIXED !!!!
  if (this.isPlayer1) {
    this.cstr_fixed_A = Matter.Vector.create(-(this.mainW / 2) - 1, (this.mainH / 2) + 1); // Bottom left of main body
    this.cstr_fixed_B = Matter.Vector.create(-(this.legFixedW / 2), -(this.legFixedH / 2));
    this.cstr_fixed2_A = Matter.Vector.create(-(this.mainW / 2) + (this.legFixedW) - 1, (this.mainH / 2) + 1);
    this.cstr_fixed2_B = Matter.Vector.create((this.legFixedW / 2), -(this.legFixedH / 2));
  }
  else {
    this.cstr_fixed_A = Matter.Vector.create((this.mainW / 2) + 1, (this.mainH / 2) + 1); // Bottom right of main body
    this.cstr_fixed_B = Matter.Vector.create((this.legFixedW / 2), -(this.legFixedH / 2));
    this.cstr_fixed2_A = Matter.Vector.create((this.mainW / 2) - (this.legFixedW) + 1, (this.mainH / 2) + 1);
    this.cstr_fixed2_B = Matter.Vector.create(-(this.legFixedW / 2), -(this.legFixedH / 2));
  }
  

  var cstr_fixed_options = {
    bodyA: this.main_body,
    bodyB: this.leg_fixed_body,
    pointA: this.cstr_fixed_A,
    pointB: this.cstr_fixed_B,
    length: 1,
    stiffness: 0,
    damping: 0
  }

  var cstr_fixed2_options = {
    bodyA: this.main_body,
    bodyB: this.leg_fixed_body,
    pointA: this.cstr_fixed2_A,
    pointB: this.cstr_fixed2_B,
    length: 1,
    stiffness: 0,
    damping: 0
  }
  this.cstr_fixed = Matter.Constraint.create(cstr_fixed_options);
  this.cstr_fixed2 = Matter.Constraint.create(cstr_fixed2_options);
  World.add(world, this.cstr_fixed);
  World.add(world, this.cstr_fixed2);

  // CONSTRAINTS CREATION - CONSTRAINTS BETWEEN LEG BODY AND FOOT BODY
  if (this.isPlayer1) {
    this.cstr_foot_A = Matter.Vector.create((this.legW / 2) + 1, (this.legH / 2) + 1);
    this.cstr_foot_B = Matter.Vector.create(-(this.footW / 2), (this.footH / 2));
    this.cstr_foot2_A = Matter.Vector.create((this.legW / 2) + 1, (this.legH / 2) - this.footH + 1);
    this.cstr_foot2_B = Matter.Vector.create(-(this.footW / 2), -(this.footH / 2));
  }
  else {
    this.cstr_foot_A = Matter.Vector.create(-(this.legW / 2) - 1, (this.legH / 2) + 1);
    this.cstr_foot_B = Matter.Vector.create((this.footW / 2), (this.footH / 2));
    this.cstr_foot2_A = Matter.Vector.create(-(this.legW / 2) - 1, (this.legH / 2) - this.footH + 1);
    this.cstr_foot2_B = Matter.Vector.create((this.footW / 2), -(this.footH / 2));
  }
  
  var cstr_foot_options = {
    bodyA: this.leg_body,
    bodyB: this.foot_body,
    pointA: this.cstr_foot_A,
    pointB: this.cstr_foot_B,
    length: 0,
    stiffness: 0.99,
    damping: 0
  }

  var cstr_foot2_options = {
    bodyA: this.leg_body,
    bodyB: this.foot_body,
    pointA: this.cstr_foot2_A,
    pointB: this.cstr_foot2_B,
    length: 1,
    stiffness: 0.99,
    damping: 0
  }

  this.cstr_foot = Matter.Constraint.create(cstr_foot_options);
  this.cstr_foot2 = Matter.Constraint.create(cstr_foot2_options);

  World.add(world, this.cstr_foot);
  World.add(world, this.cstr_foot2);

  // CONSTRAINTS CREATION - CONSTRAINT BETWEEN LEG BODY AND FIXED LEG BODY
  if (this.isPlayer1) {
    this.cstr_legs_A = Matter.Vector.create(-(this.legW / 2) - 1, -(this.legH / 2) + 1);
    this.cstr_legs_B = Matter.Vector.create((this.legFixedW / 2), -(this.legFixedH / 2));
  }
  else {
    this.cstr_legs_A = Matter.Vector.create((this.legW / 2) + 1, -(this.legH / 2) + 1);
    this.cstr_legs_B = Matter.Vector.create(-(this.legFixedW / 2), -(this.legFixedH / 2));
  }

  this.cstrLegsLength = 2;

  var cstr_legs_options = {
    bodyA: this.leg_body,
    bodyB: this.leg_fixed_body,
    pointA: this.cstr_legs_A,
    pointB: this.cstr_legs_B,
    length: this.cstrLegsLength, // Options to be tweaked
    stiffness: 0.06, // Options to be tweaked
    damping: 0.01 // Options to be tweaked
  }

  this.cstr_legs = Matter.Constraint.create(cstr_legs_options);

  World.add(world, this.cstr_legs);

  // CONSTRAINTS CREATION - CONSTRAINTS BETWEEN COUNTERWEIGHT BODY AND LEG FIXED BODY
  if (this.isPlayer1) {
    this.cstr_counterweight_A = Matter.Vector.create(-(this.legFixedW / 2), (this.legFixedH / 2));
    this.cstr_counterweight_B = Matter.Vector.create(-(this.counterweightW / 2), -(this.counterweightH / 2));
    this.cstr_counterweight2_A = Matter.Vector.create((this.legFixedW / 2), (this.legFixedH / 2));
    this.cstr_counterweight2_B = Matter.Vector.create(-(this.counterweightW / 2) + this.legFixedW, -(this.counterweightH / 2));
  }
  else {
    this.cstr_counterweight_A = Matter.Vector.create((this.legFixedW / 2), (this.legFixedH / 2));
    this.cstr_counterweight_B = Matter.Vector.create((this.counterweightW / 2), -(this.counterweightH / 2));
    this.cstr_counterweight2_A = Matter.Vector.create(-(this.legFixedW / 2), (this.legFixedH / 2));
    this.cstr_counterweight2_B = Matter.Vector.create((this.counterweightW / 2) - this.legFixedW, -(this.counterweightH / 2));
  }
  
  var cstr_counterweight_options = {
    bodyA: this.leg_fixed_body,
    bodyB: this.counterweight_body,
    pointA: this.cstr_counterweight_A,
    pointB: this.cstr_counterweight_B,
    length: 0,
    stiffness: 0.99,
    damping: 0
  }

  var cstr_counterweight2_options = {
    bodyA: this.leg_fixed_body,
    bodyB: this.counterweight_body,
    pointA: this.cstr_counterweight2_A,
    pointB: this.cstr_counterweight2_B,
    length: 0,
    stiffness: 0.99,
    damping: 0
  }

  this.cstr_counterweight = Matter.Constraint.create(cstr_counterweight_options);
  this.cstr_counterweight2 = Matter.Constraint.create(cstr_counterweight2_options);

  World.add(world, this.cstr_counterweight);
  World.add(world, this.cstr_counterweight2);

  // --------------------------------------------------------------------------------------------------------------------------------------
  // CLASS METHODS ------------------------------------------------------------------------------------------------------------------------
  // --------------------------------------------------------------------------------------------------------------------------------------

  // Jump function - OK
  this.jump = function() {
    var jumpForceTest = Matter.Vector.create(this.main_body.axes[0].x * -jumpForceCoeff, -this.main_body.axes[0].y * jumpForceCoeff);
    Body.applyForce(this.main_body, this.main_body.position, jumpForceTest);
  }

  // Kick function - WORKING MORE OR LESS - CAN BE REFACTORED
  this.kick = function(coeff) {
    if (this.isPlayer1) {
      var kickForce = Matter.Vector.create(this.main_body.axes[1].x * -coeff, this.main_body.axes[1].y * -coeff);
      if (this.absoluteAngle + this.leg_body.angle <= PI/2) {
        Body.applyForce(this.leg_body, this.leg_body.position, kickForce);
      }
      else {
        Body.setAngle(this.leg_body, this.absoluteAngle);
      }
    }
    else {
      var kickForce = Matter.Vector.create(-this.main_body.axes[1].x * -coeff, -this.main_body.axes[1].y * -coeff);
      if (this.absoluteAngle - this.leg_body.angle <= PI/2) {
        Body.applyForce(this.leg_body, this.leg_body.position, kickForce);
      }
      else {
        Body.setAngle(this.leg_body, this.absoluteAngle);
      }
    }
  }

  // Returns True if player is on ground
  this.isOnGround = function(ground) {
    mainBodyGroundColl = Matter.SAT.collides(this.main_body, ground.body);
    legFixedBodyGroundColl = Matter.SAT.collides(this.leg_fixed_body, ground.body);
    legBodyGroundColl = Matter.SAT.collides(this.leg_body, ground.body);
    footBodyGroundColl = Matter.SAT.collides(this.foot_body, ground.body);
    counterweightBodyGroundColl = Matter.SAT.collides(this.counterweight_body, ground.body);

    isMainBodyOnGround = mainBodyGroundColl.collided;
    isLegFixedBodyOnGround = legFixedBodyGroundColl.collided;
    isLegBodyOnGround = legBodyGroundColl.collided;
    isFootBodyOnGround = footBodyGroundColl.collided;
    isCounterweightBodyOnGround = counterweightBodyGroundColl.collided;

    isPlayerOnGround = isMainBodyOnGround || isLegFixedBodyOnGround || isLegBodyOnGround || isFootBodyOnGround || isCounterweightBodyOnGround;

    return isPlayerOnGround;
  }

  // Getting the absolute angle of the player, the angle the body of the player makes with...
  // ... the perpendicular to the ground (angle bound between -PI and PI) -> OK IT IS WORKING BUT CAN BE REFACTORED
  this.updateAbsoluteAngle = function() {
    // FIRST QUADRANT [0 ... +90°[
    if (Math.sin(this.main_body.angle) > 0 && Math.cos(this.main_body.angle) > 0){
      if (this.main_body.angle >= 0){
        this.absoluteAngle = this.main_body.angle % (2 * PI);
      }
      else {
        this.absoluteAngle = (2 * PI) + (this.main_body.angle % (2 * PI));
      }
    }
    // SECOND QUADRANT ]0 ... -90°]
    if (Math.sin(this.main_body.angle) < 0 && Math.cos(this.main_body.angle) > 0){
      if (this.main_body.angle < 0){
        this.absoluteAngle = this.main_body.angle % (2 * PI);
      }
      else {
        this.absoluteAngle = (this.main_body.angle % (2 * PI)) - (2 * PI);
      }
    }
    // THIRD QUADRANT ]-90 ... -180°]
    if (Math.sin(this.main_body.angle) < 0 && Math.cos(this.main_body.angle) < 0){
      if (this.main_body.angle <= 0){
        this.absoluteAngle = this.main_body.angle % (2 * PI);
      }
      else {
        this.absoluteAngle = (this.main_body.angle % (2 * PI)) - (2 * PI);
      }
    }
    // FOURTH QUADRANT [+90 ... +180°[
    if (Math.sin(this.main_body.angle) > 0 && Math.cos(this.main_body.angle) < 0){
      if (this.main_body.angle > 0){
        this.absoluteAngle = this.main_body.angle % (2 * PI);
      }
      else {
        this.absoluteAngle = (2 * PI) + this.main_body.angle % (2 * PI);
      }
    }
  }

  this.uprightTilt = function() {
    var tiltForce = Matter.Vector.create(this.main_body.axes[1].x * -tiltForceCoeff, -this.main_body.axes[1].y * tiltForceCoeff);
    if ((this.absoluteAngle) >= PI/5) {
      Body.applyForce(this.main_body, this.main_body.position, Matter.Vector.neg(tiltForce));
    }
    if ((this.absoluteAngle) <= -PI/5) {
      Body.applyForce(this.main_body, this.main_body.position, tiltForce);
    }
    else {
      // Reset applied force when angle of player is enough to keep him upright
      Body.applyForce(this.main_body, this.main_body.position, Matter.Vector.create(0,0));
    }
  }

  // Graphics function
  this.show = function() {
    if (this.isPlayer1) {
      this.flipImageX = 1;
    }
    else {
      this.flipImageX = -1;
    }
    // DRAWING MAIN BODY
    push();
    rectMode(CENTER);
    angleMode(RADIANS);
    translate(this.main_body.position.x, this.main_body.position.y);
    rotate(this.main_body.angle);
    stroke(0);
    fill(255);
    scale(this.flipImageX, 1);
    image(spritePlayerMainBody0, -this.mainW / 2, -this.mainH / 2,  this.mainW, this.mainH);
    pop();
    
    // DRAWING LEG
    push();
    rectMode(CENTER);
    angleMode(RADIANS);
    translate(this.leg_body.position.x, this.leg_body.position.y);
    rotate(this.leg_body.angle);
    fill(255);
    scale(this.flipImageX, 1);
    image(spritePlayerLeg0, -this.legW / 2, -this.legH / 2,  this.legW, this.legH);
    pop();

    // DRAWING FIXED LEG
    push();
    rectMode(CENTER);
    angleMode(RADIANS);
    translate(this.leg_fixed_body.position.x, this.leg_fixed_body.position.y);
    rotate(this.leg_fixed_body.angle);
    fill(255);
    scale(this.flipImageX, 1);
    image(spritePlayerLeg0, -this.legFixedW / 2, -this.legFixedH / 2,  this.legFixedW, this.legFixedH);
    pop();

    // DRAWING FOOT
    push();
    fill(255);
    rectMode(CENTER);
    angleMode(RADIANS);
    translate(this.foot_body.position.x, this.foot_body.position.y);
    rotate(this.foot_body.angle);
    rect(0, 0, this.footW, this.footH);
    pop();
  }
}
// EXPLANATIONS
// Player is comprised of :
// - Main body
// - Leg body (the movable leg)
// - Fixed leg body
// - Foot body