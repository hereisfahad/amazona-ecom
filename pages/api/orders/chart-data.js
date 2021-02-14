import dbConnect from '@/utils/dbConnect'
import Order from '@/models/Order'

export default async function handler(req, res) {
    await dbConnect()
    try {
        const orders = await Order.find(req.query).select('createdAt -_id')
        res.status(200).json({ success: true, orders })
    } catch (error) {
        res.status(400).json({ success: false })
    }
}
