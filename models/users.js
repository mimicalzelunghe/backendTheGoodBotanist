const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    articlesId: [
        {type: mongoose.Schema.Types.ObjectId, ref:'gardens'}
    ],
    username: String,
    email: String,
    password: String,
    token: String,
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel