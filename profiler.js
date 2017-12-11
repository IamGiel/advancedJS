var fs = require('fs');
var inquirer = require('inquirer');
var PlayFunc = require('./PlayFunc');


var Player = function (name) {
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
     type: "checkbox",
     name: "welcome",
     message: "Get Ready for some Hang-Man Action!",
     choices: [
         {
         	name: "Go make history!"
         }, 
         {
         	name: "Gotta take of, C'ya later!"
         }
         ],
 }
  ]).then(function(answer) {
    var newPlayer = new Player(answer.name);
    var userName = answer.name + " is Gonna " + answer.welcome;
    console.log(userName);
    if(answer.welcome == "Go make history!"){
      yyy = new PlayFunc();
      yyy.getData();
    }
    else {
      console.log("until next time...");
    }
    fs.appendFile("log.txt", "Player Name: " + userName + "\n", function (err) {
        if (err) throw err; 
        console.log("--saved--");
      });
	});  
}

profiler();



