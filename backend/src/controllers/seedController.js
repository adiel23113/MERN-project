import { data } from '../data.js';
import User from '../models/userModel.js';

export const seedUser = async (req, res) => {
    try {
        // আগের সব user মুছো
        await User.deleteMany({});
        
        // নতুন user add করো
        const users = await User.insertMany(data.user);
        
        res.status(200).json({
            message: 'Users seeded successfully',
            users
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
