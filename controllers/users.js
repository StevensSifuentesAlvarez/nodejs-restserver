const bcryptjs = require('bcryptjs')
const User = require('../models/user')

const getUsers = async (req, res) => {
    // Paginamos
    const { limite=5, desde=0 } = req.query;
    const query = {state: true}

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ])

    res.status(200).json({
        status: 200,
        total, 
        users
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

    res.json(user)
}

const putUsers = async (req, res) => {

    const { id } = req.params
    const { _id, password, google, email, ...resto } = req.body
    // TODO: Validar contra base de datos
    if (password) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync()
        resto.password = bcryptjs.hashSync(password, salt)
    }

    // The third param is to allow the return of the new object into the DB - after update
    const usuario = await User.findByIdAndUpdate(id, resto, {new: true})
    // const usuario = await User.findOneAndUpdate(id, resto, {new: true})

    res.json({
        message: 'Método put - controlador',
        usuario
    })
}

const patchUsers = (req, res) => {
    res.json({
        msg: 'Método patch - controlador'
    });
}

const deleteUsers = async (req, res) => {
    const { id } = req.params

    // Eliminando fisicamente de la base de datos
    // const user = await User.findByIdAndDelete(id)
    
    // Cambiando de estado
    // Mantenemos la integridad referencial
    const user = await User.findByIdAndUpdate(id, { state: false }, {new: true})
    
    // const authUser = req.authUser
    
    res.json(user)
}

module.exports = {
    getUsers,
    postUsers,
    putUsers,
    patchUsers,
    deleteUsers
}