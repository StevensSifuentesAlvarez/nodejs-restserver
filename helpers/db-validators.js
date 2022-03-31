const { Category, Role, User } = require('../models')

const isValidRole = async (role='') => {
    const roleExists = await Role.findOne({ role })
    if (!roleExists) {
        throw new Error(`El rol ${role} no está registrado en la DB`)
    }
}

// Verificar si el correo existe
const emailExistsInDB = async (email='') => {
    const emailExists = await User.findOne({ email })
    if (emailExists) {
        throw new Error(`El email ${email} ya existe`)
    }
}

const existeUsuarioPorId = async (id) => {
    const usuarioPorId = await User.findById(id)
    if (!usuarioPorId) {
        throw new Error(`El id ${id} NO existe`)
    }
}

const existCategoryById = async (id) => {
    const categoryById = await Category.findById(id)
    if(!categoryById){
        throw new Error(`El id ${id} NO existe`)
    }
}

module.exports = {
    isValidRole,
    emailExistsInDB,
    existeUsuarioPorId,
    existCategoryById
}