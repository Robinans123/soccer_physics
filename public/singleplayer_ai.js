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
  
  // TO BE REFACTORED
  if (menu == P1_LOCAL_LEFT_SELECTED) {
    playerDef = player2Def;
    playerAtk = player2Atk;
  }
  else {
    playerDef = player1Def;
    playerAtk = player1Atk;
  }

  if (menu == P1_LOCAL_LEFT_SELECTED || menu == P1_LOCAL_RIGHT_SELECTED) {
    if (frameCount - previousTimingAI >= randTimingAI) {
      if (choosePlayerAI <= 0.1) {
        if (playerDef.isOnGround(ground)) {
          playerDef.cstrLegs.stiffness = 0.00001;
          playerDef.kick(kickForceCoeff);
          playerDef.jump();
          playerDef.cstrLegs.stiffness = 0.06;
          console.log("playerDef jumped");
          console.log(playerDef.isOnGround(ground));
        }
      }
      if (choosePlayerAI > 0.1 && choosePlayerAI <= 0.8) {
        if (playerAtk.isOnGround(ground)) {
          playerAtk.cstrLegs.stiffness = 0.00001;
          playerAtk.kick(kickForceCoeff);
          playerAtk.jump();
          playerAtk.cstrLegs.stiffness = 0.06;
        }
      }
      else {
        if (playerAtk.isOnGround(ground) && playerDef.isOnGround(ground)) {
          playerDef.cstrLegs.stiffness = 0.00001;
          playerDef.kick(kickForceCoeff);
          playerDef.jump();
          playerDef.cstrLegs.stiffness = 0.06;
          playerAtk.cstrLegs.stiffness = 0.00001;
          playerAtk.kick(kickForceCoeff);
          playerAtk.jump();
          playerAtk.cstrLegs.stiffness = 0.06;
        }
      }
      randTimingAI = random(lowerBoundTimingAI, upperBoundTimingAI);
      choosePlayerAI = random(0.0, 1.0);
      previousTimingAI = frameCount;
    }
  }
}