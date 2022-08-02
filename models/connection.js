var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useUnifiedTopology : true,
    useNewUrlParser: true,
}

mongoose.connect('mongodb+srv://thebotanists:thebotanists@cluster0.hvvte.mongodb.net/thegoodbotanist?retryWrites=true&w=majority',
    options,
    function(err){
        if (err == null){
            console.log("Base de données connectée")
        }else{
            console.log(err);
        }
        
    }
)

module.exports = mongoose