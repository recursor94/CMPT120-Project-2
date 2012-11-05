//LOCATION EVENT HANDLERS START HERE


function corridor() {
    //temporary place holder for proof of success, will update later with
    //location specific logic as in testLocation
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