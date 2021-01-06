import dbConnect from '@/utils/dbConnect'
import User from '@/models/User'

export default async function handler(req, res) {
  await dbConnect()
    try {
        const user = await User.create(req.body) 
        res.status(201).json({ success: true, user })
    } catch (error) {
        res.status(400).json({ success: false, message: `couldn't register user` })
    }
}
