require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const morgan = require('morgan');

morgan.token('query', (req) => JSON.stringify(req.query));

app.use(morgan(':method :url :status :response-time ms - :res[content-length] bytes :query'));


app.use(cors());
app.use(passport.initialize());
app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE',
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const authRouter = require('./routers/authRouter.js');

const commentRouter = require('./routers/commentRouter.js');

const topicsRouter = require('./routers/topicRouter.js')

const postRouter = require('./routers/postRouter.js')

const userRouter = require('./routers/userRouter.js')


app.use('/api/auth', authRouter);
app.use('/api/comments', commentRouter);
app.use('/api/topics', topicsRouter);
app.use('/api/posts', postRouter);
app.use('/api/users', userRouter)

const PORT = 8008;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
