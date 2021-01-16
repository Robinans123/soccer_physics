// ************************************************
// Teugg Soccer Physics
// Rip-off of the once popular Soccer Physics game
// Horribly coded by : Kevin Le Teugg, 2020
// File : game_menus.js
// Description : Game menus manager
// ************************************************

function gameMenus(menu) {
  // Drawing main menu
  if (menu == 0) {
    image(background0, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    rectMode(CENTER);
    fill(0, 255, 40);
    rect((CANVAS_WIDTH / 2), (CANVAS_HEIGHT / 4), 200, 75);
    fill(0, 100, 255);
    rect((CANVAS_WIDTH / 2), (CANVAS_HEIGHT / 2), 200, 75);
    fill(0, 100, 255);
    rect((CANVAS_WIDTH / 2), (CANVAS_HEIGHT * 3 / 4), 200, 75);
    textSize(20)
    fill(255);
    textAlign(CENTER, CENTER);
    text('1 Player - Local', (CANVAS_WIDTH / 2), (CANVAS_HEIGHT / 4));
    text('2 Players - Local', (CANVAS_WIDTH / 2), (CANVAS_HEIGHT / 2));
    text('2 Players - Online', (CANVAS_WIDTH / 2), (CANVAS_HEIGHT * 3 / 4));
  }

  // START GAME - PUT GAME CODE HERE
  if (menu == 1) {
    image(background0, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    textAlign(CENTER, CENTER);
    textSize(30);
    fill(255);
    text('Choose side', (CANVAS_WIDTH / 2), (CANVAS_HEIGHT / 4));
    rectMode(CENTER);
    fill(0, 255, 40);
    rect((CANVAS_WIDTH / 3), (CANVAS_HEIGHT / 2), 200, 75);
    fill(0, 100, 255);
    rect((CANVAS_WIDTH * 2 / 3), (CANVAS_HEIGHT / 2), 200, 75);
    textSize(20)
    fill(255);
    text('Left', (CANVAS_WIDTH / 3), (CANVAS_HEIGHT / 2));
    text('Right', (CANVAS_WIDTH * 2 / 3), (CANVAS_HEIGHT / 2));
  }

  if (menu == 2) {

  }
}