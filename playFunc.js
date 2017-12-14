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
	  //     	fs.writeFile("emptyBlanks.txt", blanksArr, (err) => {
			// 	if (err) throw err;
			// });
	      	
	      	fs.writeFile("blanks.txt", stackOv, (err) => {
				if (err) throw err;
				console.log("WRITING ON BLANKS.TXT");
				
				// fs.readFile('blanks.txt', "utf8",(err, data) => {
				// 	if (err) throw err;
					console.log("GUESS THIS MOVIE: " + stackOv);
					console.log("READING FROM BLANKS.TXT");
					

					displayProgress = new displayProgress();
					displayProgress.checkGuess(); 
		      	// });
	      	});      	
	    });
	}

}




module.exports = PlayFunc;
