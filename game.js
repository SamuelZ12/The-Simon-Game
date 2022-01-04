let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;
let isEqual = true;

const buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence() {
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("#level-title").text("Level " + level);
}

function playSound(name) {
  const audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] !== userClickedPattern[currentLevel]) {
    isEqual = false;
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
  if (gamePattern.length === userClickedPattern.length) {
    if (isEqual){
      userClickedPattern = [];
      setTimeout(nextSequence, 1000);
    } else {
      isEqual = true;
    }
  }
}

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  started = false;
}
$(document).keydown(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  const userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});
