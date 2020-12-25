// Matter.js module aliases
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body;
    Render = Matter.Render;

// Matter.js variables
var engine;
var world;
var ground;

// Canvas dimensions
let CANVAS_WIDTH = 1400; // Default 1400
let CANVAS_HEIGHT = 700; // Default 700


let menu = 0;

// Elements dimensions
let ball_diameter = 25;
let goal_width = 150;
let goal_height = 400;
let player_width = 50; // default : 60
let player_height = 90; // default : 170
let player_leg_width = player_width / 2;
let player_leg_height = (player_height * 2) / 3;
let ground_width = CANVAS_WIDTH;
let ground_height = 100;
let ground_offset = 6;
let ground_x = CANVAS_WIDTH / 2;
let ground_y = CANVAS_HEIGHT - ground_height / 2;

// Score and timer initialisation
let score1 = 0;
let score2 = 0;
let t_elapsed_sec = 0;
let t_elapsed_min = 0;

// Coefficient that is applied to the tiltForce vector that is derived from the axes[1] vector of the player
let tiltForceCoeff = 0.017;

// Coefficient that is applied to the kickForce vector that is perpendicular to the movable leg of the players
let kickForceCoeff = 0.03;

// Coefficient that is applied to the jumpForce vector
let jumpForceCoeff = 0.47; // 0.5 works

// Create "structure that contains all arguments that can be passed to the player constructor"
/*var player1DefOptions = {
    playerXLocation: 300,
    playerYLocation: 300,
    playerWidth: player_width,
    playerHeight: player_height,
    playerLegWidth: player_leg_width,
    playerLegHeight: player_leg_height,
    playerSide: true,
    playerFriction: 0.8,
    playerRestitution: 0.1,
    playerAngle: 0,
    playerDensity: 0.01
  }*/

  // Create "structure that contains all arguments that can be passed to the goal constructor"
  /*var goal1Options = {
    goalXLocation: ,
    goalYLocation: ,
    goalWidth: 300,
    goalHeight: ,
    goalBarsThickness: 10,
    goalSide: true,
  }*/

  // Create "structure that contains all arguments that can be passed to the ball constructor"
  /*var ballOptions = {
    ballXLocation: ,
    ballYLocation: ,
    ballDiameter: 20,
    ballFriction: 0.01,
    ballRestitution: 0.89,
    ballDensity: 0.00005,
  }*/

function setup() {
  // CANVAS CREATION
  canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  canvas.parent('sketch-holder');

  // Matter.js engine creation
  engine = Engine.create();

  // Matter.js renderer creation - COMMENT FROM HERE...

  var render = Render.create({
      element: document.body,
      engine: engine,
      options: {
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
        showAxes: true,
        showConvexHulls: true
      }
  });

  Render.run(render);

  // ... TO HERE TO GET RID OF THE RENDERER

  //Engine.run(engine);
  world = engine.world;

  // INSTANCIATIONS
  ground = new Ground(CANVAS_WIDTH / 2, (CANVAS_HEIGHT +  (ground_height / 2) - ground_offset), ground_width, ground_height, 0);
  ball = new Ball((CANVAS_WIDTH / 2), (CANVAS_HEIGHT / 4), ball_diameter);

  player1_def = new Player(300, 300, player_width, player_height, player_leg_width, player_leg_height, true);
  //player1_atk = new Player(600, 600, player_width, player_height, player_leg_width, player_leg_height, true);
  goal1 = new Goal((goal_width / 2), (CANVAS_HEIGHT - (goal_height / 2)), goal_width, goal_height, 10, true);

  //player2_atk = new Player(900, 600, player_width, player_height, player_leg_width, player_leg_height, false);
  //player2_def = new Player(1200, 600, player_width, player_height, player_leg_width, player_leg_height, false);
  goal2 = new Goal((CANVAS_WIDTH - (goal_width / 2)), (CANVAS_HEIGHT - (goal_height / 2)), goal_width, goal_height, 10, false);

  gameTimer = new GameTimer();
  gameScore = new GameScore();

  world.gravity.y = 1;
}

function draw() {
  // GAME LOOP

  // MAIN MENU DRAWING
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
    if (keyCode == ESCAPE) {
      menu = 0
    }
  }

  // START DEBUG - PUT DEBUG CODE HERE
  if (menu == 2) {
	  main_debug();
    if (keyCode == ESCAPE) {
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

// EVENTS
function keyPressed() {
  if (keyCode == UP_ARROW) {
    
  }

  if (keyCode == 65) {
    if (1) {
      player1_def.jump();
    }
  }

  if (keyCode == 68) {
    if (1) {
      player1_atk.jump();
    } 
  }

  if (keyCode == LEFT_ARROW) {
    if (1) {
      player2_atk.jump();
    }
  }

  if (keyCode == RIGHT_ARROW) {
    if (1) {
      //player2_def.jump();
    }
  }
}

function keyReleased() {
  if (keyCode == 65) {
    player1_def.cstr_legs.stiffness = 0.06;
    // OK IT WORKS !
  }

    if (keyCode == 68) {
    player1_atk.cstr_legs.stiffness = 0.06;
    // OK IT WORKS !
  }

    if (keyCode == LEFT_ARROW) {
    player2_atk.cstr_legs.stiffness = 0.06;
    // OK IT WORKS !
  }

    if (keyCode == RIGHT_ARROW) {
    player2_def.cstr_legs.stiffness = 0.06;
    // OK IT WORKS !
  }
}