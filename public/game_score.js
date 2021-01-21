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
    if (ball.body.position.x - ball.r >= CANVAS_WIDTH - goal2.w + (goal2.botBarW / 2) && ball.body.position.y >= CANVAS_HEIGHT - goal2.h) {
      this.score1 = this.score1 + 1;
      Matter.World.remove(world, player1Def.getPlayerBodiesList());
      Matter.World.remove(world, player1Atk.getPlayerBodiesList());
      Matter.World.remove(world, player2Def.getPlayerBodiesList());
      Matter.World.remove(world, player2Atk.getPlayerBodiesList());

      Matter.World.remove(world, player1Def.getPlayerConstraintsList());
      Matter.World.remove(world, player1Atk.getPlayerConstraintsList());
      Matter.World.remove(world, player2Def.getPlayerConstraintsList());
      Matter.World.remove(world, player2Atk.getPlayerConstraintsList());

      player1Def = new Player(player1DefStartPosX, player1DefStartPosY, playerWidth, playerHeight, playerLegWidth, playerLegHeight, true);
      player1Atk = new Player(player1AtkStartPosX, player1AtkStartPosY, playerWidth, playerHeight, playerLegWidth, playerLegHeight, true);
      player2Atk = new Player(player2AtkStartPosX, player2AtkStartPosY, playerWidth, playerHeight, playerLegWidth, playerLegHeight, false);
      player2Def = new Player(player2DefStartPosX, player2DefStartPosY, playerWidth, playerHeight, playerLegWidth, playerLegHeight, false);
      ball.reset_loc();
    }
    else if (ball.body.position.x >= CANVAS_WIDTH + ball.r) {
      // Ball is out of right of canvas

      Matter.World.remove(world, player1Def.getPlayerBodiesList());
      Matter.World.remove(world, player1Atk.getPlayerBodiesList());
      Matter.World.remove(world, player2Def.getPlayerBodiesList());
      Matter.World.remove(world, player2Atk.getPlayerBodiesList());

      Matter.World.remove(world, player1Def.getPlayerConstraintsList());
      Matter.World.remove(world, player1Atk.getPlayerConstraintsList());
      Matter.World.remove(world, player2Def.getPlayerConstraintsList());
      Matter.World.remove(world, player2Atk.getPlayerConstraintsList());

      player1Def = new Player(player1DefStartPosX, player1DefStartPosY, playerWidth, playerHeight, playerLegWidth, playerLegHeight, true);
      player1Atk = new Player(player1AtkStartPosX, player1AtkStartPosY, playerWidth, playerHeight, playerLegWidth, playerLegHeight, true);
      player2Atk = new Player(player2AtkStartPosX, player2AtkStartPosY, playerWidth, playerHeight, playerLegWidth, playerLegHeight, false);
      player2Def = new Player(player2DefStartPosX, player2DefStartPosY, playerWidth, playerHeight, playerLegWidth, playerLegHeight, false);
      ball.reset_loc();
    }
    // Player 2 scores
    if (ball.body.position.x + ball.r <= goal1.w - goal1.botBarW && ball.body.position.y >= CANVAS_HEIGHT - goal1.h) {
      this.score2 = this.score2 + 1;

      Matter.World.remove(world, player1Def.getPlayerBodiesList());
      Matter.World.remove(world, player1Atk.getPlayerBodiesList());
      Matter.World.remove(world, player2Def.getPlayerBodiesList());
      Matter.World.remove(world, player2Atk.getPlayerBodiesList());

      Matter.World.remove(world, player1Def.getPlayerConstraintsList());
      Matter.World.remove(world, player1Atk.getPlayerConstraintsList());
      Matter.World.remove(world, player2Def.getPlayerConstraintsList());
      Matter.World.remove(world, player2Atk.getPlayerConstraintsList());

      player1Def = new Player(player1DefStartPosX, player1DefStartPosY, playerWidth, playerHeight, playerLegWidth, playerLegHeight, true);
      player1Atk = new Player(player1AtkStartPosX, player1AtkStartPosY, playerWidth, playerHeight, playerLegWidth, playerLegHeight, true);
      player2Atk = new Player(player2AtkStartPosX, player2AtkStartPosY, playerWidth, playerHeight, playerLegWidth, playerLegHeight, false);
      player2Def = new Player(player2DefStartPosX, player2DefStartPosY, playerWidth, playerHeight, playerLegWidth, playerLegHeight, false);
      ball.reset_loc();
    }
    else if (ball.body.position.x <= 0 - ball.r) {
      // Ball is out of left of canvas

      Matter.World.remove(world, player1Def.getPlayerBodiesList());
      Matter.World.remove(world, player1Atk.getPlayerBodiesList());
      Matter.World.remove(world, player2Def.getPlayerBodiesList());
      Matter.World.remove(world, player2Atk.getPlayerBodiesList());

      Matter.World.remove(world, player1Def.getPlayerConstraintsList());
      Matter.World.remove(world, player1Atk.getPlayerConstraintsList());
      Matter.World.remove(world, player2Def.getPlayerConstraintsList());
      Matter.World.remove(world, player2Atk.getPlayerConstraintsList());

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