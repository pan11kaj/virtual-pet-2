var database ,dog;
var position;
var addfood,feed;
var foodobject;
var foodStock;


function preload()

{
  dogimg = loadImage("images/dogImg.png");
  dogimg2 = loadImage("images/dogimg1.png");
	
}

function setup() {
	createCanvas(800, 500);
  database = firebase.database();
   
  foodobject=new Food();
  
  dog = createSprite(550,250,10,10);
  dog.addImage(dogimg);
  dog.scale=0.2;
 
  var foodstock = database.ref('Food');
  foodstock.on("value", readPosition);
  feed = createButton("feed dog");
  feed.position(400,50);
  feed.mousePressed(FeedDog);
  addfood = createButton("add food");
  addfood.position(500,50);
  addfood.mousePressed(addFood);
  
} 

function draw(){
 background(46,139,87);

 drawSprites();
 foodobject.display();
 
 fill(255,255,254);
 textSize(15);

}
function readPosition(data){
  position = data.val();
  foodobject.Updatefood(position)
}

function writePosition(x){
  if(x>0){
    x=x-1
  }
  else{
    x=0
  }
  database.ref('/').set({
    'Food': x
  })

}
function  addFood(){
position++
database.ref('/').update({
  Food:position
})
}
function FeedDog(){

dog.addImage(dogimg2)
foodobject.Updatefood(foodobject.getFoodStock()-1);
 database.ref('/').update({
   Food:foodobject.getFoodStock(),FeedTime:hour()
   
 })
}
