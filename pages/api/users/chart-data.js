import dbConnect from '@/utils/dbConnect'
import User from '@/models/User'

export default async function handler(req, res) {
    await dbConnect()
    try {
        const users = await User.find(req.query).select('createdAt -_id')
        res.status(200).json({ success: true, users })
    } catch (error) {
        res.status(400).json({ success: false })
    }
}
