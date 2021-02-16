import dbConnect from '@/utils/dbConnect'
import Product from '@/models/Product'
import _omit from 'lodash/omit';
import _pickBy from 'lodash/pickBy'
import _identity from 'lodash/identity'

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
            const { limit, currentPage } = req.query
            const skip = (Number(currentPage) - 1) * Number(limit) || 0
            const query = _omit(_pickBy(req.query, _identity), ['limit', 'currentPage'])
            const totalCount = await Product.countDocuments(query)
            const products = await Product.find(query).skip(skip).limit(Number(limit) || 0).sort({createdAt: -1})
            res.status(200).json({ success: true, products, totalCount })
        } catch (error) {
            res.status(400).json({ success: false })
        }
    }

}