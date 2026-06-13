const createError = require('http-errors');
const user = require('../models/userModel')

const getUsers = (req, res, next)=> {
    try{
        const user = await User.find();
        const serach = req.query.serach || "";
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        res.status(200).seen({
            message:'users were returned',
            
            users,

        })
    } catch(error) {
        next(error)
    }
};
module.exports = {getUsers}