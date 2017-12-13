var fs = require('fs');
var inquirer = require('inquirer');
var PlayFunc = require('./PlayFunc');
var prompt = require('prompt');//maybe we wont need this (delete later)

var displayProgress = function (){
	// console.log("WORKING CONNECTED CHECKGUESS MODULE");
	// PlayFunc = new PlayFunc();
	// PlayFunc.getData();

	
	var a = blanksTxt.join('');//string a
	var manipulateThisArray = blanksTxt;
	console.log(a);	
	// console.log(manipulateThisArray);
	 

	 this.checkGuess = function(){
		 inquirer.prompt([
		   {
		    type: "input",
		    name: "letter",
		    message: "Type a letter to guess, you have 10 TRIES:"
		   }
		 
		 ]).then(function(userInput) {
		 	var correctArray = [];
		 	// console.log(userInput.letter);
		 	letterTyped = userInput.letter;
		 	//logic
		 	//test if we can parse through the array
		 	for (var i = 0; i <= manipulateThisArray.length - 1; i++) {
		 		x = manipulateThisArray[i]; console.log(x);
		 		// if userinput letter-value matches chosen words letter value 
		 		// replace this chosen worsa letter with userinput value
		 		// if(letterTyped == x.charAt(i)) {
		 			console.log("THERES A MATCH " + x.charAt(i));
		 		// }else {
		 			// console.log("NO MATCH");
		 		// }
	      		    			
	      	}
		 });
	}
}
// checkGuess();

module.exports = displayProgress;
