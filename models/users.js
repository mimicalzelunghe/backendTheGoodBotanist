const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    gardensId: [
        {type: mongoose.Schema.Types.ObjectId, ref:'gardens'}
    ],
    username: String,
    email: String,
    password: String,
    token: String,
})

const UserModel = mongoose.model('users', userSchema)

module.exports = UserModel