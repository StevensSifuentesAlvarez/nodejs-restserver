const bcryptjs = require('bcryptjs')
const { response } = require('express')
const { json } = require('express/lib/response')
const { generateJWT } = require('../helpers/generate-jwt')
const { googleVerify } = require('../helpers/google-verify')
const User = require('../models/user')

const login = async (req, res=response) => {
    
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

const googleSignIn = async (req, res=response) => {
    
    const { id_token } = req.body

    try {

        const { name, img, email } = await googleVerify( id_token )

        //
        let user = await User.findOne({ email })

        if (!user) {
            // Tengo que crearlo
            const data = {
                name,
                email,
                password: ':P',
                img,
                role: 'USER_ROLE',
                google: true
            }

            user = new User( data )
            await user.save()
        }

        // Si el usuario en DB
        if (!user.state) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            })
        }

        // Generar el JWT
        const token = await generateJWT( user.id )

        res.json({
            user,
            token
        })
        
    } catch (error) {
        res.status(400),json({
            ok: false,
            msg: 'El token no se údo verificar'
        })
    }
}

module.exports = {
    login,
    googleSignIn
}