import User from "../models/User.js"


export const getAdmins = async (req,res) => {
    const user = await User.find({role:'admin'}).select("-password")
    res.status(200).json(user)
}