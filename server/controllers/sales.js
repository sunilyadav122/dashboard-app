import OverallStats from "../models/OverallStat.js"

export const getSales = async (req,res) => {
    const stats = await OverallStats.find({})
    res.status(200).json(stats[0])
}