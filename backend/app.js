const express = require("express");
const mongoose = require("mongoose");
const choiceRouter = require('./routes/choicerouter');

const mongoURI = 'mongodb://localhost:27017/aura';
mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(() => console.log('Failed to connect to MongoDB'));

const app = express();

app.use(express.json()); // Middleware to parse JSON

// CORS setup
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Use routes
app.use('/api/choice', choiceRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
