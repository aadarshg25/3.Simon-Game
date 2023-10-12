//gamepattern arrays stores the pattern of which color is clicked in which order
var gamePattern = []; //  ex- gamePattern = ["red","red","yellow","blue"]

//userClickedPattern is array of the keys that are pressed by the user
var userClickedPattern = [];

var buttonColors = ["red","blue","green","yellow"];
// step 1 : to get random click we first need to generate a random number 0-3 cause (4 colors)
function nextSequence(){

    //10- 6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];


    var randomNumber= Math.floor(Math.random()*3);
     
// step 2 : we assign an array the color so as to retrive the clicks through our random number a[0] = "red"

var randomChosenColor = buttonColors[randomNumber];

//step 3: we assign color the gamePattern to maintain the pattern for checks
gamePattern.push(randomChosenColor);

//step 4: we are adding animmations to the buttons on choosen ones 
var buttonToClick = "#" + randomChosenColor;
$(buttonToClick).fadeIn(100).fadeOut(100).fadeIn(100);

//step 5: we are adding sound to our choosen buttons
// var soundTOMake = new Audio("./sounds/"+randomChosenColor +".mp3");
// soundTOMake.play();
playSound(randomChosenColor);

level++;
$("#level-title").text("Level "+level);


}
// The nextSequence funtion forms a random btn  click with its sound for user to respond


//The Autoplay Policy launched in Chrome 66 for audio and video elements 
//and is effectively blocking roughly half of unwanted media autoplays in Chrome
// so your audio is muted unntill there is interaction by user with your website

//step 6 : we need to see which key is pressed by  the user
//1. Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function() {

    //2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
    var userChosenColour = $(this).attr("id");
  
    //4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
    userClickedPattern.push(userChosenColour);
  
    //console.log(userClickedPattern);

    // Step 7 : we need to add the sound to our button clicks
    playSound(userChosenColour);

    //step 8 : we need to add animations to our button clicks
   animatePress(this);

    //10 - 2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);
  });

//Step 7 : we need to add the sound to our button clicks
function playSound(name){
    var soundTOMake = new Audio("./sounds/"+name +".mp3");
    soundTOMake.play();
}

//step 8 : we need to add animations to our button clicks
function animatePress(currentColor){
    $(currentColor).addClass("pressed");
    
    setTimeout(function(){
        $(currentColor).removeClass("pressed");
    },100);
}

//step 9 : we need to start the game by any key press

var keyPressed =false; //to make  sure the stage starts in just one key press and not multiple times
var level =0;      // to keep count of which level you are on
$(document).keypress(function (){

    if(!keyPressed){
    nextSequence();
    keyPressed = true;   
}  
})
//step 10: check the user's patter against ours
function checkAnswer(currrentLevel){
  //10 -3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currrentLevel] === userClickedPattern[currrentLevel]) {

    console.log("success");

    //10- 4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length){

      //10- 5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } else { //step -11

   playSound("wrong");

   //2. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
   $("body").addClass("game-over");
   setTimeout(function () {
     $("body").removeClass("game-over");
   }, 200);

   //3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
   $("#level-title").text("Game Over, Press Any Key to Restart");

   startOver();
  }
}

//step -12
function startOver(){
    gamePattern = [];
    level = 0;
    keyPressed = false;
}