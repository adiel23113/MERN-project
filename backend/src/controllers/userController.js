import createError from 'http-errors';
import User from '../models/userModel.js';
export const getUsers = async (req, res, next)=> {
    try{

        const search = req.query.search || "";
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;

        const searchRegExp = new RegExp(".*" + search + ".*", 'i');

        const filter = {
            isAdmin : {$ne : true},
            $or :[
                {name : { $regex : searchRegExp}},
                {name : { $regex : searchRegExp}},
            ],
        };

        const users = await User.find(filter);
        res.status(200).json({
            message:'users were returned',
            
            users,

        })
    } catch(error) {
        next(error)
    }
};
