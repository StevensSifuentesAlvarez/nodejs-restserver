const bcryptjs = require('bcryptjs')
const { generateJWT } = require('../helpers/generate-jwt')
const User = require('../models/user')

const login = async (req, res) => {
    
    const { email, password } = req.body
    
    try {
        // Verificar si el email existe
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - email'
            })
        }

        // Si el usuario está activo
        if (!user.state) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correcto, state: false'
            })
        }

        // Verificar la contraseña
        const pass = await bcryptjs.compareSync(password, user.password)
        if (!pass) {
            return res.status(400).json({
                msg: 'Password incorrecto'
            })
        }

        // Generar el JWT
        const token = await generateJWT(user.id)

        res.json({
            user,
            token
        })

    } catch (error) {
        console.log(error)
        res.json({
            msg: 'Login Incorrecto'
        })
    }
}

module.exports = {
    login
}