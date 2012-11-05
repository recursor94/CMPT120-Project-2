//LOCATION EVENT HANDLERS START HERE


function corridor() {
    //temporary place holder for proof of success, will update later with
    //location specific logic as in testLocation
    return "You are now in the corridor";
}

function boundary() {
    /*Should be default switch case; this is the case for boundaries.
     * will likely test for right bound or left bound and take the appropriate
     * button disabling action. In the interest of concision and clarity,
     * it is probably best to put all boundary code in one function.
     */
    return "You have reached a boundary";
}

function suite () {
    return("You have entered your suite");
}

function kitchen() {
    return "You have entered the Kitchen.";
}

function presentationRoom() {
    return "You have entered the Presentation room";
}

function bar(){
    return "You have entered the space bar";
}

function closet() {
    return "You have entered the closet";
}

function restroom() {
    return "You have entered the restroom";
}

/*The proceeding functions are for the three new locations, they
*will follow the same format as the other locations so far,
*one above and bellow the corridor. Eg. (xpos,0), (xpos,2)*/

function armory() {
    //The player will find his first weapon--the space laser gun here
    return "You have entered the armory.";
}

function hospitalRoom() {
    return "You have entered the hospital room.";
}

function freightDeck() {
    return "You have entered the freight deck.";
    //Note:possibility of a discarded empty freight container location?
}

function office() {
    return "You have entered the office.";
}