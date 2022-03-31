const { request, response } = require("express");
const { Category } = require("../models");

const populateUser = (limit, offset, query) => {
    return new Promise((resolve, reject) => {
        Category.find(query)
        .limit(Number(limit))
        .skip(Number(offset))
        .populate('user')
        .exec((err, populated) => {
            if(err) reject(err)
            resolve(populated)
        })
    })
}

// obtenerCategorias - paginado - total - populate
const getCategories = async (req=request, res=response) => {
    const { limit=10, offset=0 } = req.query
    
    const query = {state: true}
    const total = await Category.countDocuments(query)
    const categories = await populateUser(limit, offset, query)

    res.status(200).json({
        status: 200,
        total,
        categories
    })
}
// obtenerCategoria - populate {}
const getCategoryById = async (req=request, res=response) => {
    const { id } = req.params

    const category = await Category.findById(id).populate('user', 'name')

    if(!category){
        return res.status(400).json({
            msg: `La categoria ${category} no existe`
        })
    }

    res.status(200).json({
        status: 200,
        category
    })
}

const createCategory = async (req=request, res=response) => {
    const name = req.body.name.toUpperCase();

    const categoryDB = await Category.findOne({ name })

    if(categoryDB){
        return res.status(400).json({
            msg: `La categoria ${categoryDB.name} ya existe`
        })
    }

    // Generate data to save
    const data = {
        name,
        user: req.authUser._id
    }

    const category = new Category(data)
    
    // Save to database
    await category.save()

    res.status(201).json(category)

}

// actualizarCategoria (solo el nombre)
const updateCategory = async (req=request, res=response) => {
    const { id } = req.params
    const name = req.body.name ? req.body.name.toUpperCase() : null

    if(!name){
        return res.status(400).json({
            msg: 'No ha ingresado un nombre'
        })
    }

    const modifiedCategory = await Category.findByIdAndUpdate(id, { name }, {new: true})
    res.status(200).json(modifiedCategory)
}

// borrarCategoria - estado:false
const deleteCategory = async (req=request, res=response) => {
    const { id } = req.params

    const category = await Category.findByIdAndUpdate(id, {state: false}, {new: true})

    res.status(200).json(category)

}

module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
}