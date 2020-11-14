const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const random = require('random');

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

app.get("/", function(req,res){
	
	var allHold = randomHold(4);
	
	var mainHold = randomHold(1);
	
	res.render("index", {allHold:allHold, mainHold:mainHold});
});

function randomHold(numAreas){
	//Hold area array
	const holdAreas = ["MC", "SD", "DRY", "CLR", "FZR"]
	const holdSections = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	//Set maximums of each section
	var mcSecMax = 25;
	var sdSecMax = 13;
	//DRY, CLR, and FZR all have uniform numbers for all sections
	var drySecMax = 1;
	var dryNumMax = 21;
	var clrSecMax = 3;
	var clrNumMax = 8;
	var fzrSecMax = 2;
	var fzrNumMax = 8;
	
	
	//Select random area based on areaArray
	var randArea = random.int(0, numAreas)
	var setArea = holdAreas[randArea]
	
	//Select random section and number based on random area
	if (setArea == "MC"){
		var randSection = random.int(0,mcSecMax);
		var setSection = holdSections[randSection];
		//For A 
		if (randSection < 1) {
			var setNumber = random.int(1,105);
		//For B-U	
		} else if (randSection > 0 && randSection < 21) {
			var setNumber = random.int(1,17);
		//For V-Y	
		} else if (randSection > 20 && randSection < 25) {
			var setNumber = random.int(1,14);
		//For Z	
		} else {
			var setNumber = random.int(1,28);
		}
	} else if (setArea == "SD"){
		const sdHoldSections = ["A","E","F","G","H","I","J","K","L","M","N","O","P","Q"];
		const sdANumbers = [25,26,27, 28,29,30, 31, 32, 33];
		const sdEQNumbers = [1,26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56];
		var randSection = random.int(0,sdSecMax);
		var setSection = sdHoldSections[randSection];
		// For section A
		if (setSection == "A"){
			var randNumber = random.int(0,sdANumbers.length-1);
			var setNumber = sdANumbers[randNumber]
		// For sections E-Q
		} else {
			var randNumber = random.int(0,sdEQNumbers.length-1);
			var setNumber = sdEQNumbers[randNumber]	   
		}
	} else if (setArea == "DRY"){
		var randSection = random.int(0,drySecMax);
		var setSection = holdSections[randSection];
		var setNumber = random.int(1,dryNumMax);
	} else if (setArea == "CLR"){
		var randSection = random.int(0,clrSecMax);
		var setSection = holdSections[randSection];
		var setNumber = random.int(1,clrNumMax);
	} else if (setArea == "FZR"){
		var randSection = random.int(0,fzrSecMax);
		var setSection = holdSections[randSection];
		var setNumber = random.int(1,fzrNumMax);
	}
	
	var hold = {
		area: setArea,
		section: setSection,
		number:  setNumber
	};
	
	return hold;
}

app.listen(process.env.PORT, function(){
	console.log("Hold generator has started...");
});
