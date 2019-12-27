const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 2nd step
// Opens a connection to the test db
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected");
});
//////////////////////////

// Require the Routes files
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

// Actual routes
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});


// error catch
process.on('unhandledRejection', error => {
    // Won't execute
    console.log('unhandledRejection', error.test);
  });
  
  new Promise((_, reject) => reject({ test: 'woops!' })).catch(() => {});