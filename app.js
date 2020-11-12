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
	var mcNumMax = 120;
	var sdSecMax = 17;
	var sdNumMax = 60;
	var drySecMax = 4;
	var dryNumMax = 40;
	var clrSecMax = 3;
	var clrNumMax = 20;
	var fzrSecMax = 3;
	var fzrNumMax = 20;
	
	
	//Select random area based on areaArray
	var randArea = random.int(0, numAreas)
	var setArea = holdAreas[randArea]
	
	//Select random section and number based on random area
	if (setArea == "MC"){
		var randSection = random.int(0,mcSecMax);
		var setSection = holdSections[randSection];
		var setNumber = random.int(1,mcNumMax);
	} else if (setArea == "SD"){
		var randSection = random.int(0,sdSecMax);
		var setSection = holdSections[randSection];
		var setNumber = random.int(1,sdNumMax);
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
