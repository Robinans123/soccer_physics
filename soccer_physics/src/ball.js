function Ball(x, y, r) {
  // PHYSICS ENGINE OPTIONS
  var options = {
    friction: 0.01,
    restitution: 0.89,
    density: 0.00001
  }

  // ATTRIBUTES
  this.x = x;
  this.y = y;
  this.r = r;
  this.body = Bodies.circle(this.x, this.y, this.r, options);
  this.body.position.x = this.x;
  this.body.position.y = this.y;

  // Adding the body to the world
  World.add(world, this.body);

  // RESET FUNCTION FOR WHEN SOMEONE SCORE, THE BALL IS PUT IN THE CENTER AGAIN
  this.reset_loc = function() {
    var rand_ball_x;
    var rand_ball_y;
    var rand_ball_velocity_x;
    var rand_ball_velocity_y;
    var rand_ball_force_x;
    var rand_ball_force_y;
    rand_ball_x = random(((CANVAS_WIDTH / 2) - 100), ((CANVAS_WIDTH / 2) + 100));
    rand_ball_y = random(((CANVAS_HEIGHT / 2) - 50), ((CANVAS_HEIGHT / 2) + 50));
    rand_ball_velocity_x = 0;
    rand_ball_velocity_y = 0;
    rand_ball_force_x = 0
    rand_ball_force_y = 0;
    rand_ball_pos = Matter.Vector.create(rand_ball_x, rand_ball_y);
    rand_ball_velocity = Matter.Vector.create(rand_ball_velocity_x, rand_ball_velocity_y);
    rand_ball_force = Matter.Vector.create(rand_ball_force_x, rand_ball_force_y);
    
    Matter.Body.setPosition(ball.body, rand_ball_pos);
    Matter.Body.setVelocity(ball.body, rand_ball_velocity);
    Matter.Body.applyForce(ball.body, ball.body.position, rand_ball_force);
  }

  // DRAWING FUNCTION
  this.show = function() {
    // BALL DRAWING
    push();
    translate(this.body.position.x, this.body.position.y);
    rotate(this.body.angle);
    stroke(0, 0, 0);
    fill(255);
    ellipse(0, 0, (this.r) * 2, (this.r) * 2);
    // line((this.body.position.x) - this.r, this.body.position.y, (this.body.position.x + this.r), this.body.position.y);  
    pop();
  }
}