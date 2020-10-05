function Goal(x, y, w, h, t, s) {
  var options = {
    isStatic: true
  }
  // ATTRIBUTES
  this.x = x;
  this.y = y;
  this.w = w; // This is the width of the goal (from the edge of canvas to the entrance of the goal)
  this.h = h;
  this.t = t; // Thickness of the bars of the goal
  this.top_x = x; // X-location of the top bar of the goal
  this.top_y = CANVAS_HEIGHT - h; // Y-location of the top bar of the goal


  


  // X-location of the side bar (depends if it is goal 1 or goal 2)
  if (s == true) {
    this.bot_x = x + w / 2; // Player 1 (left)
    this.bot_body_x = 0;
  }
  else {
    this.bot_x = CANVAS_WIDTH - w; // Player 2 (right)
    this.bot_body_x = CANVAS_WIDTH;
  }
  this.bot_y = y; // Y-location of the bottom part of the goal

  this.top_body = Bodies.rectangle(this.top_x, this.top_y, this.w, this.t, options);

  // Adding the body to the world
  World.add(world,this.top_body);

  this.bot_body = Bodies.rectangle(this.bot_body_x, this.bot_y, this.t, this.h, options);
  
  World.add(world,this.bot_body);

  // DRAWING FUNCTION
  this.show = function() {
    push();
    rectMode(CENTER);
    noFill();
    rect(this.x, this.y, this.w, this.h);
    fill(255);
    rect(this.top_x, this.top_y, this.w, this.t); // Drawing top of goal
    rect(this.bot_x, this.bot_y, this.t, this.h); // Drawing entry of goal
    pop();
  }
}