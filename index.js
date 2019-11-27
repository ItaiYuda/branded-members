const express = require('express');
const connectDB = require('./config/db');
const userRouter = require('./routers/user');
const authRouter = require('./routers/auth');
const memberRouter = require('./routers/member');
//Connect Database
connectDB();

const app = express();

app.use(express.json({ extended: false }));

app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/member', memberRouter);

app.listen(5000, () => {
  console.log('Hello');
});
