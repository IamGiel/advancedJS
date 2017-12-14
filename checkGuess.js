var fs = require('fs');
var inquirer = require('inquirer');
var PlayFunc = require('./PlayFunc');


var displayProgress = function (){

	
		
	 this.checkGuess = function(){
		 inquirer.prompt([
		   {
		    type: "input",
		    name: "letter",
		    message: "Type a letter to guess, you have 10 TRIES: "
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
 				//READING BLANKS.TXT
	 			fs.readFile('blanks.txt', "utf8",(err, data) => {
	 					if (err) throw err;
	 					//IMPORTANT DATA:

	 				// console.log("GUESS THIS MOVIE: " + data);//array with blanks
	 		 		// 	console.log("DISPLAY   ANSWER: " + currentString);//array with letters

					underscores = data.split('');
					//USE LOOP TO PUSH BLANKS AND REPLACE BLANKS WITH LETTERS
					for (var i = 0; i < underscores.length; i++) {
						
						if (letterTyped === currentString[i]){
						underscores.splice(i,1,letterTyped);
						correctLetters.push(i);
						}
					}
					
					console.log("DISPLAY UR INPUT: " + underscores.join(''));
					console.log("GUESSED  LETTERS: " + correctLetters.length);
					fs.writeFile("blanks.txt", underscores, (err) => {
						if (err) throw err;
						
					});

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
