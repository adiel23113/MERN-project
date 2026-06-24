import  model  from 'mongoose';
import  express  from 'express';
export const errorResponse = (res, {statusCode = 500, message = 'Internal Server Error'})=>{
    return res.status(statusCode).json({
    success: false,
    message : message,
    });
};
export const successResponse = (res, {statusCode = 200, message = 'success', payload={}})=>{
    return res.status(statusCode).json({
    success: true,
    message : message,
    });
};
