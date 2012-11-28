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

var locat = function (_id, _name, _desc) {

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
    this.itoms = [];
};

function corridor() {
    //temporary place holder for proof of success, will update later with
    //location specific logic as in testLocation
    if(!visited_corridor) {
        score = score + 5;
        visited_corridor = true;
    }
    enableAllButtons();
    return "corridor";
}

function boundary() {
    /*Should be default switch case; this is the case for boundaries.
     * will likely test for right bound or left bound and take the appropriate
     * button disabling action. In the interest of concision and clarity,
     * it is probably best to put all boundary code in one function.
     */

    if(xpos < 0) {
        disableButton("north");
        disableButton("south");
        disableButton("west");
    }
    else if(xpos > 4) {
        disableButton("north");
        disableButton("east");
        disableButton("south");
    }
    return "boundary, you can not proceed in this direction.";
}

function suite () {
 //Doesn't need a conditional or boolean flag because it will never
 //be a new location the score just starts at five.
    disableButton("south");
    disableButton("east");
    disableButton("west");
    return "suite";
}

function kitchen() {
    if(!visited_kitchen) {
        score = score + 5;
        visited_kitchen = true;
    }
    disableButton("north");
    disableButton("east");
    disableButton("west");
    return "kitchen";
}

function presentationRoom() {
    if(!visited_presentation) {
        score = score + 5;
        visited_presentation = true;
    }
    disableButton("north");
    disableButton("east");
    disableButton("west");
    return "presentation room";
}

function bar(){
    if(!visited_bar) {
        score = score + 5;
        visited_bar = true;
    }
    disableButton("south");
    disableButton("east");
    disableButton("west");
    return "space bar";
}

function closet() {
    if(!visited_closet) {
        score = score + 5;
        visited_closet = true;
    }
    disableButton("north");
    disableButton("east");
    disableButton("west");
    return "closet";
}

function restroom() {
    if(!visited_restroom) {
        score = score + 5;
        visited_restroom = true;
    }
    disableButton("south");
    disableButton("east");
    disableButton("west");
    return "restroom";
}

/*The proceeding functions are for the three new locations, they
*will follow the same format as the other locations so far,
*one above and bellow the corridor. Eg. (xpos,0), (xpos,2)*/

function armory() {
    //The player will find his first weapon--the space laser gun here

    if(!visited_armory) {
        score = score + 5;
        visited_armory = true;
    }
    disableButton("south");
    disableButton("east");
    disableButton("west");
    return "armory";
}

function hospitalRoom() {
    if(!visited_hospitalRoom) {
        score = score + 5;
        visited_hospitalRoom = true;
    }
    disableButton("north");
    disableButton("east");
    disableButton("west");
    return "hospital room";
}

function freightDeck() {
    if(!visited_freightDeck) {
        score = score + 5;
        visited_freightDeck = true;
    }
    disableButton("south");
    disableButton("east");
    disableButton("west");
    return "freight deck";
    //Note:possibility of a discarded empty freight container location?
}

function office() {
    if(!visited_office) {
        score = score + 5;
        visited_office = true;
    }
    disableButton("north");
    disableButton("west");
    disableButton("east");
    return "office";
}