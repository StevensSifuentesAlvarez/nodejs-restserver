const { Router } = require('express')
const { check } = require('express-validator')
const { getUsers, 
        postUsers, 
        putUsers, 
        patchUsers,
        deleteUsers } = require('../controllers/users')
const { isValidRole, emailExistsInDB } = require('../helpers/db-validators')
const { validateFields } = require('../middlewares/validate-fields')
const router = Router()

router.get('/', getUsers)

router.post('/', [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La constraseña debe de ser mayor de 6 dígitos').isLength({min: 6}),
        // check('email', 'El correo no es válido').isEmail(),
        check('email').custom(emailExistsInDB),
        // check('role', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('role').custom(isValidRole),
        validateFields
], postUsers)

router.put('/', putUsers)

router.patch('/', patchUsers)

router.delete('/', deleteUsers)

module.exports = router