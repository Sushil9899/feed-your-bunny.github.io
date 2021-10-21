const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;


let engine;
let world;
var plank;
var ground;
var higherground;
var con;
var con2;
var rope,rope3
var con3
var bubble,bubble_img;
var cutter
var cutterImg
var sadS,cutS,eatingS,bk
var path

function preload()
{
  bubble_img = loadImage("bubble.png")
  bg_img = loadImage('background_18.png');
  food = loadImage('fruit.png');
  rabbit = loadImage('Rabbit-01.png');
  cutterImg = loadImage('cut.png')

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  star_img = loadImage('star.png');

  sadS = loadSound("sad.wav")
  cutS = loadSound("rope_cut.mp3")
  eatingS = loadSound("eating_sound.mp3")
  bk = loadSound("bk.mp3")
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {


  var isMobile = /iPhone | iPad | iPod | Android /i.test(navigator.userAgent) 
  if(isMobile){
 
   canW = displayWidth
   canH = displayHeight
   createCanvas(displayWidth+80,displayHeight)
  }
 
  else{
 
   canW = windowWidth
   canH = windowHeight
 
   createCanvas(windowWidth,windowHeight)
  }
  bk.loop();
  bk.setVolume(0.15);

  frameRate(80);
  engine = Engine.create();
  world = engine.world;

   var fruit_options = {
    restitution: 0.8
  }
  
  //ground =new Ground(250,height+70,width,20);
  fruit = Bodies.circle(100,400,15,fruit_options);
  World.add(world,fruit);
  
  bubble = createSprite(290,490,20,20);
  bubble.addImage(bubble_img);
  bubble.scale = 0.1;

 

  
  //bunny sprite
  blink.frameDelay = 20;
  eat.frameDelay = 20;
  bunny = createSprite(270,100,100,100);
  bunny.addImage(rabbit);
  bunny.scale = 0.2;
  higherground =new Ground(300,170,100,10);

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');


  cutter = createSprite(350,250,100,100);
  cutter.addImage(cutterImg);
  cutter.scale = 0.14;

  rope = new Rope(6,{x:230,y:330});
  rope2 = new Rope(4,{x:50,y:450});
  rope3 = new Rope(5,{x:300,y:410})
  con = new Link(rope,fruit);
  con2 = new Link(rope2,fruit);
   con3 = new Link(rope3,fruit)

  //btn 1
  button = createImg('cut_button.png');
  button.position(200,320);
  button.size(50,50);
  button.mouseClicked(drop3);


  button2 = createImg('cut_button.png');
  button2.position(30,420);
  button2.size(50,50)
  button2.mouseClicked(drop);

  var button3 = createImg('cut_button.png');
  button3.position(300,420);
  button3.size(50,50);
  button3.mouseClicked(drop2);

  ellipseMode(RADIUS);
}

function draw() 
{
  background(51);
  image(bg_img,0,0,width,height);
  Engine.update(engine);
  
  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  //ground.show();
  higherground.show(); 
  rope.show();
  rope2.show();
  rope3.show()

  if(collide(fruit,bunny,80)==true)
  {
   remove_rope();
   
   bubble.visible = false;
    World.remove(engine.world,fruit);
    fruit = null;
    eatingS.play()
    //bunny.change('eating');

    bunny.changeAnimation('eating');

    //bunny.changeAnimation();

    //bunny.Animation('eating');
  }
  
  if(collide(fruit,bubble,40) == true)
    {
      engine.world.gravity.y = -1;
      bubble.position.x = fruit.position.x;
      bubble.position.y = fruit.position.y;
    }
    drawSprites();

    if(collide(fruit,cutter,60) == true){

      World.remove(engine.world,fruit)
      fruit = null
      bubble.destroy()
      remove_rope()
      rope3.break()
      bunny.changeAnimation('crying')
       sadS.play()
      bk.stop()
      gameOver()
    }
    if(fruit!=null && fruit.position.y>=1000)
    {
      bunny.changeAnimation('crying');
      fruit=null;
       sad.play()
       bk.stop()

       rope.break()
       rope2.break()
       rope3.break()
     }
     
  }

function drop()
{
  rope2.break();
  con2.dettach();
  con2 = null; 
  cutS.play()
}

function drop3()
{
  rope.break();
  con.dettach();
  con = null; 
  cutS.play()
}

function drop2()
{
  rope3.break();
  con3.dettach();
  con3 = null; 
  cutS.play()
}


function remove_rope()
{
  rope.break();
  con.dettach();
  con = null; 
  
}


function collide(body,sprite ,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
              
               return true; 
            }
            else{
              return false;
            }
         }
}
function gameOver() {
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing!!",
      imageUrl:
        "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/blink_1.png",
      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}
