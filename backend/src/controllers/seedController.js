import { data } from '../data.js';
import User from '../models/userModel.js';

export const seedUser = async (req, res) => {
    try {
        
        await User.deleteMany({});
        
       
        const users = await User.create(data.user);
        
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