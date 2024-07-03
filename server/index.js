const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./model/user');
const Habit = require('./model/habit')
const Post = require('./model/post');
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

app.post('/habit' , async(req,res) => {
    const { title, description, date } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required' });
    }

    try {
        const newHabit = new Habit({
            title,
            description,
            date: date ? new Date(date) : new Date(),
            completed: false
        });

        const savedHabit = await newHabit.save();
        res.status(201).json(savedHabit);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

app.get('/habit' , async(req,res) => {
    const date = new Date(req.query.date);
    try {
        const habits = await Habit.find({ date: date, completed: false });
        const completedHabits = await Habit.find({ date: date, completed: true });
        res.json({ habits, completedHabits });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})
app.post('/habit/:id/complete' , async(req , res) => {
    const {id} = req.params
    const habitDoc = await Habit.findById(id)
    habitDoc.completed = true
    habitDoc.save()
    res.json(habitDoc)
})
app.get('/stats', async (req, res) => {
    try {
        const habits = await Habit.find();

        const dates = [];
        const scheduledHabits = [];
        const completedHabits = [];

        habits.forEach(habit => {
            const date = habit.date.toISOString().split("T")[0];
            if (!dates.includes(date)) {
                dates.push(date);
                scheduledHabits.push(0);
                completedHabits.push(0);
            }

            const dateIndex = dates.indexOf(date);
            scheduledHabits[dateIndex]++;

            if (habit.completed) {
                completedHabits[dateIndex]++;
            }
        });

        res.json({ dates, scheduledHabits, completedHabits });
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post('/post' , async(req,res) => {
    const { content } = req.body
    const {token} = req.cookies;
    if(token){
        jwt.verify(token, jwtSec, {} , async (err, decoded) => {
            if (err) {
                console.error('Error verifying token:', err);
                return res.status(401).json({ error: 'Unauthorized' });
            }
            try {
                const postDoc = new Post({
                    content,
                    user: decoded.userId,
                    date: new Date(),
                });
                const post = await postDoc.save();
                res.status(201).json(post);
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
}) 

app.get('/post' , async(req,res) => {
    try {
        const posts = await Post.find().sort({ date: -1 }).populate('user');
        res.json(posts);
    }catch{
        res.status(500).json({ message: error.message });
    }
})

app.post('/update-profile' , async(req,res) => {
    const { username , email } = req.body
    const {token} = req.cookies;
    if(token){
        jwt.verify(token, jwtSec, {} , async (err, decoded) => {
            if (err) {
                console.error('Error verifying token:', err);
                return res.status(401).json({ error: 'Unauthorized' });
            }
            try {
                const user = await User.findOne({ _id: decoded.userId });
                user.username = username;
                user.email = email;
                const userDoc = await user.save();
                res.status(201).json(userDoc);
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
})

app.post('/change-password' , async(req,res) => {
    const {oldPassword ,  newPassword } = req.body
    const {token} = req.cookies;
    if(token){
        jwt.verify(token, jwtSec, {} , async (err, decoded) => {
            if (err) {
                console.error('Error verifying token:', err);
                return res.status(401).json({ error: 'Unauthorized' });
            }
            try {
                const user = await User.findOne({ _id: decoded.userId });
                const passwordMatch = bcrypt.compareSync(oldPassword, user.password);

                if (!passwordMatch) {
                    return res.status(400).json({ message: 'Incorrect old password' });
                }

                user.password = bcrypt.hashSync(newPassword, bcryptSalt);
                await user.save();
                res.json({ message: 'Password updated successfully' });
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
})
app.get('/help', (req, res) => {
    const helpContent = {
        overview: "The Habit Tracker website is designed to help users track their daily habits, set reminders, and view their progress over time. Users can also post their thoughts, which can be seen by other logged-in users.",
        features: {
            userAuthentication: [
                "Register: Users can create an account using their username, email, and password.",
                "Login: Registered users can log in using their email and password.",
                "Token Management: JWT tokens are used for authentication, stored as cookies."
            ],
            habitManagement: [
                "Add Habit: Users can add a new habit with a title, description, and date.",
                "View Habits: Users can view their habits scheduled for the current day.",
                "Complete Habit: Users can mark a habit as completed.",
                "Statistics: Users can view statistics of their habits, including scheduled and completed habits."
            ],
            userPosts: [
                "Add Post: Users can post their thoughts, which will be visible to other logged-in users.",
                "View Posts: Users can view posts from all users."
            ],
            settingsPage: [
                "Theme Switcher: Users can toggle between light and dark themes.",
                "Profile Management: Users can update their profile details such as username and email."
            ]
        },
        furtherQueries: "For any further queries, you can contact the owner of the Habit Tracker website at: anushkashendge5@gmail.com"
    };

    res.json(helpContent);
});

app.post('/logout', async (req, res) => {
    res.cookie('token', '').json(true);
});


app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
