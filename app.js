const express = require('express')
import {getProducts, getProduct, createProduct} from './index.js'

const app = express()

app.use(express.json())

app.get("/products", async (req, res) => {
    const products = await getProducts()
    res.send(products)
})

app.get("/products/:id", async (req, res) => {
    const id = req.params.id
    const product = await getProduct(id)
    res.send(product)
})

app.post("/products", async (req, res) => {
    const {productID, name, description, categories, supplier, price} = req.body
    const product = await createProduct(productID, name, description, categories, supplier, price)
    res.status(201).send(product)
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(8080, () => {
    console.log('Server is running on port 8080')
})