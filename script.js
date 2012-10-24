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
var textArea;
var username;
var xpos = 0;
var ypos = 0;
var xupbound = 6;
var xlowbound = -6;
var yupbound = 6;
var ylowbound = -6;
var score = 0;
var bool_kitchen = false;
var bool_presentation = false;
var bool_corridor = false;
var bool_bar = false;
var bool_closet = false;
var bool_restroom = false;
//vars for testing if you can move or not. Used in direction functions.
var bool_canNorth = true;
var bool_canSouth = true;
var bool_canEast = true;
var bool_canWest = true;

//important var which will appear whenever the user inputs an invalid command.
var validCommands = "\nValid Directions are: (North, South, East and West)\n"
		    + "These Commands move the player one unit in that direction\n"
		    + "Ex: North increments y position by one,"
		    + " West decrements x positon by one."
		    + "\nShorthand commands n,s,w,e correspond to North, South"
		    + " East and West respectively."
		    + " The input parser is case insensitive.";


function but1() {
    var greeting = "Hello, ";
    username = prompt("What is your name, friend?");
    confirm(greeting + username + ". Do you want to play a game?");
    var result = prompt("How are you feeling?");
    alert("You are feeling " + result + "? I am glad to hear that!");
}
function updateText(msg) {
    textArea = document.getElementById("gametext");
    //    alert("function has been called.");
    //    alert(textArea).value;

    //necessary test for not understood text.
    if(msg === "I don't understand that") {
        textArea.value = textArea.value + "\n" + msg + validCommands;
        textArea.scrollTop = textArea.scrollHeight;
        return;
    }
    
    textArea.value = textArea.value + "\n\n" 
        + "You are now in the " + msg + "\nScore: " + score
	+ " current coordinates: " + testcoords();
    //    alert("You made it here fine.");
        textArea.scrollTop = textArea.scrollHeight;
}

function but_north() {
    //test alert
    //    alert("but north function entered");

    if (bool_canNorth === false) {
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
    if (bool_canSouth === false) {
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
    if (bool_canEast === false) {
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
    if (bool_canWest === false) {
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

    if(xpos === 0 && ypos === 0) {
	
	//testLocation("Luxurious suite");
	return "Luxurious Suite";
    }
    else if (xpos === 0 && ypos === 2) {

	testLocation("Civilian Kitchen");
	return "Civilian Kitchen";
    }
    
    else if (xpos === 1 && ypos === 2) {
	
	testLocation("Crew Presentation Room");
	return "Crew Presentation Room";
    }

    else if (xpos === 1 && ypos === 0) {
	testLocation("Luxury Space Bar");
	return "Luxury Space Bar";
    }

    else if (xpos === 2 && ypos === 2) {
	testLocation("Unlocked Supply Closet");
	return "Unlocked Supply Closet";
    }
    
    else if (xpos === 2 && ypos === 0) {
	testLocation("Public Restroom");
	return "Public Restroom";
    }

    
    //conditional for game boundaries
    /* The boundary reached message will always be displayed no matter
     where the player is in one direction if he is at the boundary in
     the other direction. I have decided that this is desireable. He 
     will be pushed back to the hall if tries to push forward. */
    else if (xpos >= xupbound || ypos >= yupbound || xpos <= xlowbound || ypos <= ylowbound) {

	/* first test includes positions equal to the boundary,
	 that will yield bottom location warning to be returned.
	 these tests are for pushing back the player if he does
	 in fact exceed the boundary */

	if(xpos > xupbound) {
            
	    xpos-=1;
	    return "VIP Residential Sector Corridor";
	}

	else if (xpos < xlowbound) {

	    xpos+=1;
	    return "VIP Residential Sector Corridor";
	}

	if (ypos > yupbound) {
	    ypos-=1;
	    return "VIP Residential Sector Corridor";
	}
	else if (ypos < ylowbound) {

	    ypos+=1;
	    return "VIP Residential Sector Corridor";
	}
	

	return "boundary of the passenger section."
	    + "You can not legally continue any further. turn back.";

    }
    
    //catch all if player has not reached a unique location

    else {

	testLocation("VIP Residential Sector Corridor");
	return "VIP Residential Sector Corridor";

    }
    
}

function testLocation (location) {

    if(location === "Civilian Kitchen") {

	if(bool_kitchen === false) {
	    score+=5;
	    bool_kitchen = true;
	}

	disableButton("north");
	disableButton("east");
	disableButton("west");
    }

    else if (bool_presentation === false && location === "Crew Presentation Room") {
	if(bool_presentation === false) {
	    bool_presentation = true;
	    score += 5;

	}
    }

    else if (location === "VIP Residential Sector Corridor") {
	//Whenever the user returns to the corridor, he can once again
	//move in any direction.
	if(bool_corridor === false) {
	    score += 5;
	    bool_corridor = true;
	    
	}
	enableAllButtons();

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
    else {
        updateText("I don't understand that");
    }
}

function disableButton(direction) {
    //Disables button associated with string.
    var but = null;

    if (direction === "north") {
	bool_canNorth = false;
	but = document.getElementById("n");
	but.disabled = true;
    }
    
    else if (direction === "south") {
	bool_canSouth = false;
	but = document.getElementById("s");
	but.disabled = true;
    }
    
    else if (direction === "east") {
	bool_canEast = false;
	but = document.getElementById("e");
	but.disabled = true;
    }
    else if (direction === "west") {
	
	bool_canWest = false;
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
    bool_canNorth = true;
    bool_canSouth = true;
    bool_canEast = true;
    bool_canWest = true;
}