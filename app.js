const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');
const cacheRoutes = require('./routes/cacheRoutes');
const config = require('./config/config');

const app = express();

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use('/api', cacheRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Добро пожаловать в наше REST API!' });
});

app.listen(config.PORT, () => {
  console.log(`Сервер запущен на порту ${config.PORT}`);
});