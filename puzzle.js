function officePuzzleTest() {
    if(playerHasItem("mysterious blue prints") && puzzleCompleted === false) {
        updateText("There is a decoder here--the serial number on the label"
                   + "matches the serial number on your blueprints");
        updateText("NEW COMMAND TEMPORARILY ADDED: decode blueprints");
        }
        
}

function decodeBluePrints () {
    updateText("Blue Prints decoded, they yield the password to the"
               + "escape pods! Head to the freight deck, where "
               + "there are still remaining escape pods"
               + "remaining.");

    puzzleCompleted = true; //now enable flag to use the escape pods!
}