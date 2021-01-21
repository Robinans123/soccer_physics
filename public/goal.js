// ************************************************
// Teugg Soccer Physics
// Rip-off of the once popular Soccer Physics game
// Horribly coded by : Kevin Le Teugg, 2020
// File : goal.js
// Description : Goal class used to define the player one and two goals
// ************************************************

function Goal(x, y, w, h, botW, topW, s) {
  var options = {
    collisionFilter: {
      category: generalCollCategory,
      mask: generalCollCategory
    },
    isStatic: true,
    angle: PI/100
  }

  // ATTRIBUTES
  this.x = x;
  this.y = y;
  this.w = w; // This is the width of the goal (from the edge of canvas to the entrance of the goal)
  this.h = h;
  this.botBarW = botW; // Thickness of the bottom bar of the goal
  this.topBarW = topW;
  this.s = s;
  this.top_x = x; // X-location of the top bar of the goal
  this.top_y = CANVAS_HEIGHT - h; // Y-location of the top bar of the goal

  // X-location of the bottom bar (depends if it is goal 1 or goal 2)
  if (s == true) {
    this.bot_x = x + w / 2; // Player 1 (left)
    this.bot_body_x = 0;
  }
  else {
    this.bot_x = CANVAS_WIDTH - w; // Player 2 (right)
    this.bot_body_x = CANVAS_WIDTH;
  }
  this.bot_y = y; // Y-location of the bottom part of the goal

  this.top_body = Bodies.rectangle(this.top_x, this.top_y, this.w, this.topBarW, options);

  // Adding the body to the world
  World.add(world,this.top_body);

  /*this.bot_body = Bodies.rectangle(this.bot_body_x, this.bot_y, this.botBarW, this.h, options);
  
  World.add(world,this.bot_body);*/

  // DRAWING FUNCTION
  this.show = function() {
    push();
    rectMode(CENTER);
    angleMode(RADIANS);
    noFill();
    fill(255);
    rotate(this.top_body.angle);
    rect(this.top_body.position.x, this.top_body.position.y, this.w, this.topBarW); // Drawing top bar of goal
    pop();

    push();
    rect(this.bot_x, this.bot_y, this.botBarW, this.h); // Drawing bottom bar of goal
    pop();
  }
}