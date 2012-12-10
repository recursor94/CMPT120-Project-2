//LOCATION EVENT HANDLERS START HERE

/*variables prefixed by can or visited_ are global booleans
 * declared and initialized in scripts.js. visited_ booleans are flags used to
 * calculate the score. As of this version, when a player visits a new location,
 * his score is incremented by 5. But if a player has visited a location already
 * his score must not be changed when he visits it again.*/

/* score is a global variable declared in scripts.js that represents the players  score.
 * Most locations should have some item in here
 * perhaps in the future it would be useful to define
 * each location as an object with an item attribute.
*/
//protocol uses functional paradigm to use function passed to it and call appropriate location function
var locat = function (_id, _name, _desc, _protocol) {

    /* prototype for location object, will be used in a global array,
     * each will have an id that denotes it's navigation equivalent number
     * the name of the location, and a description that explains what items
     * etc. are in the location.
     * The global locations array is in script.js. instantiated by init function
     */
    
    this.id = _id;
    this.name = _name;
    this.desc = _desc;
    this.hasVisited = false;
    this.items = [];
    this.protocol = _protocol;

    this.toString = function () {
        return this.name + "\n" + this.desc;
    };
    //to be called when all of the items in a location have been taken
    this.clearDescription = function () {
        this.desc = "You have collected all of the items in this location.";
        this.items = null;
    };
    
};

function corridor() {
    if(!locats[0].hasVisited) {
        score = score + 5;
        locats[0].hasVisited = true;
    }
    enableAllButtons();

    // this conditional is if the player is leftmost of the board, which means he can't continue west

    if(col <= 0) {
        disableButton("west");
    }

    else if(col >= 4) {
        disableButton("east");
    }
    return locats[0]; //useful for toStrings, and for player location!
}

function boundary() {
    //basic button disabling for right boundary in corridor
        disableButton("north");
        disableButton("east");
        disableButton("south");
    
    return "boundary, you can not proceed in this direction.";
}

function suite () {
 //Doesn't need a conditional or boolean flag because it will never
 //be a new location the score starts at five.
    disableButton("south");
    disableButton("east");
    disableButton("west");
    return locats[1];
}

function kitchen() {
    if(!locats[2].hasVisited) {
        score = score + 5;
        locats[2].hasVisited = true;
    }
    disableButton("north");
    disableButton("east");
    disableButton("west");
    return locats[2];
}

function presentationRoom() {
    if(!locats[3].hasVisited) {
        score = score + 5;
        locats[3].hasVisited = true;
    }
    disableButton("north");
    disableButton("east");
    disableButton("west");
    return locats[3];
}

function bar(){
    if(!locats[4].hasVisited) {
        score = score + 5;
        locats[4].hasVisited = true;
    }
    disableButton("south");
    disableButton("east");
    disableButton("west");
    return locats[4];
}

function closet() {
    if(!locats[5].hasVisited) {
        score = score + 5;
        locats[5].hasVisited = true;
    }
    disableButton("south");
    disableButton("east");
    disableButton("west");
    return locats[5];
}

function restroom() {
    if(!locats[6].hasVisited) {
        score = score + 5;
        locats[6].hasVisited = true;
    }
    disableButton("north");
    disableButton("east");
    disableButton("west");
    return locats[6];
}

function armory() {
    //The player will find his first weapon--the space laser gun here
    if(!locats[7].hasVisited) {
        score = score + 5;
        locats[7].hasVisited = true;
    }
    disableButton("south");
    disableButton("east");
    disableButton("west");
    return locats[7];
}

function hospitalRoom() {
    if(!locats[8].hasVisited) {
        score = score + 5;
        locats[8].hasVisited = true;
    }
    disableButton("north");
    disableButton("east");
    disableButton("west");
    return locats[8];
}

function freightDeck() {
    if(!locats[9].hasVisited) {
        score = score + 5;
        locats[9].hasVisited = true;
    }
    if(puzzleCompleted) {
        updateText("You succesfully find the one remaining escape pod,"
                   + "punch in the code, and fly away to the safety of"
                   + " your home planet.");
        updateText("YOU WON!!!!!");
        endGame();
        return "escape pod! Refresh to start over.";
    }
    
    disableButton("south");
    disableButton("east");
    disableButton("west");
    return locats[9];

}

function office() {
    if(!locats[10].hasVisited) {
        score = score + 5;
        locats[10].hasVisited = true;
    }
    officePuzzleTest();
    disableButton("north");
    disableButton("west");
    disableButton("east");
    return locats[10];
}