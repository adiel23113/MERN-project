import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import createError from 'http-errors';
import userRouter from './routers/userRouter.js';
import seedRouter from './routers/seedRouter.js';

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/users', userRouter);
app.use('/api/seed', seedRouter);

app.get('/test', (req, res) => {
    res.status(200).send({
        message: 'api testing is working fine'
    });
});

app.use((req, res, next) => {
    next(createError(404, 'route not found'));
});

app.use((err, req, res, next) => {
    return res.status(err.status || 500).json({
        success: false,
        message: err.message,
    });
});

export default app;