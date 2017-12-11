var fs = require('fs');


var PlayFunc = function() {
		//reads the guessing word but
		//display each letter for an underscore 
	this.getData = function() {
	    fs.readFile("words.txt", "utf8", function(error, data){
	    	if (error) throw error;
	      	//parse data 
	      	var guessArr = [];

	      	var wordArr = data.split(',');
	      	var compWord = wordArr[Math.floor(Math.random() * wordArr.length)].toLowerCase();//random
	      	console.log("GUESS: " + compWord);
	      	var currentWord = compWord.split('');

	      	//CHECKING FOR DASHES OR SPACES AND PASSING THEM ON
	      	var space = currentWord.indexOf(" ");
	      	// console.log("space " + space);
	      	console.log(compWord + "\n===========DASHES============");
	      	for (var i = 0; i < currentWord.length; i++) {
	      		a = currentWord[i];
	      		// console.log(a.indexOf(" "));
	      		console.log(a.indexOf("-"));
	      	}
	      	console.log(compWord + "\n===========SPACES============");
	      	for (var i = 0; i < currentWord.length; i++) {
	      		a = currentWord[i];
	      		console.log(a.indexOf(" "));
	      	}
	      	// var dash = currentWord.indexOf("-");
	      	// // console.log("dash " + dash);
	      	// if (dash == -1) {
	      	// 	console.log("NO DASH");
	      		
	      	// }
	      	// if (space == -1){
	      	// 	console.log("NO SPACE");
	      		
	      	// }
	      	// if (dash > -1) {
	      	// 	console.log("THERES A DASH!");
	      	// 	guessArr.splice(dash,1,"-");
	      	// 	console.log(dash);
	      	// }
	      	// if (space > -1) {
	      	// 	console.log("THERES A SPACE!");
	      	// 	guessArr.splice(space,1," ");
	      	// 	console.log(space);
	      	// }
	      
	      	// for (var i = 0; i < currentWord.length; i++) {
	      	// guessArr.push("_");
				

	      	// }
	      	// console.log(guessArr.join(' '));//blanks of the chosen random word
	      	var wordToGuess = guessArr.join(' ');
	      	console.log(wordToGuess);
	    });
	}
	this.getData();
}

PlayFunc();


module.exports = PlayFunc;
