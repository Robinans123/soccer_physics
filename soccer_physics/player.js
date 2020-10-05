function Player(main_x, main_y, main_w, main_h, leg_w, leg_h, s) {
  // TO DO : ADD THE LEG WITH A CONSTRAINT
  this.main_x = main_x;
  this.main_y = main_y;
  this.main_h = main_h;
  this.main_w = main_w;

  this.leg_x = 0;
  this.leg_y = 0;
  this.leg_w = leg_w;
  this.leg_h = leg_h;

  this.s = s; // Represents the side of the player (in which team he is)

  var cstr;

  var main_options = {
    friction: 0.8,
    restitution: 0.1,
    angle: 0
  }

  var leg_options = {
    friction: 0.8,
    restitution: 0.1,
    angle: 0
  }


  // Creating the main part of the player's body
  this.main_body = Bodies.rectangle(this.main_x, this.main_y, this.main_w, this.main_h, main_options);
  //this.main_body.position.x = this.main_x;
  //this.main_body.position.y = this.main_y;

  // Adding the main body to the world
  World.add(world,this.main_body);

  // Creating the leg of the player's body
  this.leg_x = this.main_body.position.x + (this.main_w / 2) + (this.leg_w / 2);
  this.leg_y = this.main_body.position.y + (this.main_h / 2) + (this.leg_h / 2);
  this.leg_body = Bodies.rectangle(this.leg_x, this.leg_y, this.leg_w, this.leg_h, leg_options);

  // Adding the main body to the world
  World.add(world,this.leg_body);

  // CREATING TWO VECTORS FOR EACH POINT OF THE CONSTRAINT 
  this.cstr_A = Matter.Vector.create((this.main_w / 2) + 1, (this.main_h / 2) + 1);
  this.cstr_B = Matter.Vector.create(-(this.leg_w / 2), -(this.leg_h / 2));

  // Creating options of constraint between main body and leg
  var cstr_options = {
    bodyA: this.main_body,
    bodyB: this.leg_body,
    pointA: this.cstr_A,
    pointB: this.cstr_B,
    length: 0,
    stiffness: 0.9,
    damping: 0
  }

  // Creating constraint between main body and leg
  this.cstr = Matter.Constraint.create(cstr_options);

  // Adding the constraint to the world
  World.add(world, this.cstr);

  // CREATING ANOTHER FIXED LEG

  var leg_fixed_options = {
    friction: 0.8,
    restitution: 0.1,
    angle: 0
  }

  this.leg_fixed_w = leg_w;
  this.leg_fixed_h = leg_h;
  this.leg_fixed_x = this.main_body.position.x - (this.main_w / 2) + (this.leg_fixed_w / 2);
  this.leg_fixed_y = this.main_body.position.y + (this.main_h / 2) + (this.leg_fixed_h / 2);
  this.leg_fixed_body = Bodies.rectangle(this.leg_fixed_x, this.leg_fixed_y, this.leg_fixed_w, this.leg_fixed_h, leg_fixed_options);

  World.add(world,this.leg_fixed_body);

  this.cstr_fixed_A = Matter.Vector.create(-(this.main_w / 2) - 1, (this.main_h / 2) + 1);
  this.cstr_fixed_B = Matter.Vector.create(-(this.leg_fixed_w / 2), -(this.leg_fixed_h / 2));

  var cstr_fixed_options = {
    bodyA: this.main_body,
    bodyB: this.leg_fixed_body,
    pointA: this.cstr_fixed_A,
    pointB: this.cstr_fixed_B,
    length: 1,
    stiffness: 0,
    damping: 0
  }

  this.cstr_fixed = Matter.Constraint.create(cstr_fixed_options);

  World.add(world, this.cstr_fixed);

  // GRAPHICS FUNCTION
  this.show = function() {
    // DRAWING MAIN BODY
    push();
    rectMode(CENTER);
    angleMode(RADIANS);
    translate(this.main_body.position.x, this.main_body.position.y);
    rotate(this.main_body.angle);
    stroke(0);
    fill(255);
    rect(0, 0, this.main_w, this.main_h);
    pop();
    // DRAWING LEG
    push();
    rectMode(CENTER);
    angleMode(RADIANS);
    translate(this.leg_body.position.x, this.leg_body.position.y);
    rotate(this.leg_body.angle);
    rect(0, 0, this.leg_w, this.leg_h);
    pop();
    /*// DRAWING POINT A OF CONSTRAINT
    push();
    strokeWeight(4);
    stroke(255, 0, 0);
    this.cstrAbs_Ax = this.main_body.position.x + this.cstr_A.x;
    this.cstrAbs_Ay = this.main_body.position.y + this.cstr_A.y;
    point(this.cstrAbs_Ax, this.cstrAbs_Ay);
    // DRAWING POINT B OF CONSTRAINT
    pop();
    push();
    strokeWeight(4);
    stroke(255, 0, 0);
    this.cstrAbs_Bx = this.leg_body.position.x + this.cstr_B.x;
    this.cstrAbs_By = this.leg_body.position.y + this.cstr_B.y;
    point(this.cstrAbs_Bx, this.cstrAbs_By);
    pop();*/
    // DRAWING FIXED LEG
    push();
    rectMode(CENTER);
    angleMode(RADIANS);
    translate(this.leg_fixed_body.position.x, this.leg_fixed_body.position.y);
    rotate(this.leg_fixed_body.angle);
    rect(0, 0, this.leg_fixed_w, this.leg_fixed_h);
    pop();


    push();
    strokeWeight(8);
    stroke(255, 0, 0);
    this.cstrAbs_fixed_Ax = this.main_body.position.x + this.cstr_fixed_A.x;
    this.cstrAbs_fixed_Ay = this.main_body.position.y + this.cstr_fixed_A.y;
    point(this.cstrAbs_fixed_Ax, this.cstrAbs_fixed_Ay);
    pop();

    push();
    strokeWeight(8);
    stroke(255, 255, 0);
    this.cstrAbs_fixed_Bx = this.leg_fixed_body.position.x + this.cstr_fixed_B.x;
    this.cstrAbs_fixed_By = this.leg_fixed_body.position.y + this.cstr_fixed_B.y;
    point(this.cstrAbs_fixed_Bx, this.cstrAbs_fixed_By);
    pop();
  }
}