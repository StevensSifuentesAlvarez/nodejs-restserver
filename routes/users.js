const { Router } = require('express')
const { getUsers, 
        postUsers, 
        putUsers, 
        patchUsers,
        deleteUsers } = require('../controllers/users')
const router = Router()

router.get('/', getUsers)

router.post('/:id', postUsers)

router.put('/', putUsers)

router.patch('/', patchUsers)

router.delete('/', deleteUsers)

module.exports = router