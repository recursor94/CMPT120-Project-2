//LOCATION EVENT HANDLERS START HERE


function corridor() {
    //temporary place holder for proof of success, will update later with
    //location specific logic as in testLocation
    alert ("You are now in the corridor");
}

function boundary() {
    /*Should be default switch case; this is the case for boundaries.
     * will likely test for right bound or left bound and take the appropriate
     * button disabling action. In the interest of concision and clarity,
     * it is probably best to put all boundary code in one function.
     */
    alert("You have reached a boundary");
}

function suite () {
    alert("You have entered your suite");
}

function kitchen() {
    alert("You have entered the Kitchen.");
}

function presentationRoom() {
    alert("You have entered the Presentation room");
}

function bar(){
    alert("You have entered the space bar");
}

function closet() {
    alert("You have entered the closet");
}

function restroom() {
    alert("You have entered the restroom");
}

/*The proceeding functions are for the three new locations, they
*will follow the same format as the other locations so far,
*one above and bellow the corridor. Eg. (xpos,0), (xpos,2)*/

function armory() {
    //The player will find his first weapon--the space laser gun here
    alert("You have entered the armory.");
}

function hospitalRoom() {
    alert("You have entered the hospital room.");
}

function freightDeck() {
    alert("You have entered the freight deck.");
    //Note:possibility of a discarded empty freight container location?
}

function office() {
    alert("You have entered the office.");
}