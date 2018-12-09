var currentWord = [];
var guessesSoFar = [];
var currentGuess = "";
var totalGuesses = 0;
var questions = [];
var wordIndex = 0;
var words = ["awkward", "bagpipes", "banjo","dwarves", "haphazard"];
var word = "";
var wordAsArray;
var wordlength = 0;
var game = {
    gameState: function () {
    },
    chooseWord: function () {
        word = words[wordIndex];
    },
    displayWord: function(){
        wordlength = word.length;
        for (i = 0; i < wordlength; i++){
            currentWord.push("_");
        }

    },
    displayLetter: function () {
    },
    checkForLetter: function(_string) {
        
       wordAsArray = word.split("");
       guessesSoFar++;
       for(i = 0; i <wordAsArray.length; i++){
           if (_string === wordAsArray[i])
           {
               currentWord.fill(_string,i, i+=1);               
           }
       }
    }
};
document.onkeyup = function(event){
    currentGuess = event.key;
    game.checkForLetter(currentGuess);
    console.log(currentGuess);
    console.log(wordAsArray);
    console.log(currentWord);
}




game.chooseWord();
game.displayWord();


// game.checkForLetter(currentGuess);
// console.log(currentWord);
