const { Router } = require('express')
const { check } = require('express-validator')

/* const { isAdminRole, isRole } = require('../middlewares/validate-roles')
const { validateFields } = require('../middlewares/validate-fields')
const { validateJWT } = require('../middlewares/validate-jwt') */

const { isAdminRole, 
        isRole, 
        validateFields, 
        validateJWT } = require('../middlewares')

const { getUsers, 
        postUsers, 
        putUsers, 
        patchUsers,
        deleteUsers } = require('../controllers/users')
        
const { isValidRole, 
        emailExistsInDB, 
        existeUsuarioPorId } = require('../helpers/db-validators')

const router = Router()

router.get('/', getUsers)

router.post('/', [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La constraseña debe de ser mayor de 6 dígitos').isLength({min: 6}),
        check('email', 'El correo no es válido').isEmail(),
        check('email').custom(emailExistsInDB),
        // check('role', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('role').custom(isValidRole),
        validateFields
], postUsers)

router.put('/:id', [
        check('id', 'ID no válido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        check('role').custom(isValidRole),
        validateFields,
], putUsers)

router.patch('/', patchUsers)

router.delete('/:id', [
        validateJWT,
        // isAdminRole,
        isRole('ADMIN_ROLE', 'VENTAS_ROLE'),
        // isRole,
        check('id', 'ID no válido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        validateFields
], deleteUsers)

module.exports = router