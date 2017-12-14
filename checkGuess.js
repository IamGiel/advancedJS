var fs = require('fs');
var inquirer = require('inquirer');
var PlayFunc = require('./PlayFunc');
var lettersAlreadyTyped = [];
var guessesLeft = 10;

var displayProgress = function (){
	
	this.checkGuess = function(){
		inquirer.prompt([
			{
			type: "input",
			name: "letter",
			message: "Type a letter to guess: "
			}
		]).then(function(userInput) {
		 	
		 	letterTyped = userInput.letter;
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
					//USE LOOP: PUSH BLANKS AND REPLACE BLANKS WITH LETTERS
					for (var i = 0; i < underscores.length; i++) {
						if (letterTyped === currentString[i]){//currentstring derived from playFunc.js
						underscores.splice(i,1,letterTyped);//underscores (blanks) is the equivalent of currentstring (w/ letters)
						correctLetters.push(i);
						//POPULATE 'lettersAlreadyTyped' ARRAY
						lettersAlreadyTyped.push(letterTyped);
						}
						//DETECT REPEAT USER-INPUTS
						if (letterTyped === lettersAlreadyTyped[i]){
							usedLetter = true; //console.log("Used letter = true");
						}
						if (letterTyped !== lettersAlreadyTyped[i]){
							usedLetter = false; //console.log("Used letter = false");
						}
						//DECREMENT NO OF GUESSES
						if(correctLetters.length === 0) {
							isWrongLetter = true;
						}
						if(correctLetters.length > 0) {
							isWrongLetter = false;
						}
						if(guessesLeft === 0){
							console.log('\n\n\n==========\nSORRY, TRY AGAIN IN THREE DAYS, TAKE THIS TIME TO REFLECT ON WHAT YOU DID WRONG AND THINK :-P\n==========\n\n\n');
							return true;	
						}
					}
						if(isWrongLetter == true) {
							guessesLeft--;
						}
						if(usedLetter === true) {
							console.log("TRY A DIFFERENT LETTER THIS TIME");
						}
					//PRINT THIS TO USER:
					console.log("GUESSES LEFT:=====> " + guessesLeft);
					console.log("YOUR PROGRESS:====> " + underscores.join(''));
					// console.log("GUESSED LETTERS:==> " + correctLetters.length);
					console.log("LETTER HISTORY:===> " + lettersAlreadyTyped.join(','));

					//looping through history of letters typed
					for (var i = 0; i < lettersAlreadyTyped.length; i++) {
 					lettersAlreadyTyped[i];
 				
		 				if(letterTyped === lettersAlreadyTyped[i]) {
		 					// console.log("YOU ALREADY TYPED THAT LETTER");
		 				}
 					}
 					//writing the updated user guesses
					update = underscores.join('');
					fs.writeFile("blanks.txt", update, (err) => {
						if (err) throw err;
					});

					//recursion
					DisplayProgress = new displayProgress();
					DisplayProgress.checkGuess();

				}); 
		 	}
		});
	}
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
			console.log(blanksTxt);
			if (!userInput.letter) {
				console.log('goodbye');	
			} else {
				tryAgain();
			}
		});
	}
	//call this function for wrong letter
	function tryAgain2() {
		inquirer.prompt([
		  {
		   type: "input",
		   name: "letter",
		   message: "Type a letter to guess again:"
		  }
		
		]).then(function(userInput) {
			var correctArray = [];
			// console.log(userInput.letter);
			letterTyped = userInput.letter;
			// console.log(blanksTxt);
			if (userInput.letter) {
				console.log('try again!');
				
			}
		});
	}
module.exports = displayProgress;
