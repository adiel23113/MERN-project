import mongoose from "mongoose";
import { mongodbURL } from "../secret.js";
export const connectDB = async (options = {}) => {
    try{
        await mongoose.connect(mongodbURL,options);
        console.log('Connection to DB is successfully established');
        mongoose.connection.on('error', (error) => {
            console.error('DB connection error:', error);

        })
    } catch (error){
      console.error('Could not connect to DB', error.toString());
    }
}