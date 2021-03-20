var balloon, database
var position
var Background
var HotAirBalloonImg, BackgroundImg

function preload(){
HotAirBalloonImg=loadImage("images/HotAirBallon-04.png")
BackgroundImg=loadImage("images/HotAirBallon-01.png")


}

function setup() {
  database=firebase.database();
  createCanvas(1000,500);
  
  balloon = createSprite(100,350);
  balloon.addImage(HotAirBalloonImg)
  balloon.scale = 0.5

  var balloonPosition=database.ref('balloon/position');
  balloonPosition.on("value",readPosition, showError);


}

function draw() {
  background(BackgroundImg);  
  if(keyDown(LEFT_ARROW)){
    updatePosition(-10,0);
    balloon.addImage(HotAirBalloonImg);
  }
  else if(keyDown(RIGHT_ARROW)){
    updatePosition(10,0);
    balloon.addImage(HotAirBalloonImg);
  }
  else if(keyDown(UP_ARROW)){
    updatePosition(0,-10);
    balloon.addImage(HotAirBalloonImg);
  }
  else if(keyDown(DOWN_ARROW)){
    updatePosition(0,+10);
    balloon.addImage(HotAirBalloonImg);
  }
    

drawSprites();
}

function updatePosition(x,y){
 database.ref('balloon/position').set({
  'x': position.x + x,
  'y': position.y + y
})


}

function readPosition(data){
 position = data.val();
 balloon.x = position.x;
 balloon.y = position.y;


}

function showError(){
  console.log("Error in wirting to the database")
}