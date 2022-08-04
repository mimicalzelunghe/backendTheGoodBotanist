var express = require('express');
const climateModel = require('../models/climate');
const { findOne } = require('../models/gardens');
var router = express.Router();


var GardenModel = require('../models/gardens')
var UserModel = require('../models/users')



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

        console.log("🚀 ~ file: gardens.js ~ line 54 ~ req.body.token", req.body.token)

    
        var tempUser = await UserModel.find( { token: req.body.token  } );
        
        console.log("🚀 ~ file: gardens.js ~ line 51 ~ tempUser", tempUser);

        var userId = tempUser[0].id;
        console.log("🚀 ~ file: gardens.js ~ line 56 ~ userId", userId)
        
        var gardensIdList = tempUser[0].gardensId;
        console.log("🚀 ~ file: gardens.js ~ line 62 ~ gardensIdList", gardensIdList)
        console.log("🚀 ~ file: gardens.js ~ line 63 ~ tempUser[0].gardensId", tempUser[0].gardensId)
        
        gardensIdList.push(tempUser[0].gardensId)
        console.log("🚀 ~ file: gardens.js ~ line 62 ~ gardensIdList", gardensIdList)

        

        gardensIdList.push(IdClimate)

        await UserModel.updateOne(
            { id: userId},
            { gardensId: gardensIdList }
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
