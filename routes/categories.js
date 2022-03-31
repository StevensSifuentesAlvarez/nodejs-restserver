const { Router } = require('express')
const { check } = require('express-validator')

const { 
    createCategory, 
    deleteCategory, 
    updateCategory, 
    getCategories, 
    getCategoryById} = require('../controllers/categories')

const { existCategoryById } = require('../helpers/db-validators')
const { validateJWT, validateFields, isRole } = require('../middlewares')

const router = Router()

// Obtener todas las categorias - publico
router.get('/', getCategories)

// Obtener una categoria por id - público
router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existCategoryById),
    validateFields
], getCategoryById)

// Crear una categoria por id - público
router.post('/', [
    validateJWT,
    check('name', 'The name is required').not().isEmpty(),
    validateFields
], createCategory)

// Actualizar - privado - cualquiera con token válido
router.put('/:id', [
        validateJWT,
        check('id', 'El id no es válido').isMongoId(),
        check('name', 'The name is required').not().isEmpty(),
        check('id').custom(existCategoryById),
        validateFields
], updateCategory)

// Borrar una categoria - Admin
router.delete('/:id', [
        validateJWT,
        isRole('ADMIN_ROLE'),
        check('id', 'el id no es válido').isMongoId(),
        check('id').custom(existCategoryById),
        validateFields
], deleteCategory)

module.exports = router