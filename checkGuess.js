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
		 		
		 	}else {
		 		//LOGIC FOR HANGMAN
	 			// console.log("THIS IS USERINPUT:")
 				var replaceArray = [];
 				var correctLetters = [];

 				

 				lettersAlreadyTyped.push(letterTyped);
 				
 				//READING BLANKS.TXT
	 			fs.readFile('blanks.txt', "utf8",(err, data) => {
	 					if (err) throw err;
	 				
					underscores = data.split('');
					//USE LOOP TO PUSH BLANKS AND REPLACE BLANKS WITH LETTERS
					for (var i = 0; i < underscores.length; i++) {
						
						if (letterTyped === currentString[i]){
						underscores.splice(i,1,letterTyped);
						correctLetters.push(i);
						}
						//DECREMENT NO OF GUESSES
						if(correctLetters.length === 0) {
							isWrongLetter = true;
						}
					}
						if(isWrongLetter == true) {
							guessesLeft--;
						}
					//PRINT THIS TO USER:
					console.log("GUESSES LEFT:=====> " + guessesLeft);
					console.log("YOUR PROGRESS:====> " + underscores.join(''));
					console.log("GUESSED LETTERS:==> " + correctLetters.length);
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
