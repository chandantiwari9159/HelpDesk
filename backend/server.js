import express from 'express'; // Change: require -> import
import cors from 'cors'; // Change: require -> import
import mongoose from 'mongoose'; // Change: require -> import

const PORT = 5000;
const MONGO_URI = 'mongodb://127.0.0.1:27017/helpdeskdb'; 
const FRONTEND_URL = 'http://localhost:5173'; 

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

connectDB();

const app = express();

app.use(cors({
    origin: FRONTEND_URL, 
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Auth Routes: Agar aapki routes file bhi CommonJS (.js) hai, 
// toh use bhi import karna hoga. Maan lijiye ki aapki route file ka naam 'authRoutes.js' hai:
// import authRoutes from './routes/authRoutes.js'; 
// app.use('/api/auth', authRoutes); 

app.get('/', (req, res) => {
    res.send('Server is up and running. Ready for API calls!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
