const express = require('express')
const router = require('./interfaces/http/routes.js');
const dotenv = require('dotenv');
const globalError = require('./shared/middlewares/globalError.js');
const ApiError = require('./shared/utils/APIError.js');

dotenv.config({ path: 'config.env' })
const app = express()
app.use("/api/payment/stripe/webhook", express.raw({ type: 'application/json' }));
app.use(express.json())
app.use(router)

const DBConnection = require('./infrastructure/database/mongo.js');
DBConnection();

const morgan = require('morgan');
app.use(morgan('dev'));

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// app.all('*', (req, res, next) => {
//     next(new ApiError(`No route found for: ${req.originalUrl}`, 404));
// });

app.use(globalError);

module.exports = app;