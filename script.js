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

var xpos = 0;
var ypos = 0;
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
    + "\nShorthand commands n,s,w,e correspond to North, South"
    + " East and West respectively."
    + " The 'take' command will remove the item at"
    + " the current location. the take command will remove the identified\n"
    + " object from the game world, and add it to the player's inventory.\n"
    + "listin and ls display the contents of the player inventory."
    + "The help command displays this text." 
    + " The input parser is case insensitive.";


//GAME OBJECTS DEFINED HERE

 var Item = function (_name, _type) {
     /* The item object shall be the super class of all in game items that can be
     * taken with take.
     * an item has a string for name, and a string for type should be all that's
     * necessary for now */

     this.name = _name;
     this.type = _type;
     this.toString = function () {
         return "Item: " + this.name + " type: " + this.type;
     };
 };


function initLocations () {

    /* function for initializing each location
     * and filling locats global array
     * This seems dirty, any suggestions are welcome
     */

    var _corridor = new locat (0, "corridor", "");
    locats[locats.length] = _corridor;
    
    var _suite = new locat (1, "suite", "It contains a complimentary water bottle!");
    _suite.items[0] = new Item("complimentary water bottle", "drink");
    locats[locats.length] = _suite;
    
    var _kitchen = new locat (2, "kitchen", "You see a tasty cake!");
    _kitchen.items[0] = new Item("tasty cake", "food");
    locats[locats.length] = _kitchen;

    var _presentationRoom = new locat (3, "presentation Room", "You notice mysterious blue prints");
    _presentationRoom.items[0] = new Item ("mysterious blue prints", "quest It.");
    locats[locats.length] = _presentationRoom;
    
    var _bar = new locat (4, "bar", "Somebody has left his unfinished space drink on the bar");
    _bar.items[0] = new Item ("space beer", "diuretic");
    locats[locats.length] = _bar;

    var _closet = new locat (5, "supply closet", "There's a crowbar here");
    _closet.items[0] = new Item ("crowbar", "weapon");
    locats[locats.length] = _closet;

    var _restroom = new locat (6, "restroom", "You see a roll of toilet paper");
    _restroom.items[0] = new Item ("toilet paper", "cleaner");
    locats[locats.length] = _restroom;

    var _armory = new locat (7, "armory", "Inside of a glass case, you see a laser gun!");
    _armory.items[0] = new Item ("space laser gun", "weapon");
    locats[locats.length] = _armory;

    var _hospitalRoom = new locat (8, "hospital room", "There is a medkit here");
    _hospitalRoom.items[0] = new Item ("medkit", "healer");
    locats[locats.length] = _hospitalRoom;

    var _freightDeck = new locat (9, "Freight Deck", "There is a steel shard here");
    _freightDeck.items[0] = new Item ("steel shard", "scrap");
    locats[locats.length] = _freightDeck;

    var _office = new locat (10, "office", "On top of the desk, there is a laptop");
    _office.items[0] = new Item ("laptop", "computer");
    locats[locats.length] = _office;

 }

function init() {
    disableButton("south");
    disableButton("east");
    disableButton("west");
    //initialize items array
    initLocations();
    updateText(getLocation());
}

//This function will handle the take command.
function take () {
    /* getLocation calls function for the players current location.
     * because each location function returns the corresponding element
     * of the locats array, I can use this in updateText, which calls the tostring
     * or perform operations on that array element directly!
     */
    var locItems = getLocation().items;
    
    for (var i in locItems) {
        inventory[inventory.length] = locItems[i];
    }
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
    else if (msg === getLocation()) {
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
    if (canNorth === false) {
	updateText ("predicament of not being able to move in this direction");
	return;
    }
    ypos+=1;
    var message = getLocation();
    updateText(message);

}

function but_south() {
    if (canSouth === false) {
	updateText("You can not move in this direction!");
	return;
    }
    ypos+=-1;
    var message = getLocation();
    updateText(message);

}


function but_east() {
    if (canEast === false) {
	updateText ("You can not move in this direction!");
	return;
    }
    xpos+=1;
    var message = getLocation();
    updateText(message);

}

function but_west() {
    if (canWest === false) {
	updateText("You can not move in this direction!");
	return;
    }
    xpos-=1;
    var message = getLocation();
    updateText(message);

}

function currentCoords () {
    return "(" + xpos + ", " + ypos + ")";
}

function getLocation() {
    /* Switch statements
     * using y position as a test variable because it is easier
     * to put corridor possibility in one case, since y position of 1 is always
     * the corridor. */

    switch (ypos) {
    case 1:
        if(xpos >= 0 && xpos <= 4) {
            return corridor ();
        }
        /*This seems like a sloppy solution, which is a shame, because I thought
         * that the default switch case was a perfect solution.
         */
        else {
            return boundary();
        }
        break;
        
    case 0:
        if(xpos === 0){
            return suite();
        }
        else if (xpos === 1) {
            return bar();
        }
        else if(xpos === 2){
            return restroom();
        }
        else if(xpos === 3) {
            return armory();
        }
        else if(xpos === 4) {
            return freightDeck();
        }
        break;

    case 2:
        if(xpos === 0) {
            return kitchen();
        }
        else if (xpos === 1) {
            return presentationRoom();
        }
        else if(xpos === 2) {
            return closet();
            
        }
        else if(xpos === 3) {
            return hospitalRoom();
        }
        else if(xpos === 4) {
            return office();
        }
        break;
        
        
//Well if it isn't the hallway or some unique location, then the player
//is definitely at a boundary
    default:
        alert("if you are at a boundary, this should be executed.");
        return boundary();
        break;
    }
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
    //for listing inventory
    else if (input === "ls" || input === "listin") {
        updateText(inventory);
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