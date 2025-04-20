import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import socketRoutes from './routes/socketRoutes.js';
import { fileURLToPath } from 'url';
import path from 'path';
import {socketHandler} from './controllers/socketController.js';


dotenv.config();

const app = express();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  credentials: true,
}));
socketHandler(app);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', socketRoutes);



const PORT = process.env.PORT;
app.listen(PORT, async () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
