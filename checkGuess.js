var fs = require('fs');
var inquirer = require('inquirer');
var PlayFunc = require('./PlayFunc');

var checkGuess = function (){
		var string = "";
	this.guessWord = function() {
		fs.readFile('blanks.txt', "utf8",(err, word) => {
		  if (err) throw err;
		  word.split('');
		  string = word.split(' '); console.log("THIS IS STRING: " + string);
		});
	}
	// this.guessWord();
}
// checkGuess();

module.exports = checkGuess;
