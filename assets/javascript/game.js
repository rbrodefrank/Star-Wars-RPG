

//Variables
var damage = 0;
var characters = [];
var characterSelect = true;
var fighting = false;
var enemySelect = false;
var selectedCharacter = "";
var opponent = "";
var opponentsDefeated = 0;
//Character Objects
//Character Name
//Health Points
//Attack Power
//Counter Attack Power
//ID of div
//image source

var obiwan = {
    characterName: "Obi-Wan Kenobi",
    healthPoints: 120,
    attackPower: 8,
    counterAttack: 20,
    divID: "",
    audio: new Audio("assets/sounds/obiwan.mp3"),
    victoryAudio: new Audio("assets/sounds/victoryJedi.mp3"),
}
characters.push(obiwan);

var yoda = {
    characterName: "Yoda",
    healthPoints: 180,
    attackPower: 4,
    counterAttack: 25,
    divID: "",
    audio: new Audio("assets/sounds/yoda.mp3"),
    victoryAudio: new Audio("assets/sounds/victoryJedi.mp3"),
}
characters.push(yoda);

var maul = {
    characterName: "Darth Maul",
    healthPoints: 100,
    attackPower: 17,
    counterAttack: 5,
    divID: "",
    audio: new Audio("assets/sounds/maul.mp3"),
    victoryAudio: new Audio("assets/sounds/victorySith.mp3"),
}
characters.push(maul);

var sidious = {
    characterName: "Darth Sidious",
    healthPoints: 140,
    attackPower: 10,
    counterAttack: 15,
    divID: "",
    audio: new Audio("assets/sounds/sidious.mp3"),
    victoryAudio: new Audio("assets/sounds/victorySith.mp3"),
}
characters.push(sidious);

//Hide restart button
$("#restart-btn").hide();

//Function Declarations
function restart() {
    //reset variables
    obiwan.healthPoints = 120;
    yoda.healthPoints = 180;
    maul.healthPoints = 100;
    sidious.healthPoints = 140;
    damage = 0;
    characterSelect = true;
    fighting = false;
    enemySelect = false;
    selectedCharacter = "";
    opponent = "";
    opponentsDefeated = 0;
    $("#restart-btn").hide();

    $("#obiwan-div div:last-child").text(obiwan.healthPoints);
    $("#yoda-div div:last-child").text(yoda.healthPoints);
    $("#maul-div div:last-child").text(maul.healthPoints);
    $("#sidious-div div:last-child").text(sidious.healthPoints);
    //move all characters to select area
    for (var i = 0; i < characters.length; i++) {
        characters[i].divID.show();
        characters[i].divID[0].style.borderColor = "green";
        characters[i].divID[0].style.backgroundColor = "white";
        characters[i].divID.detach().appendTo("#character-select");
    }
}

var saberOn = new Audio("assets/sounds/SaberOn.mp3");
var wilhelm = new Audio("assets/sounds/wilhelm.mp3");
var saberSounds = [new Audio("assets/sounds/clash0.mp3"),
new Audio("assets/sounds/clash1.mp3"),
new Audio("assets/sounds/clash2.mp3"),
new Audio("assets/sounds/clash3.mp3")]

function saberFight() {
    var rand = Math.floor(Math.random()*4);
    saberSounds[rand].play();
}


//Creating Character Elements
$("#character-select").append("<div id='obiwan-div'></div>");
obiwan.divID = $("#obiwan-div");
$("#obiwan-div").html('<img src="assets/images/obiwan.jpg" alt="Obi-Wan Kenobi" class="character-portrait">');

$("#character-select").append("<div id='yoda-div'></div>");
yoda.divID = $("#yoda-div");
$("#yoda-div").html('<img src="assets/images/yoda.jpg" alt="Yoda" class="character-portrait">');

$("#character-select").append("<div id='maul-div'></div>");
maul.divID = $("#maul-div");
$("#maul-div").html('<img src="assets/images/maul.jpg" alt="Darth Maul" class="character-portrait">');

$("#character-select").append("<div id='sidious-div'></div>");
sidious.divID = $("#sidious-div");
$("#sidious-div").html('<img src="assets/images/sidious.jpg" alt="Darth Sidious" class="character-portrait">');
// console.log(characters);

//Add to character elements
for (var i = 0; i < characters.length; i++) {
    // console.log(characters[i]);
    characters[i].divID.addClass("character text-center p-2");
    characters[i].divID.attr("object", characters[i].characterName);
    characters[i].divID.prepend("<div>" + characters[i].characterName + "</div>");
    characters[i].divID.append("<div>" + characters[i].healthPoints + "</div>");
    // console.log(characters[i].divID.attr("object"));
}

//Character/Enemy Select
$(".character").on("click", function () {
    // if in character selection
    if (characterSelect) {
        var charName = $(this).attr("object");
        // console.log(selectedCharacter);
        //put selected character in #character and the rest in #enemies
        for (var i = 0; i < characters.length; i++) {
            if (characters[i].characterName === charName) {
                characters[i].divID.detach().appendTo("#character");
                selectedCharacter = characters[i];
                characters[i].audio.play();
            } else {
                // console.log(characters[i].divID);
                characters[i].divID[0].style.borderColor = "black";
                characters[i].divID[0].style.backgroundColor = "red";
                characters[i].divID.detach().appendTo("#enemies");
            }
        }
        enemySelect = true;
        characterSelect = false;
    } else if (enemySelect && $(this).attr("object") != selectedCharacter.characterName) {
        var defender = $(this).attr("object");
        for (var i = 0; i < characters.length; i++) {
            if (characters[i].characterName === defender) {
                opponent = characters[i];
                // console.log(opponent);
                characters[i].divID.detach().appendTo("#defender");
                saberOn.play();
                break;
            }
        }
        enemySelect = false;
        fighting = true;
    }
});

//Attack Button onClick
$("#attack").on("click", function () {
    if (fighting) {
        //increase damage by attackpower
        damage += selectedCharacter.attackPower;
        //reduce opponent's health by damage
        opponent.healthPoints -= damage;
        //check if opponent died
        if (opponent.healthPoints <= 0) {
            opponent.divID.hide();
            fighting = false;
            enemySelect = true;
            opponentsDefeated++;
            saberFight();
            $("#message").text("You defeated " + opponent.characterName + ", you can choose to fight another enemy.");
            if (opponentsDefeated >= 3) {
                //you won!
                fighting = false;
                $("#message").text("You Won! Game Over!");
                $("#restart-btn").show();
                selectedCharacter.victoryAudio.play();
            }
        } else {
            $("#defender div:last-child div:last-child").text(opponent.healthPoints);
            $("#message").html("You attacked " + opponent.characterName + " for " + damage + " damage. <br>" + opponent.characterName + " attacked you back for " + opponent.counterAttack + " damage.");
            selectedCharacter.healthPoints -= opponent.counterAttack;
            $("#character div div:last-child").text(selectedCharacter.healthPoints);
            if (selectedCharacter.healthPoints <= 0) {
                //game over!
                fighting = false;
                wilhelm.play();
                $("#message").text("You Lost! Game Over!");
                $("#restart-btn").show();

            } else {
                saberFight();
            }
        }
    } else if (opponentsDefeated >= 3) {
        $("#message").text("You Won! Game Over!");
        $("#restart-btn").show();
    } else if (selectedCharacter.healthPoints <= 0) {
        $("#message").text("You Lost! Game Over!");
        $("#restart-btn").show();
    } else {
        $("#message").text("No enemy here.");
    }
});

//Restart Button onClick
$("#restart-btn").on("click", function () {
    selectedCharacter.victoryAudio.pause();
    selectedCharacter.victoryAudio.currentTime = 0;
    //console.log(selectedCharacter.victoryAudio);
    restart();
});

