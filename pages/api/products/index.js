import dbConnect from '@/utils/dbConnect'
import Product from '@/models/Product'

export default async function handler(req, res) {
    const { method, body } = req;
    await dbConnect()
    if (method === 'POST') {
        try {
            const product = await Product.create(body)
            res.status(201).json({ success: true, product })
        } catch (error) {
            res.status(400).json({ success: false })
        }
    } else {
        try {
            const products = await Product.find(req.query)
            res.status(200).json({ success: true, products })
        } catch (error) {
            res.status(400).json({ success: false })
        }
    }

}