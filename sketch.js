//Create variables here
var dogIMG, happyDogIMG;
var database;
var foodS, foodStock;
var dog;

function preload()
{
  //load images here
  dogIMG = loadImage("images/Dog.png");
  happyDogIMG = loadImage("images/happydog.png");
}

function setup() {
  createCanvas(500, 500);
  
  dog = createSprite(50, 100, 50, 50);
  dog.addImage(dogIMG);

  foodStock = database.ref("food");
  foodStock.on("value", readStock);
  
}


function draw() {  

  background(46, 139, 87);

  imageMode(CENTER);
  image(dogIMG, 400, 350, 50, 100);
  imageMode(CENTER);
  image(happyDogIMG, 600, 350, 50, 100);

  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    foodStock = foodStock - 1;
    dog.addImage(happyDogIMG)
  }

  drawSprites();
  //add styles here

  textSize(15);
  Fill("black");


}

function readStock(data) {

  foodS = data.val();
  
}

function writeStock(x) {
  
  if (x<=0) {
    x = 0;
  }else{
    x = x - 1;
  }
  
  database.ref(' / ').update({
    food:x
  })
}