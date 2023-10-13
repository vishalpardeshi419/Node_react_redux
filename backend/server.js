require("dotenv").config();
const express = require('express')
const app = express(); 
const path = require('path')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const logEvents = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn')

//To create a server
const PORT = process.env.PORT || 3500;

// connect to MongoDB
connectDB();

app.use(credentials);

//CORS
app.use(cors(corsOptions));

//Middleware
app.use(express.urlencoded({ extended: false}));

//Middleware for Json
app.use(express.json());

//Middleware for cookieParser
app.use(cookieParser());

//serve static files 
app.use('/', express.static(path.join(__dirname, '/public')));
// app.use('/subdir', express.static(path.join(__dirname, '/public')));

// SETUP ROUTE
app.use('/', require('./routes/root'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/register', require('./routes/register'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

//Route for subdir
// app.use('/subdir', require('./routes/subdir'));
app.use(verifyJWT);
app.use('/employees', require('./routes/api/employees'));

//Page not found 404 page 
// insted of app.get 
    // app.get('/*', (req, res) => {
    // use app.all for all request
app.all('*', (req, res) => {
    res.status(404);
    if(req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if(req.accepts('json')) {
        res.json({ error: "404 Not Found"});
    } else {
        res.type('txt').send("404 Not found");
    }
})

app.use(errorHandler);


mongoose.connection.once('open', () => {
    console.log("Connected DB");
    //server listen
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
