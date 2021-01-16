// ************************************************
// Teugg Soccer Physics
// Rip-off of the once popular Soccer Physics game
// Horribly coded by : Kevin Le Teugg, 2020
// File : singleplayer_ai.js
// Description : Contains the AI algorithm(s) for the bot player in single player mode
// ************************************************

function singlePlayerAI() {
  // TO BE REFACTORED 
  if (frameCount - previousTimingAI >= randTimingAI) {
    if (choosePlayerAI >= 0.5) {
      if (player2Def.isOnGround(ground)) {
        player2Def.kick(kickForceCoeff);
        player2Def.jump();  
      }
    }
    else {
      if (player2Atk.isOnGround(ground)) {
        player2Atk.kick(kickForceCoeff);
        player2Atk.jump();
      } 
    }
    randTimingAI = random(30, 140);
    choosePlayerAI = random(0.0, 1.0);
    previousTimingAI = frameCount;
  }
}