
const validateRoles = require('../middlewares/validate-roles')
const validateFields = require('../middlewares/validate-fields')
const validateJWT = require('../middlewares/validate-jwt')

module.exports = {
    ...validateRoles,
    ...validateFields,
    ...validateJWT
}