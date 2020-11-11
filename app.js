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
	const holdAreas = ["MC", "SD", "DRY", "CLR", "FZR"]
	const holdSections = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
	
	var numAreas = 4
	
	var randArea = random.int(0,numAreas)
	var setArea = holdAreas[randArea]
	
	if (setArea == "MC"){
		var randSection = random.int(0,25)
		var setSection = holdSections[randSection]
	} else if (setArea == "SD"){
		var randSection = random.int(0,17)
		var setSection = holdSections[randSection]
	} else if (setArea == "DRY"){
		var randSection = random.int(0,4)
		var setSection = holdSections[randSection]
	} else if (setArea == "CLR"){
		var randSection = random.int(0,3)
		var setSection = holdSections[randSection]
	} else if (setArea == "FZR"){
		var randSection = random.int(0,3)
		var setSection = holdSections[randSection]
	}
	
	var setNumber = random.int(1,120)
	
	var hold = {
		area: setArea,
		section: setSection,
		number:  setNumber
	}
	var test = random.int(0,4)
	res.render("index", {hold:hold});
});

app.listen(process.env.PORT, function(){
	console.log("Hold generator has started...");
});
