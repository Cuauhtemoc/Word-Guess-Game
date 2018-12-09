var currentWord = [];
var guessesSoFar = [];
var currentGuess = "";
var totalGuesses = 10;
var questions = [];
var wordIndex = 0;
var words = ["awkward", "bagpipes", "banjo","dwarves", "haphazard"];
var word = "";
var wordAsArray;
var wordlength = 0;
var updateText;
var win = true;
var isTyping = false;
var game = {
    gameStart: function () {
        guessesSoFar = [];
        currentWord = [];
        totalGuesses = 10;
        wordIndex +=1;
        currentGuess = " ";
        word = ""     
    },
    reset: function(){
        this.winLose();
        this.gameStart();
        this.chooseWord();
        this.displayWord();
        this.textUpdate();
    },
    gameState: function (){
    
        updateText = document.getElementById("current-Word");
        updateText.textContent = "";
        updateText = document.getElementById("guessesRemaining");
        updateText.textContent = "";
        updateText = document.getElementById("guessesSoFar");
        updateText.textContent = "";
        updateText.classList.add("gameover");
        
    },
    solving: function (){
        isTyping = true;
        console.log(isTyping);

    },
    notSolving: function (){
        isTyping = false;
        console.log(isTyping);

    },
    textUpdate: function (){
        updateText = document.getElementById("current-Word");
        updateText.textContent = "Current Word: " + currentWord.join(" ");
        updateText = document.getElementById("guessesRemaining");
        updateText.textContent = "Guesses Remaining: " + totalGuesses;
        updateText = document.getElementById("guessesSoFar");
        updateText.textContent = "Guesses so far: " + guessesSoFar.join(" ");
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
    displayLetter: function (_string) {
        guessesSoFar.push(_string);
    },
    checkForLetter: function(_string) {
       wordAsArray = word.split("");
       for(i = 0; i <wordAsArray.length; i++){
           if (_string === wordAsArray[i])
           {
               currentWord.fill(_string,i, i+=1);    
           }
       }
       if(_string != " " && totalGuesses > 0){
        totalGuesses--;
            if(currentWord.join("") === word){
            win = true;
            this.reset();
            }
        }
        else if (totalGuesses === 0)
        {
            win = false;
            this.reset();
            
        }   
    },
    solve: function()
    {
        str = document.getElementById("solver");
        if (str.value === word)
        {
            win = true;
            this.reset();
        }
    },
    winLose: function(){
        if(win === true){
            updateText = document.getElementById("win-lose");
            updateText.textContent = "Awesome job! The word was " + word;
        }
        else{
            updateText = document.getElementById("win-lose");
            updateText.textContent = "Here's another word, the last one was " + word;
        }
    },
};


document.getElementById("solver").addEventListener("click", game.solving, true); 
document.getElementById("container").addEventListener("click", game.notSolving, true);
document.onkeypress = function(event){
    if(isTyping === false){
        currentGuess = event.key;
        updateText = document.getElementById("gameInfo");
        updateText.textContent = "Type a letter to guess!"
        game.checkForLetter(currentGuess);
        game.displayLetter(currentGuess);
        game.textUpdate();
        console.log(currentGuess);
        console.log(wordAsArray);
        console.log(currentWord);
    }
}
game.chooseWord();
game.displayWord();

