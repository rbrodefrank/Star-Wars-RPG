

//Variables
var damage = 0;
var characters = [];
var characterSelect = true;
var fighting = false;
var enemySelect = false;
var selectedCharacter = "";
var opponet = "";
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
    //move all characters to select area
    for(var i = 0; i<characters.length; i++) {
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
        selectedCharacter = $(this).attr("object");
        // console.log(selectedCharacter);
        //put selected character in #character and the rest in #enemies
        for (var i = 0; i < characters.length; i++) {
            if (characters[i].characterName === selectedCharacter) {
                characters[i].divID.detach().appendTo("#character");
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
                opponet = characters[i];
                // console.log(opponet);
                characters[i].divID.detach().appendTo("#defender");
                break;
            }
        }
        enemySelect = false;
        fighting = true;
    }
});

//Attack Button onClick
$("#attack").on("click", function() {
    
});
