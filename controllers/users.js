
const getUsers = (req, res) => {
    res.status(200).json({
        id: 1,
        message: 'Método get - controlador'
    })
}

const postUsers = (req, res) => {
    const { name, lastname, age } = req.body
    const { id } = req.params
    const { nombre, page, limit } = req.query 
    res.json({
        id,
        message: 'Método post - controlador',
        name, 
        lastname, 
        age,
        nombre, 
        page, 
        limit
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