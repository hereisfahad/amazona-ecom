import dbConnect from '@/utils/dbConnect'
import User from '@/models/User'
import gravatar from 'gravatar'
import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
    await dbConnect()
    try {
        const avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' });
        const user = await User.create({ ...req.body, image: avatar  })
        const payload = {
            user: { id: user.id }
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 })
        const { _id, name, email, isAdmin, image } = user
        res.status(201).json({
            success: true,
            user: { _id, name, email, isAdmin, image, token }
        })
    } catch (error) {
        res.status(400).json({ success: false, message: `couldn't register user` })
    }
}
