const { response, request } = require('express')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

const validateJWT = async (req=request, res=response, next) => {
    
    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY) // Esto retorna el payload

        // Encontrar al usuario con el respectivo id
        const authUser = await User.findById(uid)

        // Verificar que el usuario exista
        if (!authUser) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe en la DB'
            })
        }

        // Verificar si el usuario no está eliminado
        if (!authUser.state) {
            return res.status(401).json({
                msg: 'Usuario no válido - usuario con state: false'
            })
        }
        
        req.authUser = authUser
        
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'Token no válido'
        })
    }
}

module.exports = {
    validateJWT
}