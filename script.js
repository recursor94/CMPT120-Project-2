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
var visited_kitchen = false;
var visited_presentation = false;
var visited_corridor = false;
var visited_bar = false;
var visited_closet = false;
var visited_restroom = false;
var visited_armory = false;
var visited_hospitalRoom = false;
var visited_freightDeck = false;
var visited_office = false;
//vars for testing if you can move or not. Used in direction functions.
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
    + " The 'take' command should preceed the name of a valid item in"
    + " the current location. the take command will remove the identified\n"
    + " object from the game world, and add it to the player's inventory.\n"
    + "The help command displays this text."
    + " The input parser is case insensitive.";

/*function that responds to input prompt if debug commands are detected in
parse input. Made for testing purposes when big changes occur and the situation
that I desire to be tested can not yet be obtained directly in the game
environment. */

//GAME OBJECTS DEFINED HERE

var Player = function () {
    /*The player object currently only has an inventory array.
     * While this could just be represented by an array, it is better
     * to wrap it inside a player object so that it will be easier
     * to add new attributes to the player as the game evolves.
     */
    this.inventory = new Array();
    this.inventory[1] = "Andrew";
    this.inventory[2] = 18.5;
    this.toString = function () {
        return "Inventory Contents:" + this.inventory;
    };
};

var Item = function (_name, _type) {
    //The item object shall be the super class of all in game items that can be
    //taken with take.

    this.name = _name;
    this.type = _type;
    this.toString = function () {
        return "name: " + this.name + " type: " + this.type;
    };
};





function init() {
    disableButton("south");
    disableButton("east");
    disableButton("west");
    updateText(getLocation());
}
function admin_debug (com) {
    if (com === "setpos") {
        xpos = prompt ("Enter a new player x position");
        ypos = prompt ("Enter a new player y position");
        alert ("(" + xpos + ", " + ypos);
        getLocation ();
    }
        
}

function updateText(msg) {
    var textArea = document.getElementById("gametext");
    //    alert("function has been called.");
    //    alert(textArea).value;

    //necessary test for not understood text.
    if(msg === "I don't understand that") {
        textArea.value = textArea.value + "\n" + msg + validCommands;
        textArea.scrollTop = textArea.scrollHeight;
    }
    //have to make sure that if the player enters help, he doesn't get the
    //"you are now in the" message.
    else if(msg === validCommands) {
        textArea.value = textArea.value + "\n" + msg;
        textArea.scrollTop = textArea.scrollHeight;
    }
    
    else {
        textArea.value = textArea.value + "\n\n" 
            + "You are now in the " + msg + "\nScore: " + score
	    + " current coordinates: " + testcoords();
        //    alert("You made it here fine.");
        //This is the scrolling adjustment line:
        textArea.scrollTop = textArea.scrollHeight;
    }
}
function but_north() {
    //test alert
    //    alert("but north function entered");

    if (canNorth === false) {
	updateText ("predicament of not being able to move in this direction");
	return;
    }
    ypos+=1;
    var message = getLocation();
    //test message:state current coords.
    //alert(testcoords());
    updateText(message);

}

function but_south() {
    //test alert
    //alert("but south function entered");
    if (canSouth === false) {
	updateText("predicament of not being able to move in this direction");
	return;
    }
    ypos+=-1;
    var message = getLocation();
    //test message:state current coords.
    //alert(testcoords());
    updateText(message);

}

function but_east() {
    //test alert
    // alert("but east function entered");
    if (canEast === false) {
	updateText ("predicament of not being able to move in this direction");
	return;
    }
    xpos+=1;
    var message = getLocation();
    //test message:state current coords.
    //alert(testcoords());
    updateText(message);

}

function but_west() {
    //test alert
    //alert("but west function entered");
    if (canWest === false) {
	updateText("predicament of not being able to move in this direction");
	return;
    }
    xpos-=1;
    var message = getLocation();
    //test message:state current coords.
    //alert(testcoords());
    updateText(message);

}

function testcoords () {
    return "(" + xpos + ", " + ypos + ")";
}

function getLocation() {
    //    alert ("getLocation ()");
    //  alert("ypos:" + ypos);
    //Switch statements
    //using y position as a test variable because it is easier
    //to put corridor possibility in one case, since y position of 1 is always
    //the corridor.
    switch (ypos) {
    case 1:
        if(xpos >= 0 && xpos <= 4) {
            return corridor ();
        }
        /*This seems like a sloppy solution, which is a shame, because I thought
         * that the default switch case was a perfect solution.
         */
        //JUST LEARNED SOMETHING COOL--IF YOU UPDATE A TEXTAREA
        //WITHOUT ITS PARENTHESIS, THE BODY OF THE FUNCTION WILL APPEAR
        //INSTEAD OF THE RESULT OF THE FUNCTION
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


function testLocation (location) {
    if(location === "Luxurious Suite") {
	disableButton("south");
	disableButton("east");
	disableButton("west");
    }
    else if(location === "Civilian Kitchen") {

	if(visited_kitchen === false) {
	    score+=5;
	    visited_kitchen = true;
	}

	disableButton("north");
	disableButton("east");
	disableButton("west");
    }

    else if (location === "Crew Presentation Room") {
	if(visited_presentation === false) {
	    visited_presentation = true;
	    score += 5;
	}
	disableButton("north");
	disableButton("east");
	disableButton("west");
    }

    else if (location === "VIP Residential Sector Corridor") {
	//Whenever the user returns to the corridor, he can once again
	//move in any direction.
	if(visited_corridor === false) {
	    score += 5;
	    visited_corridor = true;
	    
	}
	enableAllButtons();

    }

    else if (location === "Luxury Space Bar") {
	if(visited_bar === false) {
	    score += 5;
	    visited_bar = true;
	}
	disableButton("south");
	disableButton("east");
	disableButton("west");
    }
    else if (location === "Unlocked Supply Closet") {
	if(visited_closet === false) {
	    score += 5;
	    visited_closet = true;
	}
	disableButton("north");
	disableButton("east");
	disableButton("west");
    }

    else if (location === "Corridor Outer Limits") {
	//have to enable all buttons first so that when leaving a room it appears properly
	enableAllButtons();
	disableButton("east");
	disableButton ("north");
	disableButton ("south");
    }

    else if (location === "leftbound") {
	enableAllButtons();
	disableButton("west");
	disableButton ("north");
	disableButton ("south");
    }
    else {
	//if restroom
	if(visited_restroom === false) {
	    score += 5;
	    visited_restroom = true;
	}
	disableButton("south");
	disableButton("east");
	disableButton("west");
    }
}

function parseInput() {
    var textfield = document.getElementById("input");
    //    alert(textfield);
    var input = textfield.value;
    textfield.value = "";
    //    alert(input);
    input = input.toLowerCase(); //important to make conditionals easier and just test for word input rather than having to worry about case.
    //    alert(input);
    //this will simply go through doing nothing if it is not a
    //debug command, so why not do it?
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
