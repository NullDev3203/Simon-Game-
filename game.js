var userClickedPattern=[];
var gamePattern=[];
var buttonColours=["red", "blue", "green", "yellow"];
var start=false;
var level=0;

function nextSequence() {
    userClickedPattern=[];
    $("#level-title").text("Level "+level);
    level++;
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$(document).keypress(keyPressed);
function keyPressed() {
    if (!start) {
        nextSequence();
        start=true;
    }
}

$(".btn").click(handler);

function handler() {
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
}

function playSound(name) {
    switch (name) {
        case "red":
            var audio=new Audio("sounds/"+name+".mp3");
            audio.play();
            break;
        case "blue":
            var audio=new Audio("sounds/"+name+".mp3");
            audio.play();
            break;
        case "green":
            var audio=new Audio("sounds/"+name+".mp3");
            audio.play();
            break;
        case "yellow":
            var audio=new Audio("sounds/"+name+".mp3");
            audio.play();
            break;
        default:
            var audio=new Audio("sounds/"+name+".mp3");
            audio.play();
            break;
    }
}

function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function () {
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function () {
                nextSequence();
            },1000);
        }
    }
    else{
        $("#level-title").text("Wrong Answer");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
            $("#level-title").text("Refresh To Restart");
        },1000);
    }
}