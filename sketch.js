// ************************************************
// Teugg Soccer Physics
// Rip-off of the once popular Soccer Physics game
// Horribly coded by : Kevin Le Teugg, 2020
// File : sketch.js
// Description : Constants declaration, variables initialization, setup, animation loop and mouse / keys events
// ************************************************

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

// CONSTANTS
// Canvas dimensions
let CANVAS_WIDTH = 1280; // Default 1280
let CANVAS_HEIGHT = 720; // Default 720

// Collision categories
var generalCollCategory = 0x0001, // Used for all parts of player except counterweight, ball and goal
    generalNoCollCategory = 0x0002, // Used only for the counterweight of players
    groundCollCategory = 0x0004; // Used for ground

// INITIALIZATION VARIABLES
// Menus states
let menu = 0;

// Elements dimensions
let ballRadius = 25; // TO BE RECALCULATED
let goalWidth = CANVAS_WIDTH / 9.333; // Default : 150
let goalHeight = CANVAS_HEIGHT / 1.75; // Default : 400
let goalStartPosX = 0; // TO DO
let playerWidth = CANVAS_WIDTH / 28; // Default : 50
let playerHeight = CANVAS_HEIGHT / 7.778; // Default : 90
let playerLegWidth = playerWidth / 2;
let playerLegHeight = (playerHeight * 2) / 3;
let player1DefStartPosX = CANVAS_WIDTH * 0.214;
let player1DefStartPosY = CANVAS_HEIGHT * 6 / 7;
let player1AtkStartPosX = CANVAS_WIDTH * 0.429;
let player1AtkStartPosY = CANVAS_HEIGHT * 6 / 7;
let player2DefStartPosX = CANVAS_WIDTH * 0.768;
let player2DefStartPosY = CANVAS_HEIGHT * 6 / 7;
let player2AtkStartPosX = CANVAS_WIDTH * 0.571;
let player2AtkStartPosY = CANVAS_HEIGHT * 6 / 7;
let groundWidth = CANVAS_WIDTH;
let groundHeight = 100; // Has to be a big arbitrary number because of the unknown surrounding the inner computing time of the Matter.js engine
let groundOffset = 6;
let groundX = CANVAS_WIDTH / 2;
let groundY = CANVAS_HEIGHT - groundHeight / 2;
let menuButtonWidth = CANVAS_WIDTH / 5;
let menuButtonHeight = CANVAS_HEIGHT / 10;

// Score and timer initialisation
let score1 = 0;
let score2 = 0;
let elapsedTimeSec = 0;
let elapsedTimeMin = 0;

// Coefficient that is applied to the tiltForce vector that is derived from the axes[1] vector of the player
let tiltForceCoeff = 0.007;

// Coefficient that is applied to the kickForce vector that is perpendicular to the movable leg of the players
let kickForceCoeff = 0.0018;

// Coefficient that is applied to the jumpForce vector
let jumpForceCoeff = 0.55; // 0.5 works

// Sprites handles
let background0;
let spriteSoccerBall;
let spritePlayerMainBody0;

// Create "structure that contains all arguments that can be passed to the player constructor"
/*var player1DefOptions = {
    playerXLocation: 300,
    playerYLocation: 300,
    playerWidth: playerWidth,
    playerHeight: playerHeight,
    playerLegWidth: playerLegWidth,
    playerLegHeight: playerLegHeight,
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

// Assets preload
function preload() {
  background0 = loadImage('assets/0_background.png');
  spriteSoccerBall = loadImage('assets/sprite_soccer_ball.png');
  spritePlayerMainBody0 = loadImage('assets/sprite_player_main_body0.png');
  spritePlayerLeg0 = loadImage('assets/sprite_player_leg0.png');
}

// Entry point of code
function setup() {
  // Canvas creation
  canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  canvas.parent('sketch-holder');

  // Draw background
  image(background0, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Matter.js engine creation
  engine = Engine.create();

  // Matter.js renderer creation - COMMENT FROM HERE...
  /*var render = Render.create({
      element: document.body,
      engine: engine,
      options: {
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
        showAxes: true,
        showConvexHulls: true,
        showInternalEdges: true,
        showVelocity: true,
        showDebug: true,
        showAngleIndicator: true
      }
  });

  Render.run(render);*/
  // ... TO HERE TO GET RID OF THE RENDERER

  //Engine.run(engine);
  world = engine.world;

  // INSTANCIATIONS
  gameMenus = new GameMenus();

  ground = new Ground(CANVAS_WIDTH / 2, (CANVAS_HEIGHT +  (groundHeight / 2) - groundOffset), groundWidth, groundHeight, 0);
  ball = new Ball((CANVAS_WIDTH / 2), (CANVAS_HEIGHT / 4), ballRadius);

  player1Def = new Player(player1DefStartPosX, player1DefStartPosY, playerWidth, playerHeight, playerLegWidth, playerLegHeight, true);
  player1Atk = new Player(player1AtkStartPosX, player1AtkStartPosY, playerWidth, playerHeight, playerLegWidth, playerLegHeight, true);
  goal1 = new Goal((goalWidth / 2), (CANVAS_HEIGHT - (goalHeight / 2)), goalWidth, goalHeight, 10, true);

  player2Atk = new Player(player2AtkStartPosX, player2AtkStartPosY, playerWidth, playerHeight, playerLegWidth, playerLegHeight, false);
  player2Def = new Player(player2DefStartPosX, player2DefStartPosY, playerWidth, playerHeight, playerLegWidth, playerLegHeight, false);
  goal2 = new Goal((CANVAS_WIDTH - (goalWidth / 2)), (CANVAS_HEIGHT - (goalHeight / 2)), goalWidth, goalHeight, 10, false);

  gameTimer = new GameTimer(elapsedTimeSec, elapsedTimeMin);
  gameScore = new GameScore();

  world.gravity.y = 1;
}

// p5.js animation loop
function draw() {

  // Drawing main menu
  if (menu == 0) {
    gameMenus.draw(menu);
  }

  // 1 PLAYER - LOCAL | CHOOSE SIDE
  if (menu == 1) {
    gameMenus.draw(menu);
    if (keyCode == ESCAPE) {
      menu = 0;
    }
  }

  // 2 PLAYERS - LOCAL
  if (menu == 2) {
    main();
    if (keyCode == ESCAPE) {
      menu = 0;
    }
  }

  // 2 PLAYERS - ONLINE
  if (menu == 3) {
    gameMenus.draw(menu);
    if (keyCode == ESCAPE) {
      menu = 0;
    }
  }

  // 1 PLAYER - LOCAL
  if (menu == 4) {
    gameMenus.draw(menu);
  }
}	

// EVENT FUNCTIONS
function mouseClicked() {
  gameMenus.clickedOn(menu);
  console.log("Menu index : " + menu);
}

function keyPressed() {
  if (keyCode == 65) {
    if (player1Def.isOnGround(ground)) {
      player1Def.jump();
    }
  }

  if (keyCode == 68) {
    if (player1Atk.isOnGround(ground)) {
      player1Atk.jump();
    } 
  }

  if (keyCode == RIGHT_ARROW) {
    if (player2Def.isOnGround(ground)) {
      player2Def.jump();
    }
  }

  if (keyCode == LEFT_ARROW) {
    if (player2Atk.isOnGround(ground)) {
      player2Atk.jump();
    }
  }
}

function keyReleased() {
  if (keyCode == 65) {
    player1Def.cstr_legs.stiffness = 0.06;
  }

  if (keyCode == 68) {
    player1Atk.cstr_legs.stiffness = 0.06;
  }

  if (keyCode == RIGHT_ARROW) {
    player2Def.cstr_legs.stiffness = 0.06;
  }

  if (keyCode == LEFT_ARROW) {
    player2Atk.cstr_legs.stiffness = 0.06;
  }
}