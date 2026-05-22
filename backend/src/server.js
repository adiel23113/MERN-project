import { serverport } from './secret.js'; // 
import app from './app.js';
import { connectDB } from './config/db.js';

app.listen(serverport, async () => {
    console.log(`Server is running at http://localhost:${serverport}`);
    await connectDB();
    
});