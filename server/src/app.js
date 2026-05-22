import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import createError from 'http-errors';
import xss from 'xss';
import rateLimit from 'express-rate-limit';
import userRouter from './routers/userRouter.js';

const app = express();

const rateLimiter = rateLimit({
    windowMs: 1*60*1000,
    max: 5,
    message: 'too many request from this api. please try again later',
});

app.use(rateLimiter);
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// XSS Protection Middleware
app.use((req, res, next) => {
    if (req.body) {
        for (let key in req.body) {
            if (typeof req.body[key] === 'string') {
                req.body[key] = xss(req.body[key]);
            }
        }
    }
    next();
});
app.use('/api/users',userRouter);

app.get('/test', (req, res) => {
    res.status(200).send({
        message: 'api testing is working fine'
    });
});

// client error handling
app.use((req, res, next) => {
    next(createError(404, 'route not found'));
});

// server error handling
app.use((err, req, res, next) => {
    return res.status(err.status || 500).json({
        success: false,
        message: err.message,
    });
});

export default app;