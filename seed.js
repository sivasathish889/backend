const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User');
const Category = require('./src/models/Category');
const connectDB = require('./src/config/db');

dotenv.config();

const importData = async () => {
    try {
        await connectDB();

        await User.deleteMany();
        await Category.deleteMany();

        const createdUsers = await User.create([
            {
                name: 'Admin User',
                email: 'admin@example.com',
                password: 'password123',
                role: 'admin',
            },
            {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password123',
                role: 'editor',
            },
            {
                name: 'Jane Doe',
                email: 'jane@example.com',
                password: 'password123',
                role: 'user'
            }
        ]);

        const adminUser = createdUsers[0]._id;

        await Category.create([
            { name: 'Technology', description: 'Tech related posts' },
            { name: 'Lifestyle', description: 'Life related posts' },
            { name: 'Gaming', description: 'Game related posts' },
        ]);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
