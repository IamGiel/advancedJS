//KEEPING THIS FILE FOR TRIAL AND ERROR
var fs = require('fs');
var inquirer = require('inquirer');
var PlayFunc = require('./playFunc');
var Player = require('./profiler');
var lettersAlreadyTyped = [];
var guessesLeft = 10;
var correctLetters = [];




function DisplayProgress(first, last, age, eye) {
    this.firstName = first;
    this.lastName = last;
    this.age = age;
    this.eyeColor = eye;
    var _this = this;

    // this.logInfo = function() {
    //   console.log("Name: " + this.name + "\nProfession: " + this.profession +
    //   "\nGender: " + this.gender + "\nAge: " + this.age + "\nStrength: " +
    //   this.strength + "\nHitPoints: " + this.hitpoints);
    //   console.log("\n-------------\n");
    // };
    	_this.checkGuess = function(){
    		inquirer.prompt([
    			{
    			type: "input",
    			name: "letter",
    			message: "Type a letter to guess: "
    			}
    		]).then(function(userInput) {

    		 	letterTyped = userInput.letter.toLowerCase();

    		 	if (!userInput.letter) {
    		 		tryAgain();
    		 	} 
    		 	else if (userInput.letter){
    		 		//====================== ======= LOGIC FOR HANGMAN ======= ======================
 
     				//READ CURRENTSTRING.TXT
                    fs.readFile('currentString.txt', "utf8",(err, data) => {
                        if (err) throw err;
                        // console.log("currentString", data);
                        currentString = data.split('');
                        //READ BLANKS.TXT (NESTED INSIDE CURRENTSTRING.TXT fs.readFile)
    	 			    fs.readFile('blanks.txt', "utf8",(err, data) => {
    	 			    	if (err) throw err;
                            // console.log("underscores", data);
    				    	underscores = data.split('');
    				    	//POPULATE 'lettersAlreadyTyped' ARRAY
    				    	lettersAlreadyTyped.push(letterTyped);
                            checkForCorrectGuesses();
                            _this.checkGuess();
                            userWins();
                            //CREATE VARIABLE 'winner' detects that all underscores are displaced
                            
                        });//end fs.readFile currentString.txt
                    });//end fs.readFile blank.txt
                }//else - hangman logic
            });//.then
        }//checkguess function
    }//displayProgress function


    					
    					
//========
function checkForCorrectGuesses(){
    var goodJob, notGood;
    //USE LOOP: PUSH BLANKS AND REPLACE BLANKS WITH LETTERS
    for (var i = 0; i < currentString.length; i++) {
       //======== push letter type and replace blanks: SPLICE METHOD for ARRAYS
        if (letterTyped === currentString[i]) {
            goodJob = true;
            //*****ACTION THAT REPLACE BLANKS WITH LETTERS*****
            underscores.splice(i,1,letterTyped);
            //TRACK CORRECT LETTERS IN 'correctLetters' ARRAY
        } else if(letterTyped !== currentString[i]){
            notGood = true;   
        }
    }//loop ends >>> start TRUE OR FALSE BELOW:
    console.log("@#@#@#@#@#@#@",underscores.join(''));
    if(goodJob == true){
      console.log("~~~~~ !!! GOOD JOB !!! ~~~~~"); 
    } else if (notGood == true){
      console.log("##### TRY ANOTHER LETTER #####");
    }
  //HERE: DISPLAY TO USER RESULTS OF √ LETTERS REPLACING BLANKS
  console.log("\n\n\nLETTER HISTORY:===> " + lettersAlreadyTyped.join(',') + "<===:LETTER HISTORY"); 
}

//========
function userWins(){

    var winner = underscores.join('').replace(/[^_]/g, "").length;
    //DECLARE WINNER
    if (winner === 0) {
       console.log("\n\n\n ~~~~~~~~ YOU WIN!!! ~~~~~~~~ ");
    }
}

//========
function goodBadLetter(){
    //SET UP FOR GOOD LETTER REPEATS
    var goodL = goodLetters.join('');
    for (var i = 1; i < goodLetters.length; i++) {
        if(goodL.indexOf(letterTyped) > -1){
            var good = true;    
        }
        else if (goodL.indexOf(letterTyped) === -1){
            var good = false;
        }
    }
    if(good == true){
        // console.log("you typed this already.");
    }
    if(good == false){
        console.log("KEEP GOING! :)");
    }
    //SET UP FOR BAD LETTER REPEATS
    var badL = badLetters.join('');
    for (var i = 1; i < badLetters.length; i++) {
        if(badL.indexOf(letterTyped) > -1){
            var bad = true; 
        }
        else if (badL.indexOf(letterTyped) === -1){
            var bad = false;
        }
    }
    if(bad == true){
        console.log("wrong letter");
    }
    if(bad == false){
        console.log("KEEP GOING! :)");
    }
}
		 	
//========
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
		if (!userInput.letter) {
			console.log('goodbye');	
		} else {
			//recursion
			DisplayProgress = new displayProgress();
			DisplayProgress.checkGuess();
		}
	});
}

module.exports = DisplayProgress;


