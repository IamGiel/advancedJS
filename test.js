// var fs = require('fs');
// var inquirer = require('inquirer');
// var PlayFunc = require('./playFunc');
// var Player = require('./profiler');
var lettersAlreadyTyped = [];
var guessesLeft = 10;
var goodLetters = [];
var badLetters = [];

var displayProgress = function (){
	
	this.checkGuess = function(){
		inquirer.prompt([
			{
			type: "input",
			name: "letter",
			message: "Type a letter to guess: "
			}
		]).then(function(userInput) {
		 	
		 	letterTyped = userInput.letter.toLowerCase(); 
		 	if (!userInput.letter) {
		 		tryAgain();
		 	} 
		 	else {
		 		//LOGIC FOR HANGMAN
 				var replaceArray = [];
 				var correctLetters = [];
 				
 				//READING BLANKS.TXT
	 			fs.readFile('blanks.txt', "utf8",(err, data) => {
	 				if (err) throw err;
	 				
					underscores = data.split('');
					//POPULATE 'lettersAlreadyTyped' ARRAY
					lettersAlreadyTyped.push(letterTyped);
					//FUNCTION WIN:
					if ((underscores.join('') === currentString)) {
						console.log("YOU WERE GREAT!");
					}
					//USE LOOP: PUSH BLANKS AND REPLACE BLANKS WITH LETTERS
					for (var i = 0; i < underscores.length; i++) {
						if (letterTyped === currentString[i]){//currentstring derived from playFunc.js
						underscores.splice(i,1,letterTyped);//underscores (blanks) is the equivalent of currentstring (w/ letters)
						correctLetters.push(i);
						}
						//DETECT REPEAT USER-INPUTS
						if (correctLetters.length > 0){
							usedLetter = true; //console.log("TRUE!!!");			
						}
						if(correctLetters.length === 0){
							usedLetter = false;	//console.log("FALSE!!!");	
						}
						
					}	//======= outside the for-loop =======//
						
						//EXIT GAME IF USER-GUESS=0
						if(guessesLeft <= 0){
							console.log('\n\n\n==========\nSORRY, TRY AGAIN IN THREE DAYS, TAKE THIS TIME TO REFLECT ON WHAT YOU DID WRONG AND THINK :P\n==========\n\n\n');
							return true;	
						}
						
					//PRINT THIS TO USER:
					console.log("\n((((((((((((o))))))))))))((((((((((((o))))))))))))((((((((((((o))))))))))))\n\n\n");

					//storing goodLetters/badLetters
					if(usedLetter === true) {
						goodLetters.push(letterTyped);
					}
					if(usedLetter === false){
						badLetters.push(letterTyped);
						guessesLeft--;
						console.log("########### ---> OOOPS! TRY ANOTHER LETTER <--- ###########\n");
					}
					//SET UP FOR GOOD LETTER REPEATS
					var goodL = goodLetters.join('');
					for (var i = 1; i < goodLetters.length; i++) {
						if(goodL.indexOf(letterTyped) > -1){
							var good = true;	
						}
						else if (goodL.indexOf(letterTyped) === -1){
							var good = false;
						}
					}
					if(good == true){
						// console.log("you typed this already.");
					}
					if(good == false){
						console.log("KEEP GOING! :)");
					}
					//SET UP FOR BAD LETTER REPEATS
					var badL = badLetters.join('');
					for (var i = 1; i < badLetters.length; i++) {
						if(badL.indexOf(letterTyped) > -1){
							var bad = true;	
						}
						else if (badL.indexOf(letterTyped) === -1){
							var bad = false;
						}
					}
					if(bad == true){
						console.log("wrong letter");
					}
					if(bad == false){
						console.log("KEEP GOING! :)");
					}
					// console.log("CURRENT STRING " + currentString);
					console.log("GUESSES LEFT:=====> " + guessesLeft);
					console.log("YOUR PROGRESS:====> " + underscores.join(''));
					// console.log("CORRECT LETTERS:==> " + correctLetters.length);
					console.log("LETTER HISTORY:===> " + lettersAlreadyTyped.join(','));
					console.log("\n\n\n((((((((((((o))))))))))))((((((((((((o))))))))))))((((((((((((o))))))))))))\n");
					//looping through history of letters typed
					
 					//writing the updated user guesses
					update = underscores.join('');
					fs.writeFile("blanks.txt", update, (err) => {
						if (err) throw err;
					});

					//recursion
					DisplayProgress = new displayProgress();
					DisplayProgress.checkGuess();
					winner = underscores.join('').replace(/[^_]/g, "").length;
						if (winner === 0) {
							console.log("\n\n\n======================== ~~~~~~~~ YOU WIN!!! ~~~~~~~~ ========================");
							restart();
						}
				}); 
		 	}
		});
	}
}
	//re-intitialize the game
	function restart(){
		 	 
		var blanksArr = [];
		var currentWord = [];
		var stackOv = "";
	    fs.readFile("words.txt", "utf8", function(error, data){
	    	if (error) throw error;
	    	dataType = data.toLowerCase();
	      	//data in array
	      	var wordArr = dataType.split(',');
	      	//select random from word from data
	      	var compWord = wordArr[Math.floor(Math.random() * wordArr.length)];//random
	      	//split chosen word
	      	var currentWord = compWord.split('');
	      	console.log("========================\n\n\n");

	      	//Looping through the word	      	
	      	for (var i = 0; i <= currentWord.length - 1; i++) {
	      		// pushing blanks 
	      		var gArr = blanksArr.push("_");

	      	
	      		//HYPHENS, COLONS, SPACES SHOULD BE PASSED
	      		stackOv = currentWord.join("").replace(/[^- :'.,]/g, "_");
	      		currentString = currentWord.join("");	
	      	}
	      	
	      	fs.writeFile("blanks.txt", stackOv, (err) => {
				if (err) throw err;
				console.log("GUESS THIS MOVIE: \n\n\n" + stackOv);
				displayProgress = new displayProgress();
				displayProgress.checkGuess(); 
	      	});      	
	    });
	}
		 	

	function tryAgain() {
		inquirer.prompt([
		  {
		   type: "input",
		   name: "letter",
		   message: "NEED TO TYPE LETTER, or press 'ENTER' to END GAME"
		  }
		
		]).then(function(userInput) {
			var correctArray = [];
			// console.log(userInput.letter);
			letterTyped = userInput.letter;
			if (!userInput.letter) {
				console.log('goodbye');	
			} else {
				//recursion
				DisplayProgress = new displayProgress();
				DisplayProgress.checkGuess();
			}
		});
	}

// module.exports = displayProgress;