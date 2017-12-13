var fs = require('fs');
var inquirer = require('inquirer');
var PlayFunc = require('./PlayFunc');
// var checkGuess = require('./checkGuess');


var Player = function(name) {
	this.name = name;
}
var profiler = function() {
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
         	name: "go make history!"
         }, 
         {
         	name: "try again next time!"
         }
         ],
 }
  ]).then(function(answer) {
    var newPlayer = new Player(answer.name);
    var userName = "\n\n\n========================\n" + answer.name + " is gonna " + answer.welcome;
    console.log(userName);
    if(answer.welcome == "go make history!"){ 
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

profiler();



