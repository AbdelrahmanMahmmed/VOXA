const swaggerAutogen = require('swagger-autogen')();
const doc = {
    info: {
        title: 'Chat AI',
        description: 'API documentation for Chat AI service',
    },
    host: 'localhost:27017',
    schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./interfaces/http/routes.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);