import express from 'express';
// import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import adminRoutes from './routes/adminRoutes';
import config from './config/config';
import { authenticateToken, authorizeRole } from './middleware/authMiddleware';
import { connectDB } from './utils/db';
import pollRoutes from './routes/pollRoutes';
import viewRoutes from './routes/viewRoutes';
import path from 'path';
import incidenceRoutes from './routes/incidenceRoutes';
import documentRoutes from './routes/documentRoutes';

const app = express();
const port = config.port;

var bodyParser = require('body-parser')

app.use(bodyParser.json([]));
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/admin', authenticateToken, authorizeRole(['Admin']), adminRoutes);
app.use('/api', pollRoutes);
app.use('/api', viewRoutes);
app.use('/api', incidenceRoutes);
app.use('/api', documentRoutes);

// Start server and connect to the database
const startServer = async () =>
{
    try
    {
        app.listen(port, () =>
        {
            console.log(`Server running on port ${port}`);
        });

        await connectDB();

    } catch (err)
    {
        console.error('Failed to start server', err);
    }
};

startServer();