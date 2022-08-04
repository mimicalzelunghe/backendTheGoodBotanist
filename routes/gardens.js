var express = require('express');
const climateModel = require('../models/climate');
const { findOne } = require('../models/gardens');
var router = express.Router();


var GardenModel = require('../models/gardens')
var UserModel = require('../models/user')



/* =================================================
Uploads all the gardens in the DB for this pseudo or user. 
    This route returns an object garden
================================================= */

router.post('/uploadUserGardens', function(req, res, next) {

    // var users = await UserModel.find();


    // var gardens = []

    res.json(true);
});

/* =================================================
    Creates a new garden for the user
================================================= */
router.post('/createGarden', async function (req, res, next) {


        console.log("req.body.climateSelected ",req.body);


         var Climate = await climateModel.find( { climate_type: req.body.gardenClimate } );
         var IdClimate = Climate[0].id
         console.log("IdClimate", Climate[0].id);
        
         //enregistrement du jardin dans la base de donnée
        var gardenSaved;
        var newGarden  = await new GardenModel ({
        garden_name: req.body.gardenName,
        gardenClimate: IdClimate,
        gardenPlots: [],
        });
        
        gardenSaved = await newGarden.save();

    
        var user = await UserModel.find( { token: req.body.token  } );
        console.log("🚀 ~ file: gardens.js ~ line 51 ~ user", user)


        
        await UserModel.updateOne(
            { token: token},
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
