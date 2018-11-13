

//Variables
var damage = 0;

//Character Objects
    //Character Name
    //Health Points
    //Attack Power
    //Counter Attack Power

    var obiwan = {
        characterName: "Obi-Wan Kenobi",
        healthPoints: 120,
        attackPower: 8,
        counterAttack: 10,
    }

    var luke = {
        characterName: "Luke Skywalker",
        healthPoints: 100,
        attackPower: 10,
        counterAttack: 5,
    }

    var maul = {
        characterName: "Darth Maul",
        healthPoints: 180,
        attackPower: 5,
        counterAttack: 25,
    }

    var sidious = {
        characterName: "Darth Sidious",
        healthPoints: 150,
        attackPower: 6,
        counterAttack: 20,
    }
//Function Calls

function restart() {
    obiwan.healthPoints = 120;
    luke.healthPoints = 100;
    maul.healthPoints = 180;
    sidious.healthPoints = 150;
    damage = 0;
}

//Character Select

//Attack Button onClick

