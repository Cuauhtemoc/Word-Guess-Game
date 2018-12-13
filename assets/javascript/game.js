var currentWord = [];
var guessesSoFar = [];
var currentGuess = "";
var totalGuesses = 5;
var totalCorrect = 0;
var questions = [];
var wordIndex = 0;
var word = "";
var wordAsArray;
var wordlength = 0;
var updateText;
var win = true;
var isTyping = false; 
var startGame = false;
var gameEnd = false;
var correctGuess = false;
var  bgMusic;

var game = {
    movies : [{"title":"alien", "image": "assets/images/alien.jpg"},
    {"title":"hellraiser", "image": "assets/images/hellraiser.jpg"},
    {"title":"candyman", "image": "assets/images/CandyMan.jpg"},
    {"title":"gremlins", "image": "assets/images/Gremlins.jpg"},
    {"title":"poltergeist", "image": "assets/images/Poltergeist.jpg"},
    {"title":"re-animator", "image": "assets/images/re-animator.jpg"},
    {"title":"carrie", "image": "assets/images/carrie.jpg"},
                ],
    gameStart: function () {
        guessesSoFar = [];
        currentWord = [];
        totalGuesses = 5;
        wordIndex +=1;
        currentGuess = " ";
        word = ""     
    },
    reset: function(){
        this.winLose();
        this.gameStart();
        this.textUpdate();
        this.chooseWord();
        this.displayWord();
        this.addImage();
    },
    addImage: function(){
        
        img = document.getElementById("moviePoster");
        img.src = this.movies[wordIndex].image;
    },
    addMusic: function(){
        bgMusic = new Audio("assets/sounds/spookywind.wav");
        bgMusic.loop = true;
        bgMusic.play();
        console.log(bgMusic);
    },
    addSound: function(){
        bgMusic = new Audio("assets/sounds/keypress.wav");
        bgMusic.play();
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
    },
    notSolving: function (){
        isTyping = false;
    },
    textUpdate: function (){
        updateText = document.getElementById("current-Word");
        updateText.textContent = "Current Word: " + currentWord.join(" ");
        updateText = document.getElementById("guessesRemaining");
        updateText.textContent = "Guesses Remaining: " + totalGuesses;
        updateText = document.getElementById("guessesSoFar");
        updateText.textContent = "Guesses so far: " + guessesSoFar.join(" ");
        updateText = document.getElementById("total-correct");
        updateText.textContent = "Score: " + totalCorrect;
    },
    chooseWord:  function () {
        if (wordIndex >= this.movies.length )
        {
            gameEnd = true;
            updateText = document.getElementById("win-lose");
            updateText.textContent = "Game Over";
        }
        word = this.movies[wordIndex].title;
        console.log(typeof word);
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
               currentWord.splice(i,1,_string) 
               correctGuess = true;   
           }

       }
       if(_string != " " && totalGuesses > 0 && correctGuess === false){
            totalGuesses--;
 
        }
        else if(currentWord.join("") === word)
        {
            win = true;
            this.reset();
           
        }
        else if (totalGuesses === 0)
        {
            win = false;
            this.reset();   
        }
        else {
            correctGuess = false;
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
        else if (str.value != word && totalGuesses === 0)
        {
            win = false;
            this.reset();
        }
        else if (str.value != word)
        {
            totalGuesses -=1;
            updateText.textContent = "Nope, try again";
            this.textUpdate();
        }

    },
    winLose: function(){
        if(win === true){
            updateText = document.getElementById("win-lose");
            updateText.textContent = "Awesome job! The word was " + word;
            totalCorrect++;
        }
        else{
            updateText = document.getElementById("win-lose");
            updateText.textContent = "Here's another word, the last one was " + word;
        }
    },
};
game.chooseWord();
game.displayWord();
img = document.getElementById("moviePoster");
img.src = "assets/images/startingImage.jpg";

document.getElementById("solver").addEventListener("click", game.solving, true); 
document.getElementById("container").addEventListener("click", game.notSolving, true);
document.onkeypress = function(event){
    game.addImage();
    if (gameEnd === false)
    {
        game.addSound();
        game.textUpdate();
         updateText = document.getElementById("gameInfo");
        updateText.textContent = "Type a letter to guess!"
        if(isTyping === false && startGame === true){
            currentGuess = event.key;
           
            game.checkForLetter(currentGuess);
            game.displayLetter(currentGuess);
            game.textUpdate();
        }
        else if (startGame === false )
        {
            startGame = true;
            game.addMusic();
        }
    }
};



