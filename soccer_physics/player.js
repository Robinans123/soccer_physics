function Player(x,y, xspeed, yspeed, xacc, yacc, w, h) {
  this.x = x;
  this.y = y;
  this.xspeed = xspeed;
  this.yspeed = yspeed;
  this.xacc = xacc;
  this.yacc = yacc;
  this.h = h;
  this.w = w;
  this.tilt = 0;

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

    // PLAYER HITS LEFT OF CANVAS
    if(this.x < (this.w / 2)) {
      // This line is used in order to reposition the object, otherwise we cannot apply acceleration anymore
      this.x = (this.w / 2);
      // Collision with left side of canvas
      this.xspeed = this.xspeed * (GROUND_BOUNCE);
    }

    // PLAYER HITS BOTTOM OF CANVAS
    if(this.y > (CANVAS_HEIGHT - (this.h / 2))) {
      this.xspeed = 0;
      this.yspeed = 0;
      // This line is used in order to reposition the object, otherwise we cannot apply acceleration anymore
      this.y = CANVAS_HEIGHT - (this.h / 2);
    }

    // PLAYER HITS TOP OF CANVAS - DEBUG
    /*if(this.y < (this.h / 2)) {
      this.yspeed = 0;
      this.y = (this.h / 2);
    }*/
  }

  // BASIC COLLISION ALGORITHM
  this.contact = function(ball) {
    if (this.x + (this.w/2) >= ball.x - (ball.diameter / 2) && // Right edge of player vs. left "edge" of the ball
        this.x - (this.w/2) <= ball.x + (ball.diameter / 2) && // Left edge of player vs. right "edge" of the ball
        this.y + (this.h/2) >= ball.y - (ball.diameter / 2) && // Bottom edge of player vs. top "edge" of the ball
        this.y - (this.h/2) <= ball.y + (ball.diameter / 2))   // Top edge of player vs. bottom "edge" of the ball
    {
      return true;
    }
      return false;
  }

  this.jump = function() {
    //this.xacc = ?; this is going to be a challenge to code
    this.yacc = -1;
  }

  // DRAWING FUNCTION
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