var express = require('express');
var router = express.Router();

var uid2 = require('uid2')
var bcrypt = require('bcrypt');

var userModel = require('../models/users')


router.post('/signUp', async function(req,res,next){

  var error = []
  var result = false
  var savedUser = null
  var token = null

  const data = await userModel.findOne({
    email: req.body.emailFromFront
  })

  if(data != null){
    error.push('utilisateur déjà présent')
  }

  if(req.body.usernameFromFront == ''
  || req.body.emailFromFront == ''
  || req.body.passwordFromFront == ''
  ){
    error.push('champs vides')
  }


  if(error.length == 0){

    var hash = bcrypt.hashSync(req.body.passwordFromFront, 10);
    var newUser = new userModel({
      username: req.body.usernameFromFront,
      email: req.body.emailFromFront,
      gardensId:[],
      password: hash,
      token: uid2(32),
    })
  
    savedUser = await newUser.save()
  
    
    if(savedUser){
      result = true
      token = savedUser.token
    }
  }
  

  res.json({result, token, error})
})

router.post('/signIn', async function(req,res,next){

  var result = false
  var user = null
  var error = []
  var token = null
  var userGardens = []

  console.log("Mimic3: route users/signIn - valeur de mon req.body", req.body)
  
  if(req.body.emailFromFront == ''
  || req.body.passwordFromFront == ''
  ){
    error.push('champs vides')
  }

  if(error.length == 0){

    user = await userModel.findOne({
      email: req.body.emailFromFront,
    })

    console.log("Mimic5: route users/signIn - user trouvé?", user)
  
    console.log("Mimic6: route users/signIn - user's garden?", userGardens)
    
    
    if(user){
      // récupérer la liste des id de jardins
      userGardens = user.gardensId
      console.log("Mimic9: route users/signIn - user's garden?", userGardens)

      //vérifier que le password est le bon avec bcrypt
      if(bcrypt.compareSync(req.body.passwordFromFront, user.password)){
        result = true
        token = user.token
      } else {
        result = false
        error.push('mot de passe incorrect')
      }
      
    } else {//user n'existe pas
      error.push('email incorrect')
    }
  }
  

  res.json({result, token, userGardens, error})


})

module.exports = router;
