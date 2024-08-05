const swaggerJsdoc = require('swagger-jsdoc');
const config = require('./config');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'VirusTotal API',
      version: '1.0.0',
      description: 'VirusTotal API with in-memory cache',
    },
    servers: [
      {
        url: `http://localhost:${config.PORT}/`,
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);
module.exports = specs;