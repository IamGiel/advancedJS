var fs = require('fs');
var checkGuess = require('./checkGuess');


var PlayFunc = function() {
		var blanksArr = [];
		var currentWord = [];
		//reads the guessing word but
		//display each letter for an underscore 
	this.getData = function() {
		var stackOv = "";
	    fs.readFile("words.txt", "utf8", function(error, data){
	    	if (error) throw error;

	      	//data - array
	      	var wordArr = data.split(',');
	      	//select random from word from data
	      	var compWord = wordArr[Math.floor(Math.random() * wordArr.length)].toLowerCase();//random
	      	//selected word in array - currentWord
	      	currentWord = compWord.split('');
	      	console.log("========================\n\n\n");

	      	//CHECKING FOR DASHES OR SPACES AND PASSING THEM ON
	      	// console.log("space " + space);
	      	
	      	for (var i = 0; i <= currentWord.length - 1; i++) {
	      		// console.log(i);
	      		// pushing blanks and display it
	      		var gArr = blanksArr.push("_"); 
	      		//so far we have blanks...
	      	
	      		//HYPHENS AND SPACES SHOULD BE PASSED IN
	      		stackOv = currentWord.join("").replace(/[^- :'.]/g, "_");	
	      	}	
	      	console.log("GUESS THIS MOVIE: " + stackOv);
	      	fs.writeFile("blanks.txt", stackOv, (err) => {
	      	  if (err) throw err;
	      	  console.log('The file has been saved!');
	      	});
	    });
	}

}




module.exports = PlayFunc;
