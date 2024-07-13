const jwt = require('jsonwebtoken')

const User = require('../models/userModel')

const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, { expiresIn: '3d' })
}

// login
const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)

        // create token
        const token = createToken(user._id)

        res.status(200).json({ email, token })
    }
    catch(err) {
        res.status(400).json({ error: err.message })
    }
}

// signup
const signupUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.signup(email, password)

        // create token
        const token = createToken(user._id)
        
        res.status(200).json({ email, token })
    }
    catch(err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports = {
    signupUser,
    loginUser
}