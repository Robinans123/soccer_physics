function Ball(x,y, xspeed, yspeed, xacc, yacc, diameter) {
  // ATTRIBUTES
  this.x = x;
  this.y = y;
  this.xspeed = xspeed;
  this.yspeed = yspeed;
  this.xacc = xacc;
  this.yacc = yacc;
  this.diameter = diameter;

  // UPDATE / PHYSICS FUNCTION
  this.update = function() {
    this.x = this.x + this.xspeed;
    this.y = this.y + this.yspeed;

    this.xspeed = this.xspeed + this.xacc;
    this.yspeed = this.yspeed + this.yacc;

    // COLLISION WITH CANVAS

    // BALL HITS RIGHT OF CANVAS
    if (this.x > (CANVAS_WIDTH - (this.diameter / 2) - 1)) {
      // This line is used in order to reposition the ball, otherwise we cannot apply acceleration anymore
      this.x = CANVAS_WIDTH - (this.diameter / 2);
      // Collision with right side of canvas
      this.xspeed = this.xspeed * (GROUND_BOUNCE);
    }

    // BALL HITS LEFT OF CANVAS
    if (this.x < (this.diameter / 2)) {
      // This line is used in order to reposition the ball, otherwise we cannot apply acceleration anymore
      this.x = (this.diameter / 2);
      // Collision with left side of canvas
      this.xspeed = this.xspeed * (GROUND_BOUNCE);
    }

    // BALL HITS BOTTOM OF CANVAS
    if (this.y > (CANVAS_HEIGHT - (this.diameter / 2))) {
      // This line is used in order to reposition the ball, otherwise we cannot apply acceleration anymore
      this.y = CANVAS_HEIGHT - (this.diameter / 2);
      // Collision with ground
      this.yspeed = this.yspeed * (GROUND_BOUNCE);
      // Suppressing oscillations on the Y-axis (MAYBE ENCLOSE THIS -2 AS A DAMPENING CONSTANT)
      if (this.yspeed < 0 && this.yspeed > -2) {
        this.yspeed = 0;
      }
      // Suppressing oscillations on the X-axis (MAYBE ENCLOSE THIS 0.1 AS A DAMPENING CONSTANT)
      if (abs(this.xspeed) < 0.1){ 
        this.xspeed = 0;
      }
      // Friction
      if (this.xspeed > 0) {
        this.xspeed = this.xspeed - FRICTION_FORCE;
      }
      else if (this.xspeed < 0) {
        this.xspeed = this.xspeed + FRICTION_FORCE;
      }
      else {
        this.xspeed = 0;
      }
    }
  }

  // KICK FUNCTION - DEBUG OK
  this.kick = function() {
    this.yacc = -1;
  }

  // KICK FUNCTION - DEBUG OK
  this.kick_left = function() {
    this.xacc = -0.4;
  }

  // KICK FUNCTION - DEBUG OK
  this.kick_right = function() {
    this.xacc = 0.4;
  }

  // RESET FUNCTION FOR WHEN SOMEONE SCORE, THE BALL IS PUT IN THE CENTER AGAIN
  this.reset_loc = function() {
    this.x = random(((CANVAS_WIDTH / 2) - 100), ((CANVAS_WIDTH / 2) + 100));
    this.y = random(((CANVAS_HEIGHT / 2) - 50), ((CANVAS_HEIGHT / 2) + 50));
    this.xspeed = random(-10, 10);
    this.yspeed = 0;
    this.xacc = 0;
    this.yacc = GRAVITY;
  }

  // DRAWING FUNCTION
  this.show = function() {
    // BALL DRAWING
    stroke(0, 0, 0);
    fill(255);
    ellipse(this.x, this.y, this.diameter, this.diameter);

    // VELOCITY VECTORS AND ANNOTATIONS - DEBUG
    line(this.x, this.y, (this.x + (this.xspeed * 15)), this.y);
    line(this.x, this.y, this.x, (this.y + (this.yspeed * 15)));
    textSize(10);
    fill(255, 0, 0);
    text('Xspeed' + ' : ' + this.xspeed, this.x + 20, this.y - 15);
    text('Yspeed' + ' : ' + this.yspeed, this.x + 20, this.y + 15);

    // DISPLAYING THE RESULTANT SPEED - DEBUG
    stroke(255, 0, 0);
    line(this.x, this.y, (this.x + (this.xspeed * 15)), (this.y + (this.yspeed * 15)));
  }
}