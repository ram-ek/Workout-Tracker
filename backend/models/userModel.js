const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// static signup
userSchema.statics.signup = async function(email, password) {
    // validation
    if(!email || !password)
        throw Error('All fields are required.')

    if(!validator.isEmail(email))
        throw Error('Please enter a valid email.')

    if(!validator.isStrongPassword(password))
        throw Error('Password is not strong enough (1 Uppercase, 1 Lowercase, 1 Number, 1 Special character is required).')

    // check for duplicate email
    const exists = await this.findOne({ email })
    if(exists)
        throw Error('Email already exists.')

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    // create document
    const user = await this.create({ email, password: hash })

    return user
}

// static login
userSchema.staticslogin = async function(email, password) {
    // validation
    if(!email || !password)
        throw Error('All fields are required.')

    // check for duplicate email
    const user = await this.findOne({ email })
    if(!user)
        throw Error('User not found.')

    const match = await bcrypt.compare(password, user.password)
    if(!match)
        throw Error('Password is not correct.')

    return user
}

module.exports = mongoose.model('User', userSchema)