var fs = require('fs');
var inquirer = require('inquirer');
var checkGuess = require('./checkGuess');

// var checkGuess = require('./checkGuess');


var PlayFunc = function() {
		var blanksArr = [];
		var currentWord = [];
		
	this.getData = function() {
		var stackOv = "";
	    fs.readFile("words.txt", "utf8", function(error, data){
	    	if (error) throw error;

	      	//data in array
	      	var wordArr = data.split(',');
	      	//select random from word from data
	      	var compWord = wordArr[Math.floor(Math.random() * wordArr.length-1)].toLowerCase();//random
	      	//split chosen word
	      	currentWord = compWord.split('');
	      	console.log("========================\n\n\n");

	      	//CHECKING FOR DASHES OR SPACES AND PASSING THEM ON
	      	// console.log("space " + space);
	      	
	      	for (var i = 0; i <= currentWord.length - 1; i++) {
	      		// pushing blanks 
	      		var gArr = blanksArr.push("_"); 
	      		//so far we have blanks...
	      	
	      		//HYPHENS AND SPACES SHOULD BE PASSED IN
	      		stackOv = currentWord.join("").replace(/[^- :'.]/g, "_");	
	      	}	
	      	// console.log("GUESS THIS MOVIE: " + stackOv);
	      	fs.writeFile("blanks.txt", stackOv, (err) => {
	      	  if (err) throw err;
	      	// console.log('The file has been saved!');
	      	});

	      	fs.readFile('blanks.txt', "utf8",(err, word) => {
	      	  if (err) throw err;
	      	  word.split('');
	      	  console.log("GUESS THIS MOVIE: " + compWord);
	      	  string = word.split(''); //console.log(string.join('').replace(/[^-: '.]/g, "_"));

	      	  checkGuess = new checkGuess();
	      	  // checkGuess.guessWord(); 

	      	  //check npmjs for inquire checking user input


	      	});
	    });
	}

}




module.exports = PlayFunc;
