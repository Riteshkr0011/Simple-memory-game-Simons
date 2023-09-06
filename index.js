var firstStart = false;
var level = 0;

const buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

const nextSequence = () => {
    userClickedPattern = [];
    level++;
    $("h1").text(`Level ${level}`);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];

    gamePattern.push(randomChosenColour);

    var currColor = $("#" + randomChosenColour);

    playSound(randomChosenColour);
    currColor.fadeIn(100).fadeOut(100).fadeIn(100);
}

const playSound = (randomChosenColour) => {
    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
}

const startOver = () => {
    level = 0;
    gamePattern = [];
    firstStart = false;
    userClickedPattern = [];
}

$(".btn").click(function () {
    if (firstStart == true) {

        userChosenColour = $(this).attr("id");

        playSound(userChosenColour);

        userClickedPattern.push(userChosenColour);

        $("#" + userChosenColour).addClass("pressed");
        setTimeout(function () {
            $("#" + userChosenColour).removeClass("pressed");
        }, 100);

        checkAnswer(userClickedPattern.length - 1);
    }
});


$("body").keypress(function () {
    if (firstStart == false) {
        firstStart = true;
        nextSequence();
    }
})

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}



