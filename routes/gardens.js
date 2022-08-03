var express = require('express');
const climateModel = require('../models/climate');
const { findOne } = require('../models/gardens');
var router = express.Router();


var GardenModel = require('../models/gardens')


/* =================================================
Uploads all the gardens in the DB for this pseudo or user. 
    This route returns an object garden
================================================= */

router.get('/uploadUserGardens', function(req, res, next) {
    var gardens = []

    res.json(gardens);
});

/* =================================================
    Creates a new garden for the user
================================================= */
router.post('/createGarden', async function (req, res, next) {


         console.log("Hello");


         var IdClimate = await climateModel.find( { climate_type: req.body.climateTypeFromFront } );
         console.log("🚀 ~ file: gardens.js ~ line 34 ~ IdClimate", IdClimate);
         console.log("IdClimate.id",IdClimate[0]._id);
         

        var gardenSaved;
        var newGarden  = await new GardenModel ({
        garden_name: req.body.gardenNameFromFront,
        gardenClimate: IdClimate[0]._id,
        gardenPlots: [],
        });
        
        gardenSaved = await newGarden.save();

    
        console.log("gardenSaved", gardenSaved)

        var user = await UserModel.find( { token: req.body.tokenUserFromFront  } );


        await UserModel.updateOne(
            { lastname: "doe"},
            { email: "john@doe.fr" }
         );



    res.json(true)

        // http://192.168.10.114:3000/gardens/createGarden test postman

});

/* =================================================
removes a garden from the user's portfolio 
================================================= */
router.delete('/removeGarden', function(req, res, next) {
    res.json(result);

});

/* =================================================
modify a garden from the user's portfolio 
================================================= */
router.put('/modifyGarden', function(req, res, next) {
    res.json(result);

});

module.exports = router;
