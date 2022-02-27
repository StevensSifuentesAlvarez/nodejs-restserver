const { Schema, model } = require('mongoose')
const mongooseHidden = require('mongoose-hidden')()

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        // Primera opción
        // hide: true,
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})
// Primera opción
// userSchema.plugin(mongooseHidden)

// Segunda opción
userSchema.plugin(mongooseHidden, { hidden: {_id: false, __v: false, password: true}})

// El primer parametro es el nombre de la colección
module.exports = model('User', userSchema)