const { request, response } = require("express")
const Role = require("../models/role")

const isAdminRole = (req= request, res=response, next) => {

    if (!req.authUser) {
        return res.status(500).json({
            msg: 'Se quiere verificar su rol sin validar el token'
        })
    }
    
    const { role, name } = req.authUser

    if (role!=='ADMIN_ROLE') {
        return res.status(403).json({
            msg: `${name} no tiene autorización para eliminar usuarios`
        })
    }

    next()
}

// ...roles :: representa el resto de argumentos, se almacenará en un arreglo
// La siguiente función recibe los roles por parámetro
const isRole = (...roles) => {
    return (req, res, next) => {
        if (!req.authUser) {
            return res.status(500).json({
                msg: 'Se quiere verificar su rol sin validar el token'
            })
        }

        const { role } = req.authUser

        if (!roles.includes(role)) {
            return res.status(403).json({
                msg: `Se requiere que posea los siguientes roles ${roles}`
            })
        }

        next()
    }
}

// La siguiente función validará los roles con los roles que se encuentran en la BD
/* const isRole = async (req=request, res=response, next ) =>{
    
    if (!req.authUser) {
        return res.status(500).json({
            msg: 'Se tiene que validar el token primero' 
        })
    }
    // Extraemos los roles válidos desde la bd
    const rolesCollection = await Role.find({})
    const roles = rolesCollection.map(r => (r.role)) // roles = [ 'ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE' ]

    if (!roles.includes(req.authUser.role)) {
        return res.status(403).json({
            msg: `Se requiere que posea los siguientes roles ${roles}`
        })
    }

    next()
} */

module.exports = {
    isAdminRole,
    isRole
}