//LOCATION EVENT HANDLERS START HERE

/*variables prefixed by can or visited_ are global booleans
 * declared and initialized in scripts.js. visited_ booleans are flags used to
 * calculate the score. As of this version, when a player visits a new location,
 * his score is incremented by 5. But if a player has visited a location already
 * his score must not be changed when he visits it again.*/

//score is a global variable declared in scripts.js that represents the players score.

function corridor() {
    //temporary place holder for proof of success, will update later with
    //location specific logic as in testLocation
    if(visited_corridor === false) {
        score = score + 5;
        visited_corridor = true;
    }
    
    return "corridor";
}

function boundary() {
    /*Should be default switch case; this is the case for boundaries.
     * will likely test for right bound or left bound and take the appropriate
     * button disabling action. In the interest of concision and clarity,
     * it is probably best to put all boundary code in one function.
     */
    return "boundary, you can not proceed in this direction.";
}

function suite () {
    return("suite");
}

function kitchen() {
    return "kitchen.";
}

function presentationRoom() {
    return "presentation room";
}

function bar(){
    return "space bar";
}

function closet() {
    return "closet";
}

function restroom() {
    return "restroom";
}

/*The proceeding functions are for the three new locations, they
*will follow the same format as the other locations so far,
*one above and bellow the corridor. Eg. (xpos,0), (xpos,2)*/

function armory() {
    //The player will find his first weapon--the space laser gun here
    return "armory.";
}

function hospitalRoom() {
    return "hospital room.";
}

function freightDeck() {
    return "freight deck.";
    //Note:possibility of a discarded empty freight container location?
}

function office() {
    return "office.";
}