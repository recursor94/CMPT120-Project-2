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
var bool_canSouth = false;
var bool_canEast = false;
var bool_canWest = false; //we start in a room south of the hall, so all we can move is north initially.

//important var which will appear whenever the user inputs an invalid command.
var validCommands = "\nValid Directions are: (North, South, East and West)\n"
    + "These Commands move the player one unit in that direction\n"
    + "Ex: North increments y position by one,"
    + " West decrements x positon by one."
    + "\nShorthand commands n,s,w,e correspond to North, South"
    + " East and West respectively."
    + " The input parser is case insensitive.";

/*function that responds to input prompt if debug commands are detected in
parse input. Made for testing purposes when big changes occur and the situation
that I desire to be tested can not yet be obtained directly in the game
environment. */

function admin_debug (com) {
    if (com === "setpos") {
        xpos = prompt ("Enter a new player x position");
        ypos = prompt ("Enter a new player y position");
        alert ("(" + xpos + ", " + ypos);
        getLocation ();
    }
        
}

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
    //This is the scrolling adjustment line:
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
    //    alert ("getLocation ()");
    //  alert("ypos:" + ypos);
    //Switch statements
    //using y position as a test variable because it is easier
    //to put corridor possibility in one case, since y position of 1 is always
    //the corridor.
    switch (ypos) {
    case 1:
        corridor ();
        break;
        
    case 0:
        if(xpos === 0){
            suite();
        }
        else if (xpos === 1) {
            bar();
        }
        else if(xpos === 2){
            restroom();
        }
        else if(xpos === 3) {
            armory();
        }
        else if(xpos === 4) {
            freightDeck();
        }
        break;

    case 2:
        if(xpos === 0) {
            kitchen();
        }
        else if (xpos === 1) {
            presentationRoom();
        }
        else if(xpos === 2) {
            closet();
            
        }
        else if(xpos === 3) {
            hospitalRoom();
        }
        
//Well if it isn't the hallway or some unique location, then the player
//is definitely at a boundary
    default: 
        boundary();
        break;
    }

    /*    if(xpos === 0 && ypos === 0) {
     
     testLocation("Luxurious Suite");
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
     } */

    
    //conditional for game boundaries
    /* The boundary reached message will always be displayed no matter
     where the player is in one direction if he is at the boundary in
     the other direction. I have decided that this is desireable. He 
     will be pushed back to the hall if tries to push forward. */
    //boundary is x = 3 so he will not be able to continue forward
    //after that point.
/*    else if (xpos >= 3) {
	testLocation ("Corridor Outer Limits");
	return "Corridor Outer Limits";
	
    }
    else if (xpos <= -1) {
	testLocation("leftbound");
	return "VIP Residential Sector Corridor";
    }

    else {
	testLocation("VIP Residential Sector Corridor");
	return "VIP Residential Sector Corridor";
    } */
} 

function testLocation (location) {
    if(location === "Luxurious Suite") {
	disableButton("south");
	disableButton("east");
	disableButton("west");
    }
    else if(location === "Civilian Kitchen") {

	if(bool_kitchen === false) {
	    score+=5;
	    bool_kitchen = true;
	}

	disableButton("north");
	disableButton("east");
	disableButton("west");
    }

    else if (location === "Crew Presentation Room") {
	if(bool_presentation === false) {
	    bool_presentation = true;
	    score += 5;
	}
	disableButton("north");
	disableButton("east");
	disableButton("west");
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

    else if (location === "Luxury Space Bar") {
	if(bool_bar === false) {
	    score += 5;
	    bool_bar = true;
	}
	disableButton("south");
	disableButton("east");
	disableButton("west");
    }
    else if (location === "Unlocked Supply Closet") {
	if(bool_closet === false) {
	    score += 5;
	    bool_closet = true;
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
	if(bool_restroom === false) {
	    score += 5;
	    bool_restroom = true;
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
   admin_debug(input);
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
