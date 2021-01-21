// ************************************************
// Teugg Soccer Physics
// Rip-off of the once popular Soccer Physics game
// Horribly coded by : Kevin Le Teugg, 2020
// File : singleplayer_ai.js
// Description : Contains the AI algorithm(s) for the bot player in single player mode
// ************************************************

function singlePlayerAI(menu) {
  var playerDef;
  var playerAtk;
  
  if (menu == P1_LOCAL_LEFT_SELECTED) {
    playerDef = player2Def;
    playerAtk = player2Atk;
  }
  else {
    playerDef = player1Def;
    playerAtk = player1Atk;
  }

  // TO BE REFACTORED 
  if (frameCount - previousTimingAI >= randTimingAI) {
    if (choosePlayerAI <= 0.1) {
      if (playerDef.isOnGround(ground)) {
        playerDef.kick(kickForceCoeff);
        playerDef.jump();  
      }
    }
    if (choosePlayerAI > 0.1 && choosePlayerAI <= 0.8) {
      if (playerAtk.isOnGround(ground)) {
        playerAtk.kick(kickForceCoeff);
        playerAtk.jump();
      }
    }
    else {
      if (playerAtk.isOnGround(ground) && playerDef.isOnGround(ground)) {
        playerDef.kick(kickForceCoeff);
        playerDef.jump();
        playerAtk.kick(kickForceCoeff);
        playerAtk.jump();
      }
    }
    randTimingAI = random(lowerBoundTimingAI, upperBoundTimingAI);
    choosePlayerAI = random(0.0, 1.0);
    previousTimingAI = frameCount;
  }
}