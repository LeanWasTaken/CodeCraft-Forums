require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport');

app.use(cors());
app.use(passport.initialize())
app.use((req, res, next) => {
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    )
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const authRouter = require('./routers/authRouter.js');

app.use('/api/auth', authRouter);

const PORT = process.env.SERVER_PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
