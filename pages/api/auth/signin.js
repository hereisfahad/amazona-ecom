import dbConnect from '@/utils/dbConnect'
import User from '@/models/User'
import bcrypt from 'bcrypt'

export default async function handler(req, res) {
    await dbConnect()
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if(user) {
            if(bcrypt.compareSync(password, user.password)) {
                return res.status(200).json({ success: true, user })
            }
        }
        return res.status(401).json({ success: false, message: "Invalid email or password." })
    } catch (error) {
        res.status(401).json({ success: false, message: "Couldn't sign in please try again." })
    }
}
