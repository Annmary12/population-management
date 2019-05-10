import Express from 'express';
import BodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';
import expressValidator from 'express-validator';

const app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extented: true }));

app.use(expressValidator());

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to population management system API!!!'
  })
});

app.use('/api/v1/location', routes);

app.use('*', (req, res, next) => {
  res.status(404).json({
    error: 'Route doesn\'t exist'
  });
  next();
});

export default app;
