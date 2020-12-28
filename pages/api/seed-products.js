import dbConnect from '@/utils/dbConnect'
import Product from '@/models/Product'
import products from '@/data/products'

export default async function handler(req, res) {
    await dbConnect()
    try {
        const savedProducts = await Product.insertMany(products)
        res.status(201).json({ success: true, savedProducts })
    } catch (error) {
        res.status(400).json({ success: false })
    }
}