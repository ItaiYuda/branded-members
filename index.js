const express = require('express');
var cors = require('cors');
const connectDB = require('./config/db');
const userRouter = require('./routers/user');
const authRouter = require('./routers/auth');
const memberRouter = require('./routers/member');
//Connect Database
connectDB();

const app = express();

app.use(cors());
app.use(express.json({ extended: false }));

app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/member', memberRouter);

app.listen(5000, () => {
    console.log('Hello');
});
