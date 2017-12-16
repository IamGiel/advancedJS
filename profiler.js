var fs = require('fs');
var inquirer = require('inquirer');
var PlayFunc = require('./playFunc');
// var checkGuess = require('./checkGuess');


function Player() {
	// this.name = name;

this.profiler = function() {
  inquirer.prompt([
    {
     type: "input",
     name: "name",
     message: "Add your name to the 'HALL OF FAME': "
    },
    {
     type: "list",
     name: "welcome",
     message: "Get Ready for some Hang-Man Action!",
     choices: [
         {
         	name: "GO, BREAK RECORDS!"
         }, 
         {
         	name: "TRY LATER..."
         }
         ],
 }
  ]).then(function(answer) {
    var newPlayer = new Player(answer.name);
    var userName = "\n\n\n========================\n" + answer.name + " is gonna " + answer.welcome;
    console.log(userName);
    if(answer.welcome == "GO, BREAK RECORDS!"){ 
      PlayFunc = new PlayFunc();
      PlayFunc.getData();
    }
    else {
      //do nothing
    }
    fs.appendFile("log.txt", "Player Name: " + userName + "\n", function (err) {
        if (err) throw err; 
        // console.log(answer.name + " your name's in the system, lets see how you do!");
      });
	});  
}
}
//Initialize game
var play = new Player();
play.profiler();

module.exports = Player;



