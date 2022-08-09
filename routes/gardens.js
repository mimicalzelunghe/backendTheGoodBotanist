var express = require('express');
const ClimateModel = require('../models/climates');
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
    var userGardens = await UserModel.findOne( { token: req.body.token  } ).populate('gardensId');
    console.log("🚀 ~ file: gardens.js ~ line 28 ~ router.post ~ user", userGardens)

    // if idGarden is not empty, we should put it on the top of the list
    var first = req.body.idGarden;
    console.log("🚀 ~ file: gardens.js ~ line 35 ~ router.post ~ first", first)
    
    /*if (first != ""){
        // retrouver l'idGarden
        userGardens.sort(function(x,y){return x._id ==first? -1 : y == first ? 1 : 0})

    }*/
    //data.sort(function(x,y){ return x == first ? -1 : y == first ? 1 : 0; });
    ///console.log("🚀 ~ file: gardens.js ~ line 44 ~ router.post ~ userGardens", userGardens)    

    //TODO: Mimic récupérer les parcelles

    res.json(userGardens);
    
    
});

/* =================================================
    Creates a new garden for the user
================================================= */
router.post('/createGarden', async function (req, res, next) {


        console.log("req.body ",req.body);


         var Climate = await ClimateModel.find( { climate_type: req.body.gardenClimate } );
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
