var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    id: Number,
    mail: String,
    password: String,
    user_token: String,
    /* [FK_garden]: Array*/
});

var userModel = mongoose.model('user', userSchema);

module.exports = UserModel;