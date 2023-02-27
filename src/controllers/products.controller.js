import Product from "../models/Product"

export const createProduct = async (req, res) => {
    console.log(req.body)
    const {name, category, price, imgURL} = req.body
    const new_product = new Product({name, category, price, imgURL})
    const product_saved = await new_product.save()
    
    res.status(201).json(product_saved)
}

export const getProducts = async (req, res) => {
    const product = await Product.find()
    res.status(200).json(product)
}

export const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.productId)
    res.status(200).json(product)
}

export const updateProductById = async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, {
        new: true
    })
    res.status(204).json(updatedProduct)
}

export const deleteProductById = async (req, res) => {
    const {productId} = req.params
    await Product.findByIdAndDelete(productId)
    res.status(204).json(productId)
}