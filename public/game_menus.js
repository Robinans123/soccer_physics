// ************************************************
// Teugg Soccer Physics
// Rip-off of the once popular Soccer Physics game
// Horribly coded by : Kevin Le Teugg, 2020
// File : game_menus.js
// Description : Game menus manager
// ************************************************

function GameMenus() {

  this.draw = function(menu) {
    
    // MAIN MENU
    if (menu == 0) {
      image(background0, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      rectMode(CENTER);
      fill(0, 255, 40);
      rect((CANVAS_WIDTH / 2), (CANVAS_HEIGHT / 4), menuButtonWidth, menuButtonHeight);
      fill(0, 100, 255);
      rect((CANVAS_WIDTH / 2), (CANVAS_HEIGHT / 2), menuButtonWidth, menuButtonHeight);
      fill(0, 100, 255);
      rect((CANVAS_WIDTH / 2), (CANVAS_HEIGHT * 3 / 4), menuButtonWidth, menuButtonHeight);
      textSize(20)
      fill(255);
      textAlign(CENTER, CENTER);
      text('1 PLAYER - LOCAL', (CANVAS_WIDTH / 2), (CANVAS_HEIGHT / 4));
      text('2 PLAYERS - LOCAL', (CANVAS_WIDTH / 2), (CANVAS_HEIGHT / 2));
      text('2 PLAYERS - ONLINE', (CANVAS_WIDTH / 2), (CANVAS_HEIGHT * 3 / 4));
    }

    // 1 PLAYER - LOCAL | CHOOSE SIDE
    if (menu == 1) {
      image(background0, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      textAlign(CENTER, CENTER);
      textSize(30);
      fill(255);
      text('Choose side', (CANVAS_WIDTH / 2), (CANVAS_HEIGHT / 4));
      rectMode(CENTER);
      fill(0, 255, 40);
      rect((CANVAS_WIDTH / 3), (CANVAS_HEIGHT / 2), menuButtonWidth, menuButtonHeight);
      fill(0, 100, 255);
      rect((CANVAS_WIDTH * 2 / 3), (CANVAS_HEIGHT / 2), menuButtonWidth, menuButtonHeight);
      textSize(20)
      fill(255);
      text('LEFT', (CANVAS_WIDTH / 3), (CANVAS_HEIGHT / 2));
      text('RIGHT', (CANVAS_WIDTH * 2 / 3), (CANVAS_HEIGHT / 2));
    }

    // 2 PLAYERS - LOCAL
    if (menu == 2) {

    }

    // 2 PLAYERS - ONLINE
    if (menu == 3) {
      image(background0, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      textAlign(CENTER, CENTER);
      textSize(60);
      fill(200, 220, 30);
      text('UNDER CONSTRUCTION', (CANVAS_WIDTH / 2), (CANVAS_HEIGHT / 2));
    }

    // 1 PLAYER - LOCAL | LEFT
    if (menu == 4) {

    }

    // 1 PLAYER - LOCAL | RIGHT
    if (menu == 5) {
      image(background0, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      textAlign(CENTER, CENTER);
      textSize(60);
      fill(200, 220, 30);
      text('UNDER CONSTRUCTION', (CANVAS_WIDTH / 2), (CANVAS_HEIGHT / 2));
    }
  }

  this.clickedOn = function() {
    if (menu == 0) {
      if (mouseX < (CANVAS_WIDTH / 2) + (menuButtonWidth / 2) && mouseX > (CANVAS_WIDTH / 2) - (menuButtonWidth / 2)) {
        if (mouseY < ((CANVAS_HEIGHT / 4) + menuButtonHeight / 2) && mouseY > ((CANVAS_HEIGHT / 4) - menuButtonHeight / 2)) {
          menu = 1;
        }
        if (mouseY < ((CANVAS_HEIGHT / 2) + menuButtonHeight / 2) && mouseY > ((CANVAS_HEIGHT / 2) - menuButtonHeight / 2)) {
          menu = 2;
        }
        if (mouseY < ((CANVAS_HEIGHT * 3 / 4) + menuButtonHeight / 2) && mouseY > ((CANVAS_HEIGHT * 3 / 4) - menuButtonHeight / 2)) {
          menu = 3;
        }
      }
    }
    if (menu == 1) {
      if (mouseY < (CANVAS_HEIGHT / 2) + (menuButtonHeight / 2) && mouseY > (CANVAS_HEIGHT / 2) - (menuButtonHeight / 2)) {
        if (mouseX < (CANVAS_WIDTH / 3) + (menuButtonWidth / 2) && mouseX > (CANVAS_WIDTH / 3) - (menuButtonWidth / 2)) {
          menu = 4;
        }
        if (mouseX < (CANVAS_WIDTH * 2 / 3) + (menuButtonWidth / 2) && mouseX > (CANVAS_WIDTH * 2 / 3) - (menuButtonWidth / 2)) {
          menu = 5;
        }
      }
    }
  }
}