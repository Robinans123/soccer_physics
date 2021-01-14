// ************************************************
// Teugg Soccer Physics
// Rip-off of the once popular Soccer Physics game
// Horribly coded by : Kevin Le Teugg, 2020
// File : game_score.js
// Description : Game score class used for keeping track of the score
// ************************************************

function GameScore(ball, goal1, goal2) {

  // ATTRIBUTES
  this.score1 = 0;
  this.score2 = 0;

  // METHODS
  this.scoreCheck = function(ball, goal1, goal2) {
    // Player 1 scores
    if (ball.body.position.x >= CANVAS_WIDTH - goal2.w && ball.body.position.y >= CANVAS_HEIGHT - goal2.h) {
      this.score1 = this.score1 + 1;
      Matter.World.remove(world, player1Def.main_body);
      Matter.World.remove(world, player1Def.leg_body);
      Matter.World.remove(world, player1Def.leg_fixed_body);
      Matter.World.remove(world, player1Def.foot_body);
      Matter.World.remove(world, player1Def.counterweight_body);
      Matter.World.remove(world, player1Def.cstr);
      Matter.World.remove(world, player1Def.cstr_fixed);
      Matter.World.remove(world, player1Def.cstr_fixed2);
      Matter.World.remove(world, player1Def.cstr_foot);
      Matter.World.remove(world, player1Def.cstr_foot2);
      Matter.World.remove(world, player1Def.cstr_legs);
      Matter.World.remove(world, player1Def.cstr_counterweight);
      Matter.World.remove(world, player1Def.cstr_counterweight2);

      Matter.World.remove(world, player1Atk.main_body);
      Matter.World.remove(world, player1Atk.leg_body);
      Matter.World.remove(world, player1Atk.leg_fixed_body);
      Matter.World.remove(world, player1Atk.foot_body);
      Matter.World.remove(world, player1Atk.counterweight_body);
      Matter.World.remove(world, player1Atk.cstr);
      Matter.World.remove(world, player1Atk.cstr_fixed);
      Matter.World.remove(world, player1Atk.cstr_fixed2);
      Matter.World.remove(world, player1Atk.cstr_foot);
      Matter.World.remove(world, player1Atk.cstr_foot2);
      Matter.World.remove(world, player1Atk.cstr_legs);
      Matter.World.remove(world, player1Atk.cstr_counterweight);
      Matter.World.remove(world, player1Atk.cstr_counterweight2);

      Matter.World.remove(world, player2Atk.main_body);
      Matter.World.remove(world, player2Atk.leg_body);
      Matter.World.remove(world, player2Atk.leg_fixed_body);
      Matter.World.remove(world, player2Atk.foot_body);
      Matter.World.remove(world, player2Atk.counterweight_body);
      Matter.World.remove(world, player2Atk.cstr);
      Matter.World.remove(world, player2Atk.cstr_fixed);
      Matter.World.remove(world, player2Atk.cstr_fixed2);
      Matter.World.remove(world, player2Atk.cstr_foot);
      Matter.World.remove(world, player2Atk.cstr_foot2);
      Matter.World.remove(world, player2Atk.cstr_legs);
      Matter.World.remove(world, player2Atk.cstr_counterweight);
      Matter.World.remove(world, player2Atk.cstr_counterweight2);

      Matter.World.remove(world, player2Def.main_body);
      Matter.World.remove(world, player2Def.leg_body);
      Matter.World.remove(world, player2Def.leg_fixed_body);
      Matter.World.remove(world, player2Def.foot_body);
      Matter.World.remove(world, player2Def.counterweight_body);
      Matter.World.remove(world, player2Def.cstr);
      Matter.World.remove(world, player2Def.cstr_fixed);
      Matter.World.remove(world, player2Def.cstr_fixed2);
      Matter.World.remove(world, player2Def.cstr_foot);
      Matter.World.remove(world, player2Def.cstr_foot2);
      Matter.World.remove(world, player2Def.cstr_legs);
      Matter.World.remove(world, player2Def.cstr_counterweight);
      Matter.World.remove(world, player2Def.cstr_counterweight2);

      player1Def = new Player(player1DefStartPosX, player1DefStartPosY, playerWidth, playerHeight, playerLegWidth, playerLegHeight, true);
      player1Atk = new Player(player1AtkStartPosX, player1AtkStartPosY, playerWidth, playerHeight, playerLegWidth, playerLegHeight, true);
      player2Atk = new Player(player2AtkStartPosX, player2AtkStartPosY, playerWidth, playerHeight, playerLegWidth, playerLegHeight, false);
      player2Def = new Player(player2DefStartPosX, player2DefStartPosY, playerWidth, playerHeight, playerLegWidth, playerLegHeight, false);
      ball.reset_loc();
    }
    else if (ball.body.position.x >= CANVAS_WIDTH + ball.r) {
      // Ball is out of right of canvas
      Matter.World.remove(world, player1Def.main_body);
      Matter.World.remove(world, player1Def.leg_body);
      Matter.World.remove(world, player1Def.leg_fixed_body);
      Matter.World.remove(world, player1Def.foot_body);
      Matter.World.remove(world, player1Def.counterweight_body);
      Matter.World.remove(world, player1Def.cstr);
      Matter.World.remove(world, player1Def.cstr_fixed);
      Matter.World.remove(world, player1Def.cstr_fixed2);
      Matter.World.remove(world, player1Def.cstr_foot);
      Matter.World.remove(world, player1Def.cstr_foot2);
      Matter.World.remove(world, player1Def.cstr_legs);
      Matter.World.remove(world, player1Def.cstr_counterweight);
      Matter.World.remove(world, player1Def.cstr_counterweight2);

      Matter.World.remove(world, player1Atk.main_body);
      Matter.World.remove(world, player1Atk.leg_body);
      Matter.World.remove(world, player1Atk.leg_fixed_body);
      Matter.World.remove(world, player1Atk.foot_body);
      Matter.World.remove(world, player1Atk.counterweight_body);
      Matter.World.remove(world, player1Atk.cstr);
      Matter.World.remove(world, player1Atk.cstr_fixed);
      Matter.World.remove(world, player1Atk.cstr_fixed2);
      Matter.World.remove(world, player1Atk.cstr_foot);
      Matter.World.remove(world, player1Atk.cstr_foot2);
      Matter.World.remove(world, player1Atk.cstr_legs);
      Matter.World.remove(world, player1Atk.cstr_counterweight);
      Matter.World.remove(world, player1Atk.cstr_counterweight2);

      Matter.World.remove(world, player2Atk.main_body);
      Matter.World.remove(world, player2Atk.leg_body);
      Matter.World.remove(world, player2Atk.leg_fixed_body);
      Matter.World.remove(world, player2Atk.foot_body);
      Matter.World.remove(world, player2Atk.counterweight_body);
      Matter.World.remove(world, player2Atk.cstr);
      Matter.World.remove(world, player2Atk.cstr_fixed);
      Matter.World.remove(world, player2Atk.cstr_fixed2);
      Matter.World.remove(world, player2Atk.cstr_foot);
      Matter.World.remove(world, player2Atk.cstr_foot2);
      Matter.World.remove(world, player2Atk.cstr_legs);
      Matter.World.remove(world, player2Atk.cstr_counterweight);
      Matter.World.remove(world, player2Atk.cstr_counterweight2);

      Matter.World.remove(world, player2Def.main_body);
      Matter.World.remove(world, player2Def.leg_body);
      Matter.World.remove(world, player2Def.leg_fixed_body);
      Matter.World.remove(world, player2Def.foot_body);
      Matter.World.remove(world, player2Def.counterweight_body);
      Matter.World.remove(world, player2Def.cstr);
      Matter.World.remove(world, player2Def.cstr_fixed);
      Matter.World.remove(world, player2Def.cstr_fixed2);
      Matter.World.remove(world, player2Def.cstr_foot);
      Matter.World.remove(world, player2Def.cstr_foot2);
      Matter.World.remove(world, player2Def.cstr_legs);
      Matter.World.remove(world, player2Def.cstr_counterweight);
      Matter.World.remove(world, player2Def.cstr_counterweight2);

      player1Def = new Player(player1DefStartPosX, player1DefStartPosY, playerWidth, playerHeight, playerLegWidth, playerLegHeight, true);
      player1Atk = new Player(player1AtkStartPosX, player1AtkStartPosY, playerWidth, playerHeight, playerLegWidth, playerLegHeight, true);
      player2Atk = new Player(player2AtkStartPosX, player2AtkStartPosY, playerWidth, playerHeight, playerLegWidth, playerLegHeight, false);
      player2Def = new Player(player2DefStartPosX, player2DefStartPosY, playerWidth, playerHeight, playerLegWidth, playerLegHeight, false);
      ball.reset_loc();
    }
    // Player 2 scores
    if (ball.body.position.x <= goal1.w && ball.body.position.y >= CANVAS_HEIGHT - goal1.h) {
      this.score2 = this.score2 + 1;
      Matter.World.remove(world, player1Def.main_body);
      Matter.World.remove(world, player1Def.leg_body);
      Matter.World.remove(world, player1Def.leg_fixed_body);
      Matter.World.remove(world, player1Def.foot_body);
      Matter.World.remove(world, player1Def.counterweight_body);
      Matter.World.remove(world, player1Def.cstr);
      Matter.World.remove(world, player1Def.cstr_fixed);
      Matter.World.remove(world, player1Def.cstr_fixed2);
      Matter.World.remove(world, player1Def.cstr_foot);
      Matter.World.remove(world, player1Def.cstr_foot2);
      Matter.World.remove(world, player1Def.cstr_legs);
      Matter.World.remove(world, player1Def.cstr_counterweight);
      Matter.World.remove(world, player1Def.cstr_counterweight2);

      Matter.World.remove(world, player1Atk.main_body);
      Matter.World.remove(world, player1Atk.leg_body);
      Matter.World.remove(world, player1Atk.leg_fixed_body);
      Matter.World.remove(world, player1Atk.foot_body);
      Matter.World.remove(world, player1Atk.counterweight_body);
      Matter.World.remove(world, player1Atk.cstr);
      Matter.World.remove(world, player1Atk.cstr_fixed);
      Matter.World.remove(world, player1Atk.cstr_fixed2);
      Matter.World.remove(world, player1Atk.cstr_foot);
      Matter.World.remove(world, player1Atk.cstr_foot2);
      Matter.World.remove(world, player1Atk.cstr_legs);
      Matter.World.remove(world, player1Atk.cstr_counterweight);
      Matter.World.remove(world, player1Atk.cstr_counterweight2);

      Matter.World.remove(world, player2Atk.main_body);
      Matter.World.remove(world, player2Atk.leg_body);
      Matter.World.remove(world, player2Atk.leg_fixed_body);
      Matter.World.remove(world, player2Atk.foot_body);
      Matter.World.remove(world, player2Atk.counterweight_body);
      Matter.World.remove(world, player2Atk.cstr);
      Matter.World.remove(world, player2Atk.cstr_fixed);
      Matter.World.remove(world, player2Atk.cstr_fixed2);
      Matter.World.remove(world, player2Atk.cstr_foot);
      Matter.World.remove(world, player2Atk.cstr_foot2);
      Matter.World.remove(world, player2Atk.cstr_legs);
      Matter.World.remove(world, player2Atk.cstr_counterweight);
      Matter.World.remove(world, player2Atk.cstr_counterweight2);

      Matter.World.remove(world, player2Def.main_body);
      Matter.World.remove(world, player2Def.leg_body);
      Matter.World.remove(world, player2Def.leg_fixed_body);
      Matter.World.remove(world, player2Def.foot_body);
      Matter.World.remove(world, player2Def.counterweight_body);
      Matter.World.remove(world, player2Def.cstr);
      Matter.World.remove(world, player2Def.cstr_fixed);
      Matter.World.remove(world, player2Def.cstr_fixed2);
      Matter.World.remove(world, player2Def.cstr_foot);
      Matter.World.remove(world, player2Def.cstr_foot2);
      Matter.World.remove(world, player2Def.cstr_legs);
      Matter.World.remove(world, player2Def.cstr_counterweight);
      Matter.World.remove(world, player2Def.cstr_counterweight2);

      player1Def = new Player(player1DefStartPosX, player1DefStartPosY, playerWidth, playerHeight, playerLegWidth, playerLegHeight, true);
      player1Atk = new Player(player1AtkStartPosX, player1AtkStartPosY, playerWidth, playerHeight, playerLegWidth, playerLegHeight, true);
      player2Atk = new Player(player2AtkStartPosX, player2AtkStartPosY, playerWidth, playerHeight, playerLegWidth, playerLegHeight, false);
      player2Def = new Player(player2DefStartPosX, player2DefStartPosY, playerWidth, playerHeight, playerLegWidth, playerLegHeight, false);
      ball.reset_loc();
    }
    else if (ball.body.position.x <= 0 - ball.r) {
      // Ball is out of left of canvas
      Matter.World.remove(world, player1Def.main_body);
      Matter.World.remove(world, player1Def.leg_body);
      Matter.World.remove(world, player1Def.leg_fixed_body);
      Matter.World.remove(world, player1Def.foot_body);
      Matter.World.remove(world, player1Def.counterweight_body);
      Matter.World.remove(world, player1Def.cstr);
      Matter.World.remove(world, player1Def.cstr_fixed);
      Matter.World.remove(world, player1Def.cstr_fixed2);
      Matter.World.remove(world, player1Def.cstr_foot);
      Matter.World.remove(world, player1Def.cstr_foot2);
      Matter.World.remove(world, player1Def.cstr_legs);
      Matter.World.remove(world, player1Def.cstr_counterweight);
      Matter.World.remove(world, player1Def.cstr_counterweight2);

      Matter.World.remove(world, player1Atk.main_body);
      Matter.World.remove(world, player1Atk.leg_body);
      Matter.World.remove(world, player1Atk.leg_fixed_body);
      Matter.World.remove(world, player1Atk.foot_body);
      Matter.World.remove(world, player1Atk.counterweight_body);
      Matter.World.remove(world, player1Atk.cstr);
      Matter.World.remove(world, player1Atk.cstr_fixed);
      Matter.World.remove(world, player1Atk.cstr_fixed2);
      Matter.World.remove(world, player1Atk.cstr_foot);
      Matter.World.remove(world, player1Atk.cstr_foot2);
      Matter.World.remove(world, player1Atk.cstr_legs);
      Matter.World.remove(world, player1Atk.cstr_counterweight);
      Matter.World.remove(world, player1Atk.cstr_counterweight2);

      Matter.World.remove(world, player2Atk.main_body);
      Matter.World.remove(world, player2Atk.leg_body);
      Matter.World.remove(world, player2Atk.leg_fixed_body);
      Matter.World.remove(world, player2Atk.foot_body);
      Matter.World.remove(world, player2Atk.counterweight_body);
      Matter.World.remove(world, player2Atk.cstr);
      Matter.World.remove(world, player2Atk.cstr_fixed);
      Matter.World.remove(world, player2Atk.cstr_fixed2);
      Matter.World.remove(world, player2Atk.cstr_foot);
      Matter.World.remove(world, player2Atk.cstr_foot2);
      Matter.World.remove(world, player2Atk.cstr_legs);
      Matter.World.remove(world, player2Atk.cstr_counterweight);
      Matter.World.remove(world, player2Atk.cstr_counterweight2);

      Matter.World.remove(world, player2Def.main_body);
      Matter.World.remove(world, player2Def.leg_body);
      Matter.World.remove(world, player2Def.leg_fixed_body);
      Matter.World.remove(world, player2Def.foot_body);
      Matter.World.remove(world, player2Def.counterweight_body);
      Matter.World.remove(world, player2Def.cstr);
      Matter.World.remove(world, player2Def.cstr_fixed);
      Matter.World.remove(world, player2Def.cstr_fixed2);
      Matter.World.remove(world, player2Def.cstr_foot);
      Matter.World.remove(world, player2Def.cstr_foot2);
      Matter.World.remove(world, player2Def.cstr_legs);
      Matter.World.remove(world, player2Def.cstr_counterweight);
      Matter.World.remove(world, player2Def.cstr_counterweight2);

      player1Def = new Player(player1DefStartPosX, player1DefStartPosY, playerWidth, playerHeight, playerLegWidth, playerLegHeight, true);
      player1Atk = new Player(player1AtkStartPosX, player1AtkStartPosY, playerWidth, playerHeight, playerLegWidth, playerLegHeight, true);
      player2Atk = new Player(player2AtkStartPosX, player2AtkStartPosY, playerWidth, playerHeight, playerLegWidth, playerLegHeight, false);
      player2Def = new Player(player2DefStartPosX, player2DefStartPosY, playerWidth, playerHeight, playerLegWidth, playerLegHeight, false);
      ball.reset_loc();
    }
  }

  // DRAWING FUNCTION
  this.show = function() {
    push();
    textSize(90);
    stroke(0);
    fill(255);
    text(this.score1 + ' - ' + this.score2, (CANVAS_WIDTH / 2), 100);
    pop();
  }
}