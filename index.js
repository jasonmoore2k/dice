var test = {
    name: "",
    actions: [
        {
            dice: [ "1D", "1D+1", "1D+2" ]
        },
        {
            dice: [ "2D", "2D+1", "2D+2" ]
        },
        {
            dice: [ "3D", "3D+1", "3D+2" ]
        },
        {
            dice: [ "4D", "4D+1", "4D+2" ]
        },
        {
            dice: [ "5D", "5D+1", "5D+2" ]
        },
        {
            dice: [ "6D", "6D+1", "6D+2" ]
        },
        {
            dice: [ "1D", "7D+1", "7D+2" ]
        },
        {
            dice: [ "8D", "8D+1", "8D+2" ]
        }
    ]
};

function render() {
    renderCharacter();
    renderActions();
}

function renderCharacter() {
    var templateString = document.getElementById('character_template').innerHTML;
    var template = Handlebars.compile(templateString);
    document.getElementById("character").innerHTML = template(test);
}

function renderActions() {
    var templateString = document.getElementById('actions_template').innerHTML;
    var template = Handlebars.compile(templateString);
    document.getElementById("actions").innerHTML = template(test);
}

function rollAction(name, dice) {
    var roll = getDiceRollResult(dice);
    var templateString = document.getElementById('message_template').innerHTML;
    var template = Handlebars.compile(templateString);
    var messageHtml = template({ name: name, dice: dice, roll: roll });
    var messageNode = createNodeFromString(messageHtml);
    document.getElementById("messages").prepend(messageNode);
}

function getDiceRollResult(dice) {
    var parsedDice = tryParseDice(dice);
    if (parsedDice) {
        var result = 0;
        for (let i = 0; i < parsedDice.numDice; i++) {
            result += Math.ceil(Math.random() * parsedDice.diceSides);
        }
        result += parsedDice.adjustment;
        return result;
    }
    else {
        return null;
    }
}

let dicePattern = new RegExp('(?<numDice>\\d+)?d(?<diceSides>\\d+)?(?<adjustment>[\\+\\-]\\d+)?', "i");

function tryParseDice(dice) {

    var parsedDice = dicePattern.exec(dice);

    if (parsedDice) {
        var numDiceString = parsedDice.groups["numDice"];
        var numDice = numDiceString ? parseInt(numDiceString) : 1;
        var diceSidesString = parsedDice.groups["diceSides"];
        var diceSides = diceSidesString ? parseInt(diceSidesString) : 6;
        var adjustmentString = parsedDice.groups["adjustment"];
        var adjustment = adjustmentString ? parseInt(adjustmentString) : 0;
        return {
            numDice: numDice,
            diceSides: diceSides,
            adjustment: adjustment
        }
    }

    return null;
}

function createNodeFromString(str) {
    var wrapper = document.createElement('div');
    wrapper.innerHTML = str;
    return wrapper.firstElementChild;
}
