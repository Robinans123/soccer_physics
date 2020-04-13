function Player(x,y, xspeed, yspeed, xacc, yacc, w, h) {
  this.x = x;
  this.y = y;
  this.xspeed = xspeed;
  this.yspeed = yspeed;
  this.xacc = xacc;
  this.yacc = yacc;
  this.h = h;
  this.w = w;

  // UPDATE / PHYSICS FUNCTION
  this.update = function() {
    this.x = this.x + this.xspeed;
    this.y = this.y + this.yspeed;

    this.xspeed = this.xspeed + this.xacc;
    this.yspeed = this.yspeed + this.yacc;

    // COLLISION WITH CANVAS

    // PLAYER HITS RIGHT OF CANVAS
    if(this.x > (CANVAS_WIDTH - (this.w / 2) - 1)) {
      // This line is used in order to reposition the object, otherwise we cannot apply acceleration anymore
      this.x = CANVAS_WIDTH - (this.w / 2);
      // Collision with right side of canvas
      this.xspeed = this.xspeed * (GROUND_BOUNCE);
    }

    // BALL HITS LEFT OF CANVAS
    if(this.x < (this.w / 2)) {
      // This line is used in order to reposition the object, otherwise we cannot apply acceleration anymore
      this.x = (this.w / 2);
      // Collision with left side of canvas
      this.xspeed = this.xspeed * (GROUND_BOUNCE);
    }

    // BALL HITS BOTTOM OF CANVAS
    if(this.y > (CANVAS_HEIGHT - (this.h / 2))) {
      // This line is used in order to reposition the object, otherwise we cannot apply acceleration anymore
      this.y = CANVAS_HEIGHT - (this.h / 2);
      // Collision with ground
      this.yspeed = this.yspeed * (GROUND_BOUNCE);
      // Suppressing oscillations on the Y-axis (MAYBE ENCLOSE THIS -2 AS A DAMPENING CONSTANT)
      if(this.yspeed < 0 && this.yspeed > -2) {
        this.yspeed = 0;
      }
      // Suppressing oscillations on the X-axis (MAYBE ENCLOSE THIS 0.1 AS A DAMPENING CONSTANT)
      if(abs(this.xspeed) < 0.1){ 
        this.xspeed = 0;
      }
      // Friction
      if(this.xspeed > 0) {
        this.xspeed = this.xspeed - FRICTION_FORCE;
      }
      else if (this.xspeed < 0) {
        this.xspeed = this.xspeed + FRICTION_FORCE;
      }
      else {
        this.xspeed = 0;
      }
    }

    // PLAYER HITS TOP OF CANVAS - DEBUG
    /*if(this.y < (this.h / 2)) {
      this.yspeed = 0;
      this.y = (this.h / 2);
    }*/
  }

  this.jump = function() {
    //this.xacc = ?; this is going to be a challenge to code
    this.yacc = -1;
  }

  // Drawing function
  this.show = function() {
    rectMode(CENTER);
    fill(255);
    rect(this.x, this.y, this.w, this.h);

    // DEBUG VECTORS AND ANNOTATIONS
    line(this.x, this.y, (this.x + (this.xspeed * 15)), this.y);
    line(this.x, this.y, this.x, (this.y + (this.yspeed * 15)));
    textSize(10);
    fill(255, 0, 0);
    text('Xspeed' + ' : ' + this.xspeed, this.x + 20, this.y - 15);
    text('Yspeed' + ' : ' + this.yspeed, this.x + 20, this.y + 15);
    // DISPLAYING THE RESULTANT SPEED
    stroke(255, 0, 0);
    line(this.x, this.y, (this.x + (this.xspeed * 15)), (this.y + (this.yspeed * 15)));
  }
}