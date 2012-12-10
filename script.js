/* Copyright 2012 Andrew Spano © This program is distrbuted under the
 terms and conditions of the GNU General Public License


 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.
 
 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.

 */

var row = 0;
var col = 0;
var score = 5;
var locats = []; // empty locations array to be instantiated in init function
//vars for testing if you can move or not. Used in direction functions.
var inventory = []; // array representing items taken by player
var canNorth = true;
var canSouth = false;
var canEast = false;
var canWest = false; //we start in a room south of the hall, so all we can move is north initially.
//important var which will appear whenever the user inputs an invalid command.
var validCommands = "\nValid Directions are: (North, South, East and West)\n"
    + "These Commands move the player one unit in that direction\n"
    + "Ex: North increments y position by one,"
    + " West decrements x positon by one."
    + "\nShorthand commands n,s,e,w correspond to North, South"
    + " East and West respectively."
    + " The 'take' command will remove the item at"
    + " the current location. the take command will remove the identified\n"
    + " object from the game world, and add it to the player's inventory.\n"
    + "listin and ls display the contents of the player inventory."
    + "The help command displays this text." 
    + " The input parser is case insensitive.";
var puzzleCompleted = false;
var currentLocation = "suite"; // will be changed after every location change

/* each integer represents an index of the locats array. the row and
 * column of the two dimensional array correspond to where the 
 * indicated location would exist in relation to the map
 */

var navControl = null;

function move (direction) {

    switch(direction) {
//according to material, non indented switch case is fine.
        case "north":
        row = row + 1;
        break;
        case "south":
        row = row -1;
        break;
        case "east":
        col = col + 1;
        break;
        case "west":
        col = col -1;
        break;
        
    }
    return getLocation();
}

//name same as id, and type serves as description
 var Item = function (_name, _type) {
     /* taken with take.
     * an item has a string for name, and a string for type should be all that's
     * necessary for now */

     this.name = _name;
     this.type = _type;
     this.toString = function () {
         return "Item: " + this.name + " type: " + this.type;
     };
 };

//function for testing if the player posses and item
function playerHasItem(item) {
    for(i in inventory) {
        if (inventory[i].name === item) {
            return true;
        }
    }
    return false;
}


function initLocations () {

    /* function for initializing each location
     * and filling locats global array
     * This seems dirty, any suggestions are welcome
     *EDIT:now they take a function too, because the navigation matrix was only getting locations, it wasn't executing their function before.
     */

    var _corridor = new locat (0, "corridor", "", corridor);
    locats[locats.length] = _corridor;
    
    var _suite = new locat (1, "suite", "It contains a complimentary water bottle!", suite);
    _suite.items[0] = new Item("complimentary water bottle", "drink");
    locats[locats.length] = _suite;
    
    var _kitchen = new locat (2, "kitchen", "You see a tasty cake!", kitchen);
    _kitchen.items[0] = new Item("tasty cake", "food");
    locats[locats.length] = _kitchen;

    
    var _bar = new locat (3, "bar", "Somebody has left his unfinished space drink on the bar", bar);
    _bar.items[0] = new Item ("space beer", "diuretic");
    locats[locats.length] = _bar;

    
    var _presentationRoom = new locat (4, "presentation Room", "You notice mysterious blue prints. They seem...Important...very important.", presentationRoom);
    _presentationRoom.items[0] = new Item ("mysterious blue prints", "quest It.");
    locats[locats.length] = _presentationRoom;

    

    var _closet = new locat (5, "supply closet", "There's a crowbar here", closet);
    _closet.items[0] = new Item ("crowbar", "weapon");
    locats[locats.length] = _closet;

    var _restroom = new locat (6, "restroom", "You see a roll of toilet paper", restroom);
    _restroom.items[0] = new Item ("toilet paper", "cleaner");
    locats[locats.length] = _restroom;

    var _armory = new locat (7, "armory", "Inside of a glass case, you see a laser gun!", armory);
    _armory.items[0] = new Item ("space laser gun", "weapon");
    locats[locats.length] = _armory;

    var _hospitalRoom = new locat (8, "hospital room", "There is a medkit here", hospitalRoom);
    _hospitalRoom.items[0] = new Item ("medkit", "healer");
    locats[locats.length] = _hospitalRoom;

    var _freightDeck = new locat (9, "Freight Deck", "There is a steel shard here", freightDeck);
    _freightDeck.items[0] = new Item ("steel shard", "scrap");
    locats[locats.length] = _freightDeck;

    var _office = new locat (10, "office", "On top of the desk, there is a laptop", office);
    _office.items[0] = new Item ("laptop", "computer");
    locats[locats.length] = _office;

    var _boundary = new locat (11, "boundary", "You can not move forward in this direction.", boundary);
    locats[locats.length] = _boundary;

 }

function init() {
    navControl = [ [1, 3, 5, 7, 9],
      [0, 0, 0, 0, 0, 11],
      [2, 4, 6, 8, 10]
    ];
    disableButton("south");
    disableButton("east");
    disableButton("west");
    //initialize items array
    initLocations();
    currentLocation = getLocation();
    updateText(currentLocation);
}

//This function will handle the take command.
function take () {
    /* getLocation calls function for the players current location.
     * because each location function returns the corresponding element
     * of the locats array, I can use this in updateText, which calls the tostring
     * or perform operations on that array element directly!
     */
    var locItems = getLocation().items;
    //lets avoid any problems with locations without any items. Though this seems sloppy
    if(!locItems.length > 0) {
        return;
    }
    
    for (var i in locItems) {
        inventory[inventory.length] = locItems[i];
    }
    locItems = [];
    alert(locItems);
    getLocation().clearDescription();
    //now update the text area to show updated description
    updateText("You have collected all of the items in this location");
}

function updateText(msg) {
    var textArea = document.getElementById("gametext");
    //necessary test for not understood text.
    if(msg === "I don't understand that") {
        textArea.value = textArea.value + "\n" + msg + validCommands;
        textArea.scrollTop = textArea.scrollHeight;
    }
    else if (msg === currentLocation) {
        textArea.value = textArea.value + "\n\n" 
            + "You are now in the " + msg + "\nScore: " + score
	    + " current coordinates: " + currentCoords();
        //This is the scrolling adjustment line:
        textArea.scrollTop = textArea.scrollHeight;
    }
    //in case I want to update the text to say anything else
    else {
        textArea.value = textArea.value + "\n\n" + msg;
        textArea.scrollTop = textArea.scrollHeight;
    }
}
function but_north() {
    if (!canNorth) {
	updateText ("You can not move in this direction!");
	return;
    }
    
    currentLocation = move("north");
    updateText(currentLocation);

}

function but_south() {
    if (!canSouth) {
	updateText("You can not move in this direction!");
	return;
    }
    currentLocation = move("south");
    updateText(currentLocation);

}


function but_east() {
    if (!canEast) {
	updateText ("You can not move in this direction!");
	return;
    }
    currentLocation = move("east");
    updateText(currentLocation);

}

function but_west() {
    if (!canWest) {
	updateText("You can not move in this direction!");
	return;
    }
    currentLocation = move("west");
    updateText(currentLocation);

}

function currentCoords () {
    return "(" + row + ", " + col + ")";
}

function getLocation() {
    var index = navControl[row][col];
    //first call the actual function, otherwise the functionality associated with the location will not work!
    locats[index].protocol();
    return locats[index];
}



function parseInput() {
    var textfield = document.getElementById("input");
    var input = textfield.value;
    textfield.value = "";
    input = input.toLowerCase(); //important to make conditionals easier and just test for word input rather than having to worry about case.

    if(input === "n" || input === "north") {
        but_north();
    }
    else if (input === "south" || input === "s") {
        but_south();
    }
    else if (input === "e" || input === "east") {
        but_east();
    }
    else if (input === "w" || input === "west") {
        but_west();
    }
    else if (input === "help") {
        updateText(validCommands);
    }
    else if (input === "take") {
        take();
    }
    //Conditional to handle decode command which should not work
    //unless the player has the blue prints and has not completed the puzzle
    else if (input === "decode blue prints" && currentLocation === locats[10] && !puzzleCompleted) {
        if(playerHasItem("mysterious blue prints")) {
            decodeBluePrints();
        }
    }
    //for listing inventory
    else if (input === "ls" || input === "listin" || input === "inventory") {
        if (inventory.length === 0) {
            updateText("Your inventory is empty");
        }
        else {
            updateText(inventory);
        }
    }
    else {
        updateText("I don't understand that");
    }
}

function disableButton(direction) {
    //Disables button associated with string.
    var but = null;

    if (direction === "north") {
	canNorth = false;
	but = document.getElementById("n");
	but.disabled = true;
    }
    
    else if (direction === "south") {
	canSouth = false;
	but = document.getElementById("s");
	but.disabled = true;
    }
    
    else if (direction === "east") {
	canEast = false;
	but = document.getElementById("e");
	but.disabled = true;
    }
    else if (direction === "west") {
	
	canWest = false;
	but = document.getElementById("w");
	but.disabled = true;
    }

}

function enableAllButtons() {
    var but = document.getElementById("n");
    but.disabled = false;
    but = document.getElementById("s");
    but.disabled = false;
    but = document.getElementById("e");
    but.disabled = false;
    but = document.getElementById("w");
    but.disabled = false;
    canNorth = true;
    canSouth = true;
    canEast = true;
    canWest = true;
}