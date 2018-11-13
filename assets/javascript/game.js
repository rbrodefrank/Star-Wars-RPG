

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
    counterAttack: 10,
    divID: "",
}
characters.push(obiwan);

var luke = {
    characterName: "Luke Skywalker",
    healthPoints: 100,
    attackPower: 10,
    counterAttack: 5,
    divID: "",
}
characters.push(luke);

var maul = {
    characterName: "Darth Maul",
    healthPoints: 180,
    attackPower: 5,
    counterAttack: 25,
    divID: "",
}
characters.push(maul);

var sidious = {
    characterName: "Darth Sidious",
    healthPoints: 150,
    attackPower: 6,
    counterAttack: 20,
    divID: "",
}
characters.push(sidious);

//Function Declarations
function restart() {
    obiwan.healthPoints = 120;
    luke.healthPoints = 100;
    maul.healthPoints = 180;
    sidious.healthPoints = 150;
    damage = 0;
    characterSelect = true;
    fighting = false;
    enemySelect = false;
    selectedCharacter = "";
    opponent = "";
    //move all characters to select area
    for (var i = 0; i < characters.length; i++) {
        characters[i].divID.show();
        characters[i].divID.detach().appendTo("#character-select");
    }
}

//Creating Character Elements
$("#character-select").append("<div id='obiwan-div'></div>");
obiwan.divID = $("#obiwan-div");

$("#character-select").append("<div id='luke-div'></div>");
luke.divID = $("#luke-div");

$("#character-select").append("<div id='maul-div'></div>");
maul.divID = $("#maul-div");

$("#character-select").append("<div id='sidious-div'></div>");
sidious.divID = $("#sidious-div");

// console.log(characters);

for (var i = 0; i < characters.length; i++) {
    // console.log(characters[i]);
    // console.log(characters[i]);
    characters[i].divID.addClass("character border text-center p-2");
    characters[i].divID.attr("object", characters[i].characterName);
    characters[i].divID.append("<div>" + characters[i].characterName + "</div>");
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
            } else {
                characters[i].divID.detach().appendTo("#enemies");
            }
        }
        enemySelect = true;
        characterSelect = false;
    } else if (enemySelect) {
        var defender = $(this).attr("object");
        for (var i = 0; i < characters.length; i++) {
            if (characters[i].characterName === defender) {
                opponent = characters[i];
                // console.log(opponent);
                characters[i].divID.detach().appendTo("#defender");
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
            $("#message").text("You defeated " + opponent.characterName + ", you can choose to fight another enemy.");
            if(opponentsDefeated >= 3) {
                //you won!
                $("#message").text("You Won! Game Over!");
            }
        } else {
            $("#defender div:last-child div:last-child").text(opponent.healthPoints);
            $("#message").text("You attacked " + opponent.characterName + " for " + damage + " damage. \n" + opponent.characterName + " attacked you back for " + opponent.counterAttack + " damage.");
            selectedCharacter.healthPoints -= opponent.counterAttack;
            $("#character div div:last-child").text(selectedCharacter.healthPoints);
            if(selectedCharacter.healthPoints <= 0){
                //game over!
            }
        }
    } else if (opponentsDefeated >= 3) {
        $("#message").text("You Won! Game Over!");
    }else {
        $("#message").text("No enemy here.");
    }
});
