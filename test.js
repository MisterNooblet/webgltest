'use strict';

//Hangman game - By Artyom Ribakov / Appleseeds pre-bootcamp.

//A bank of words to pick from
var wordbank = [
    "javascript",
    "appleseeds",
    "arrays",
    "strings",
    "constants",
    "variables"
]

var solution = []; //An array to hold the solution.
const maxBloopers = 10; //Max Mistakes a player can make.
var bloopers = 0; //A variable to hold the amount of mistakes the player has currently made.
var guessed = []; //An array of guessed letters.
var wordStatus = []; //Status of the word.
var letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

//Getting to know the player
let playerName = window.prompt("Hello player, what is your name?");

//Player greeting
alert('Hello ' + playerName + ' lets play a game of Hangman (X.X) Shall we?');

//The main function runs in a loop untill one of the conditions is met > loss || victory
function mainGame(){
    for (bloopers = 0; bloopers < 11; bloopers) {
        remove(prompt("Mistakes:" + bloopers + "/" + maxBloopers + " \nAvailable letters:" + letters + "\n" + wordStatus));
        //console.log(solution);
        //console.log(wordStatus)

        if (bloopers === maxBloopers){
            return
        }
        else if (wordStatus === solution){
            return
        }
    }
}

//Handling the input from main game dialog and updating according to input.
var remove = function(removeID){
    var index = letters.indexOf(removeID);
    var windex = solution.indexOf(removeID);
    //if Input letter is in the letters array as well is present in the solution remove from letters array and call guessWord func
    if (index>-1 && windex>-1) {
        letters.splice(index, 1);
        guessed.indexOf(removeID) === -1 ? guessed.push(removeID) : null;
        guessedWord();
        checkIfGameWon();
        //else if letter is in letters array but is not present in our solution add a blooper point and check if game is over
    }else if (index>-1 && !solution.includes(removeID)) {
        letters.splice(index, 1);
        bloopers++;
        checkIfGameLost();
        // else alert the player the letter was used or player has provided invalid input.
    }else{
        alert('Letter already used or Number/Symbol used! No score lost!');
}
}

//A function to pick a random word from wordbank array.
function randomWord(){
    solution = wordbank[Math.floor(Math.random() * wordbank.length)];
}

//Compares  wordStatus array and solution array to congratulate the player.
    function checkIfGameWon() {
    if (wordStatus === solution) {
        alert('Congratulations ' + playerName + ' you win this time!');
        return;
    }
  }

//Compares bloopers vs maxbloopers and lets the player know he has lost if the condition is true 
function checkIfGameLost() {
    if (bloopers === maxBloopers) {
      alert('Too bad, youre dead (X.x) ' + playerName + ' The answer was:' + solution);
      return;
    }
}

//Updating wordStatus 
function guessedWord() {
wordStatus = solution.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " * ")).join('');
  
}
//Game initialization
  randomWord();
  guessedWord();
  mainGame();