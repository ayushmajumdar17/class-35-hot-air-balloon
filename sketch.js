var balloon, balloon_img;
var  background_img;
var database;
var position;
var referenceposition;

function preload(){
balloon_img = loadImage("balloon 35.png");
background_img = loadImage("background 35.jpg");
}

function setup() {
    createCanvas(500, 500);
    balloon = createSprite(85, 95,10, 10);
    balloon.addImage(balloon_img);
    balloon.scale = 0.3
    

 database = firebase.database();
referenceposition = database.ref("balloon/position");
 referenceposition.on("value", readPosition, readError);
}
function writePosition(x, y) {
 
 database.ref("balloon/position").set({
     'x': position.x + x,
        'y': position.y + y
     });


}
function readPosition(data) {
  position = data.val();
   balloon.x = position.x;
    balloon.y = position.y;
 }
function readError() {
    console.log("unable to read from the database");
 }
function draw() {
    background(background_img);
    if (position !== undefined) {
        if (keyDown(LEFT_ARROW)) {
            writePosition(-1, 0);
        }
        else if (keyDown(RIGHT_ARROW)) {
            writePosition(1, 0);
        }
        else if (keyDown(UP_ARROW)) {
            writePosition(0, -1);
        }
        else if (keyDown(DOWN_ARROW)) {
            writePosition(0, +1);
        }
        console.log(position);
    }

    drawSprites();
}

