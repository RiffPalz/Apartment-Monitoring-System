// imports 
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './config/database.js';
import userRoutes from './routes/userRoutes.js';

// APP CONFIG
const app = express();
const PORT = process.env.PORT || 5000;  // Use 5000 by default (common for APIs)

// MIDDLEWARES
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // For form data

// API ENDPOINTS
app.use('/api/users', userRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send("API is working!");
});

// SERVER + DB STARTUP
const startServer = async () => {
  try {
    await connectDB(); // Make sure DB is ready before starting server
    app.listen(PORT, () => {
      console.log(`Server started on PORT: ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    process.exit(1); // Stop the process if DB fails
  }
};

startServer();
