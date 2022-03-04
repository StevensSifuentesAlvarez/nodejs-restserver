const mongoose = require('mongoose')

const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })

        console.log('Base de datos online')
    } catch (error) {
        console.log(error)
        throw new Error('Conección NO realizada')
    }
}

module.exports = {
    connection
}