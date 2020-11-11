const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

app.get("/", function(req,res){
	res.render("index");
});

app.post("/", function(req,res){
	res.redirect("/", {hold:hold})
});

app.listen(3000, function(){
	console.log("The YelpCamp Server has started...");
});
