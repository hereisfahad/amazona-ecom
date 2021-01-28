import dbConnect from '@/utils/dbConnect'
import Order from '@/models/Order'
import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
    const { method, body, headers } = req;
    await dbConnect()
    if (method === 'POST') {
        try {
            const authorization = headers['authorization']
            const token = authorization && authorization.slice(7)
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            if (decoded?.user) {
                const order = await Order.create({ ...body, createdBy: decoded.user.id })
                return res.status(201).json({ success: true, order })
            } else {
                return res.status(401).json({ success: false, message: err.message })
            }
        } catch (error) {
            res.status(400).json({ success: false })
        }
    } else {
        try {
            const orders = await Order.find(req.query).populate('createdBy').populate('orderItems.product').sort({ createdAt: -1})
            res.status(200).json({ success: true, orders })
        } catch (error) {
            res.status(400).json({ success: false })
        }
    }
}
