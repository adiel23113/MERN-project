import 'dotenv/config';
export const serverport = process.env.SERVER_PORT || 3002;

export const mongodbURL = process.env.MONGODB_ATLAS_URL ||'mongodb://localhost:27017/ ecommerceMernDb';