const globalError = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (process.env.NODE_ENV == 'development') {
        SendErrorForDev(err, res);
    }
    else {
        SendErrorForProd(err, res);
    }
};

const SendErrorForDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
}

const SendErrorForProd = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
}

module.exports = globalError;