let menu = 0;
let GRAVITY = 0.6;
let CANVAS_WIDTH = 1400;
let CANVAS_HEIGHT = 700;
let FRICTION_FORCE = 0.2;
let GROUND_BOUNCE = -0.7;
let goal_width = 150;
let goal_height = 400;
let player_width = 60;
let player_height = 170;
let coll_object_list = [];
let score1 = 0;
let score2 = 0;
let t_elapsed_sec = 0;
let t_elapsed_min = 0;

function setup() {
  // CANVAS CREATION
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

  // INSTANCIATIONS
  ball = new Ball(300, 200, 0, 0, 0.01, GRAVITY, 40);
  player1_atk = new Player(500, 350, 0, 0, 0.006, GRAVITY, player_width, player_height);
  player1_def = new Player(200, 350, 0, 0, 0, GRAVITY, player_width, player_height);
  player2_atk = new Player(900, 350, 0, 0, -0.006, GRAVITY, player_width, player_height);
  player2_def = new Player(1200, 350, 0, 0, 0, GRAVITY, player_width, player_height);
  goal1 = new Goal((goal_width / 2), (CANVAS_HEIGHT - (goal_height / 2)), goal_width, goal_height);
  goal2 = new Goal((CANVAS_WIDTH - (goal_width / 2)), (CANVAS_HEIGHT - (goal_height / 2)), goal_width, goal_height);
  coll_object_list.push(ball, player1_atk, player1_def, player2_atk, player2_def, goal1, goal2);
}

function draw() {
  // put drawing code here

  // MENU DRAWING
  background(50);
  rectMode(CENTER);
  fill(0, 255, 40);
  rect((CANVAS_WIDTH / 2), (CANVAS_HEIGHT / 3), 200, 75);
  fill(0, 100, 255);
  rect((CANVAS_WIDTH /2), ((CANVAS_HEIGHT / 3) * 2), 200, 75);
  textSize(50)
  fill(255);
  textAlign(CENTER, CENTER);
  text('START', (CANVAS_WIDTH / 2), (CANVAS_HEIGHT / 3));
  text('DEBUG', (CANVAS_WIDTH /2), ((CANVAS_HEIGHT / 3) * 2));

  // START GAME - PUT GAME CODE HERE
  if (menu == 1) {
    main();
    if (mouseButton == RIGHT) {
      menu = 0
    }
  }

  // START DEBUG - PUT DEBUG CODE HERE
  if (menu == 2) {
	main_debug();
    if (mouseButton == RIGHT) {
      menu = 0
    }
  }
}	

// EVENT FUNCTIONS
function mouseClicked() {
  if (menu == 0) {
    if (mouseX < ((CANVAS_WIDTH / 2) + 100) && mouseX > ((CANVAS_WIDTH / 2)- 100)) {
      if (mouseY < ((CANVAS_HEIGHT / 3) + 15) && mouseY > ((CANVAS_HEIGHT / 3) - 15)) {
        menu = 1
      }
      if (mouseY < (((CANVAS_HEIGHT / 3) * 2) + 15) && mouseY > (((CANVAS_HEIGHT / 3) * 2) - 15)) {
        menu = 2
      }
    }
  }
}

function keyPressed() {
  if (keyCode == UP_ARROW) {
    ball.kick();
  }
  if (keyCode == LEFT_ARROW) {
    ball.kick_left();
  }
  if (keyCode == RIGHT_ARROW) {
    ball.kick_right();
  }
  if (keyCode == 65) {
    player1_def.jump();
  }
  if (keyCode == 68) {
    player1_atk.jump();
  }
}

function keyReleased() {
  if (keyCode == UP_ARROW) {
    ball.yacc = GRAVITY;
  }
  if (keyCode == LEFT_ARROW) {
    ball.xacc = 0;
  }
  if (keyCode == RIGHT_ARROW) {
    ball.xacc = 0;
  }
  if (keyCode == 65) {
    player1_def.yacc = GRAVITY;
  }
  if (keyCode == 68) {
    player1_atk.yacc = GRAVITY;
  }
}