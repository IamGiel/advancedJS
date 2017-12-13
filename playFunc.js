var fs = require('fs');
var inquirer = require('inquirer');
var displayProgress = require('./checkGuess');

// var checkGuess = require('./checkGuess');


var PlayFunc = function() {
		var blanksArr = [];
		var currentWord = [];
		
	this.getData = function() {
		var stackOv = "";
	    fs.readFile("words.txt", "utf8", function(error, data){
	    	if (error) throw error;
	    	dataType = data.toLowerCase();
	      	//data in array
	      	var wordArr = dataType.split(',');
	      	//select random from word from data
	      	var compWord = wordArr[Math.floor(Math.random() * wordArr.length)];//random
	      	//split chosen word
	      	currentWord = compWord.split('');
	      	console.log("========================\n\n\n");

	      	//Looping through the word	      	
	      	for (var i = 0; i <= currentWord.length - 1; i++) {
	      		// pushing blanks 
	      		var gArr = blanksArr.push("_"); 
	      	
	      		//HYPHENS, COLONS, SPACES SHOULD BE PASSED
	      		stackOv = currentWord.join("").replace(/[^- :'.]/g, "_");
	      		wordString = currentWord.join("");	
	      	}	
	      	console.log("GUESS THIS MOVIE: ");
	      	fs.writeFile("blanks.txt", stackOv, (err) => {
				if (err) throw err;
				console.log(wordString);
				fs.readFile('blanks.txt', "utf8",(err, word) => {
					if (err) throw err;
					// console.log("GUESS THIS MOVIE: " + compWord);
					blanksTxt = word.split(''); //console.log(string.join('').replace(/[^-: '.]/g, "_"));

					displayProgress = new displayProgress();
					displayProgress.checkGuess(); 
		      	});
	      	});      	
	    });
	}

}




module.exports = PlayFunc;
