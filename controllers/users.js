const bcryptjs = require('bcryptjs')
const User = require('../models/user')

const getUsers = (req, res) => {
    res.status(200).json({
        id: 1,
        message: 'Método get - controlador'
    })
}

const postUsers = async (req, res) => {

    // Desestructuramos los valores requeridos
    const { name, email, password, role } = req.body
    
    // Creación de la instancia
    const user = new User({ name, email, password, role })

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync()
    user.password = bcryptjs.hashSync(password, salt)

    // Para guardar en MongoCompass
    await user.save()

    res.json({
        message: 'Método post - controlador',
        user,
    })
}

const putUsers = (req, res) => {
    res.json({
        id: 1,
        message: 'Método put - controlador'
    })
}

const patchUsers = (req, res) => {
    res.json({
        msg: 'Método patch - controlador'
    });
}

const deleteUsers = (req, res) => {
    res.json({
        id: 1,
        message: 'Método delete - controlador'
    })
}

module.exports = {
    getUsers,
    postUsers,
    putUsers,
    patchUsers,
    deleteUsers
}