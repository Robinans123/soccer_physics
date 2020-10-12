// Matter.js module aliases
var Engine = Matter.Engine,
    //Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body;
var engine;
var world;
var render;
var ground;
//var jumpForce = Matter.Vector.create(0.01, -0.3);
var jumpForce = Matter.Vector.create(0, -0.3);
//var jumpForce2 = Matter.Vector.create(-0.01, -0.3);
var jumpForce2 = Matter.Vector.create(0, -0.3);
var kickForce = Matter.Vector.create(0.0, 0);
var kickBackForce = Matter.Vector.create(-0.0, 0);
let menu = 0;
let CANVAS_WIDTH = 1400;
let CANVAS_HEIGHT = 700;
let ball_diameter = 15;
let goal_width = 150;
let goal_height = 400;
let player_width = 40; // default : 60
let player_height = 80; // default : 170
let player_leg_width = player_width / 2;
let player_leg_height = (player_height * 2) / 3;
let ground_width = CANVAS_WIDTH;
let ground_height = 100;
let ground_offset = 6;
let ground_x = CANVAS_WIDTH / 2;
let ground_y = CANVAS_HEIGHT - ground_height / 2;

let score1 = 0;
let score2 = 0;
let t_elapsed_sec = 0;
let t_elapsed_min = 0;

function setup() {
  // CANVAS CREATION
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

  // Matter.js engine creation
  engine = Engine.create();

  // Matter.js renderer creation
  /*  render = Render.create({
      element: document.body,
      engine: engine
  });*/

  //Engine.run(engine);
  world = engine.world;

  // INSTANCIATIONS
  ground = new Ground(CANVAS_WIDTH / 2, (CANVAS_HEIGHT +  (ground_height / 2) - ground_offset), ground_width, ground_height, 0);
  ball = new Ball((CANVAS_WIDTH / 2), (CANVAS_HEIGHT / 4), ball_diameter);
  /*player1_atk = new Player(500, 200, player_width, player_height, player_leg_width, player_leg_height, true);
  player1_def = new Player(200, 200, player_width, player_height, player_leg_width, player_leg_height, true);
  player2_atk = new Player(900, 200, player_width, player_height, player_leg_width, player_leg_height, false);
  player2_def = new Player(1200, 200, player_width, player_height, player_leg_width, player_leg_height, false);*/

  playerTest = new PlayerTest(350, 300, player_width, player_height, player_leg_width, player_leg_height, jumpForce);
  playerTest2 = new PlayerTest(600, 600, player_width, player_height, player_leg_width, player_leg_height, jumpForce);

  goal1 = new Goal((goal_width / 2), (CANVAS_HEIGHT - (goal_height / 2)), goal_width, goal_height, 10, true);
  goal2 = new Goal((CANVAS_WIDTH - (goal_width / 2)), (CANVAS_HEIGHT - (goal_height / 2)), goal_width, goal_height, 10, false);
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

  if (keyCode == LEFT_ARROW) {
    //if (isPlayerTestOnGround) {
    if (1) {
      var jumpForceTest = Matter.Vector.create(playerTest.main_body.axes[0].x * -0.2, -playerTest.main_body.axes[0].y * 0.2);
      //Body.applyForce(playerTest.main_body, playerTest.main_body.position, jumpForce2);
      Body.applyForce(playerTest.main_body, playerTest.main_body.position, jumpForceTest);
    }
    //Body.applyForce(playerTest.leg_body, playerTest.leg_body.position, kickForce);
  }

  if (keyCode == RIGHT_ARROW) {
    if (isPlayerTestOnGround) {
      //Body.applyForce(playerTest.main_body, playerTest.main_body.position, jumpForce);
      playerTest.jump();
      playerTest.kick();
    }
    //Body.applyForce(playerTest.leg_body, playerTest.leg_body.position, kickForce);
  }

  if (keyCode == 65) {
    //Body.applyForce(player1_def.main_body, player1_def.main_body.position, jumpForce2);
  }

  if (keyCode == 68) {
    //Body.applyForce(player1_def.main_body, player1_def.main_body.position, jumpForce);
  }
}
