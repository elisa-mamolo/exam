const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const db = require("mongodb");

const checkJwt = require('express-jwt');    // Check for access tokens automatically
const bcrypt = require('bcryptjs');         // Used for hashing passwords!

/**** Configuration ****/
const port = (process.env.PORT || 8000);
const app = express();
//configure libraries
app.use(cors());
app.use(bodyParser.json()); // Parse JSON from the request body
//app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('combined')); // Log all requests to the console
app.use(express.static('../client/build')); // Only needed when running build in production mode


// Open paths that do not need login. Any route not included here is protected!
let openPaths = [
    { url: '/api/users/authenticate', methods: ['POST'] },
    //add questions so the user not logged in can still see my questions
    { url: '/api/categories', methods: ['GET'] }
];

//this is the first part of the middleware
// Validate the user using authentication. checkJwt checks for auth token.
//use the secret to check the validity of the token
const secret = "the cake is a lie";
app.use(checkJwt({ secret: secret }).unless({ path : openPaths }));

// This middleware checks the result of checkJwt
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') { // If the user didn't authorize correctly
        res.status(401).json({ error: err.message }); // Return 401 with error message.
    } else {
        next(); // If no errors, send request to next middleware or route handler
    }
});

/**** Users ****/

// It is recommended that you store users in MongoDB using Mongoose instead of this.
const users = [
    // These are just some test users with passwords.
    // The passwords are in clear text for testing purposes. (don't do this in production)
    { id: 0, username: "elisa", password: '123', admin: true},
    { id: 1, username: "giulia", password: 'password', admin: false},
    { id: 2, username: "silvia", password: 'l33th0xor', admin: false},
];

// Creating more test data: We run through all users and add a hash of their password to each.
// Again, this is only for testing. In practice, you should hash only when adding new users.
users.forEach(user => {
    //10 is because it is hashed 10 times
    bcrypt.hash(user.password, 10, function(err, hash) {
        user.hash = hash; // The hash has been made, and is stored on the user object.
        delete user.password; // The clear text password is no longer needed
        console.log(`Hash generated for ${user.username}`, user); // For testing purposes
    });
});

/**** Database ****/
// The "Category Data Access Layer". file shop_dal.js
// give module to mongoose as a parameter to make operations with the data
const shopDAL = require('./shop_dal')(mongoose);

/**** Routes ****/

const usersRouter = require('./users_router')(users, secret);
app.use('/api/users', usersRouter);

//get all categories
app.get('/api/categories', (req, res) => {
    // Get all questions. Put question into json response when it resolves.
    shopDAL.getCategories().then(categories => res.json(categories));
});

//get category by id
app.get('/api/categories/:id', (req, res) => {
    let id = req.params.id;
    //using my module with the methods I have created to access api
    shopDAL.getCategory(id).then(category => res.json(category));
});

//get book by id - not working
app.get('/api/books/:id', (req, res) => {
    let id = req.params.id;
    shopDAL.getCategory(id).then(category => res.json(category));
});

//post category
app.post('/api/categories', (req, res) => {
    let category = {
        //need to specify question because otherwise is expecting a answer
        category : req.body.category,
        books : [] // Empty answer array
    };
    shopDAL.createCategory(category).then(newCategory => res.json(newCategory));
});

//post book
app.post('/api/categories/:id/books', (req, res) => {
    // To add a hobby, you need the id of the question, and some hobby text from the request body.
    shopDAL.addBook(req.params.id, req.body.books)
        .then(updatedCategory => res.json(updatedCategory));
});

app.get("/api/categories/:id/books/:id", (request, response) => {
    let id = request.params.id;
    let bookId =  request.params.id;
    shopDAL.getBook(id, bookId).then(book => response.json(book));
});

//delete question - not implemented
app.delete('/api/categories/:id', (req, res)=>{
    const id = req.params.id;
    shopDAL.removeCategory(id).then(category => res.json(category.remove()))
});

// "Redirect" all get requests (except for the routes specified above) to React's entry point (index.html) to be handled by Reach router
// It's important to specify this route as the very last one to prevent overriding all of the other routes
app.get('*', (req, res) =>
    res.sendFile(path.resolve('..', 'client', 'build', 'index.html'))
);

/**** Start ****/
const url = (process.env.MONGO_URL || 'mongodb://localhost/shopLogin_db');

return mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    //when it is connected i listen to my api
    .then(async () => {
        await shopDAL.bootstrap(); // Fill in test data if needed.
        await app.listen(port); // Start the API
        console.log(`Category API running on port ${port}!`)
    })
    .catch(error => console.error(error));