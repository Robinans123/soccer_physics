function GameScore(ball, goal1, goal2) {

  this.score1 = 0;
  this.score2 = 0;

  this.scoreCheck = function(ball, goal1, goal2) {
    if (ball.body.position.x >= CANVAS_WIDTH - goal2.w && ball.body.position.y >= CANVAS_HEIGHT - goal2.h) {
      this.score1 = this.score1 + 1;
      ball.reset_loc();
    }
    if (ball.body.position.x <= goal1.w && ball.body.position.y >= CANVAS_HEIGHT - goal1.h) {
      this.score2 = this.score2 + 1;
      ball.reset_loc();
    }
  }

  // DRAWING FUNCTION
  this.show = function() {
    push();
    textSize(90);
    stroke(0, 0, 0);
    text(this.score1 + ' - ' + this.score2, (CANVAS_WIDTH / 2), 100);
    pop();
  }
}