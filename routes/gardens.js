var express = require('express');
const climateModel = require('../models/climate');
const { findOne } = require('../models/gardens');
var router = express.Router();


var GardenModel = require('../models/gardens')
var UserModel = require('../models/users')



/* =================================================
Uploads all the gardens in the DB for the incoming user. 
This route returns an object garden

input: 
    - the user's token
    - the garden id
output: 
    - list of the user's gardens and related plots
================================================= */

router.post('/uploadUserGardens', async function(req, res, next) {

    //find the user's garden. Gardens id are stored into 
    // the user's collection as an array
    console.log("Mimic4: routes gardens/uploadGarden, req.body: ", req.body)
    var user = await UserModel.findOne( { token: req.body.token  } );

    console.log("Mimic1: routes gardens/uploadUserGarden, user found? ", user)

    const userGardensId = user.gardensId

    //find the gardens
    var gardens
    var userGardensIds = user.gardensId
    var listUserGardens = []

    var findGarden = async (gardenId) =>{
        var gardenData = await GardenModel.findOne({_id: gardenId})
        console.log("🚀 ~ file: gardens.js ~ line 41 ~ findGarden ~ gardenData", gardenData)

        listUserGardens = [...listUserGardens, gardenData]
        console.log("🚀 ~ file: gardens.js ~ line 44 ~ findGarden ~ listUserGardens", listUserGardens)
        

    }
    userGardensIds.map( (currentGardenId) => {
        //find the garden data
        findGarden(currentGardenId)
    })

    /*userGardensIds.map( async (currentGardenId) => {
        //find the garden data
        var gardenData = await GardenModel.findOne({_id: gardenId})
        console.log("🚀 ~ file: gardens.js ~ line 41 ~ findGarden ~ gardenData", gardenData)

        listUserGardens = [...listUserGardens, gardenData]
        console.log("🚀 ~ file: gardens.js ~ line 44 ~ findGarden ~ listUserGardens", listUserGardens)
        
    })*/
    
    console.log("🚀 ~ file: gardens.js ~ line 53 ~ router.post ~ listUserGardens", listUserGardens)
    
    res.json(listUserGardens);
    
    
});

/* =================================================
    Creates a new garden for the user
================================================= */
router.post('/createGarden', async function (req, res, next) {


        console.log("req.body ",req.body);


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

        // recup de l'id du jardin nouvellement créé
        const newGardenId = gardenSaved._id


        // modifier la liste des jardins de mon user

        var user = await UserModel.findOne( { token: req.body.token  } );
        // on aurait pu utiliser le code suivant et dans ce cas mettre 
        // à jour le user en faisant un replaceOne()
        //user.gardensId.push(gardenSaved._id)
        //console.log("🚀 ~ file: gardens.js ~ line 62 ~ user modified :", user)

        // recup dans un nouvelle var la liste des id de jardins déjà existante
        // à laquelle on ajoute à cette liste le nouveau jardin
        var userUpdatedGardens = [...user.gardensId, newGardenId]

        // sauvegarder la nouvelle liste de jardins pour ce user
        var updatedUser = await UserModel.updateOne(
            {token:req.body.token },
            {gardensId: userUpdatedGardens }
        )

    res.json( newGardenId)


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
