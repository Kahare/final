import dotenv from 'dotenv';
dotenv.config();

export default {
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
    db: {
        user: process.env.DB_USER || 'your_db_user',
        password: process.env.DB_PASSWORD || 'your_db_password',
        server: process.env.DB_SERVER || 'localhost',
        database: process.env.DB_NAME || 'your_db_name'
    }
};
