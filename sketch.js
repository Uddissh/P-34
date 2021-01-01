var dog,happyDog,dogImg;
var database;
var foodS,foodStock;

function preload(){
dogImg = loadImage("images/Dog.png");
happyDog = loadImage("images/happydog.png");
}

function setup() {
  database = firebase.database();

	createCanvas(500, 500);
  dog = createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
}


function draw() {  
background(46,139,87)

if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happyDog);
}
  drawSprites();
 
  if (foodS != undefined) {
    fill(255,255,254);
    stroke("black");
    text("food remaning :"+foodS,170,200);
    textSize(20);
    text("note : press up arrow key to feed milk to the dog",130,10,300,20); 
  }
}
function readStock(data){
  foodS = data.val();
  console.log(foodS)
  }
  
  function writeStock(x){
    if(x <= 0){
      x = 0;
    }
    else{
      x = x-1;
    }
      database.ref("/").update({
        food : x,
      })
    }
