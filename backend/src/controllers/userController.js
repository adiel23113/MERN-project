import createError from 'http-errors';
import User from '../models/userModel.js';
import { successResponse } from './responseController.js';
import mongoose from 'mongoose';
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
                {email : { $regex : searchRegExp}},
                {phone : { $regex : searchRegExp}},
               
            ],
        };
        const options = {password: 0 }
        const users = await User.find(filter,options)

        .limit(limit)
        .skip((page - 1)* limit)
        const count = await User.find(filter).countDocuments();
        if(!User) throw createError(404,'user no found');

        return successResponse(res,{
            statusCode : 200,
            message : 'users were returned successfully',
            payload: {  users,
            pagination :{
                totalPages: Math.ceil(count/limit),
                currentPage: page,
                previousePage: page - 1 > 0 ? page-1 : null,
                nextPage : page + 1 <= Math.ceil(count/limit)? page + 1 : null,
            },
        },
        });
    } catch(error) {
        next(error)
    }
};


export const getUser = async (req, res, next)=> {
    try{
        const id = req.params.id
        const options = {password: 0};
        const user = await User.findById(id, options);
        
        if (!user){
            throw createError(404, 'user does not exist with this id');
        }

        return successResponse(res,{
            statusCode : 200,
            message : 'user were returned successfully',
            payload: {  user
        
        },
        });
    } catch(error) {
        if (error instanceof mongoose.Error){
            next (createError(400,'invalide User id '))
            return;
        }
        next(error);
    }
};
