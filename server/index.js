const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

require('dotenv').config();
const app = express();

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));
app.use(cookieParser());

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSec = "Anu@2345"

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
        const userDoc = await User.create({
            username, email, password: hashedPassword
        });
        res.status(201).json(userDoc);
    } catch {
        res.status(500).json({ message: 'Something went wrong' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const userDoc = await User.findOne({ email });
        if (!userDoc) return res.status(400).json({ message: 'User not found' });

        const passwordMatch = bcrypt.compareSync(password, userDoc.password);
        if (passwordMatch) {
            jwt.sign({
                email: userDoc.email,
                userId: userDoc._id,
                username: userDoc.username
            }, jwtSec, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(userDoc);
            });
        } else {
            res.status(400).json({ message: 'Invalid password' });
        }
    } catch {
        res.status(500).json({ message: 'Something went wrong' });
    }
});

app.get('/user', async (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSec, {}, async (err, decoded) => {
            if (err) {
                console.error('Error verifying token:', err);
                return res.status(401).json({ error: 'Unauthorized' });
            }
            const user = await User.findById(decoded.userId, 'username email');
            res.json(user);
        });
    } else {
        res.json(null);
    }
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
