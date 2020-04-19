function Goal(x, y, w, h, t, s) {
  // ATTRIBUTES
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.t = t; // Thickness of the bars of the goal
  this.top_x = x; // X-location of the top bar of the goal
  this.top_y = CANVAS_HEIGHT - h; // Y-location of the top bar of the goal
  // X-location of the side bar (depends if it is goal 1 or goal 2)
  if (s == true) {
    this.side_x = x + w / 2; // Player 1 (left)
  }
  else {
    this.side_x = CANVAS_WIDTH - w; // Player 2 (right)
  }
  this.side_y = y; // Y-location of the top bar of the goal

  // DRAWING FUNCTION
  this.show = function() {
    push();
    rectMode(CENTER);
    noFill();
    rect(this.x, this.y, this.w, this.h);
    fill(255);
    rect(this.top_x, this.top_y, this.w, this.t); // Drawing top of goal
    rect(this.side_x, this.side_y, this.t, this.h);
    pop();
  }

  // WORKS MORE OR LESS
  this.contact = function(ball) {
    if (this.top_x + (this.w/2) >= ball.x - (ball.diameter / 2) && // Right edge of goal vs. left "edge" of the ball
        this.top_x - (this.w/2) <= ball.x + (ball.diameter / 2) && // Left edge of goal vs. right "edge" of the ball
        this.top_y + (this.t/2) >= ball.y - (ball.diameter / 2) && // Bottom edge of goal vs. top "edge" of the ball
        this.top_y - (this.t/2) <= ball.y + (ball.diameter / 2))   // Top edge of goal vs. bottom "edge" of the ball
    {
      return true;
    }
      return false;
  }
}