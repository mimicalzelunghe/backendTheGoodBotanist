var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* =================================================
removes a plant form a specific plot
================================================= */
router.get('/loadData', function(req, res, next) {
    
  //https://www.geeksforgeeks.org/how-to-convert-csv-to-json-file-having-comma-separated-values-in-node-js/
  
  //load the plants file
  // Reading the file using default
  // fs npm package
  const fs = require("fs");
  csv = fs.readFileSync("plantesDB.csv")
  
  // Convert the data to String and
  // split it in an array
  var array = csv.toString().split("\r");

  console.log("one array value is : ", array)
  
  // each row of the CSV is a record and will be save to it

  //insert each record into the DB

  // if all is ok then result = true else false

  res.json(result);

});

module.exports = router;
