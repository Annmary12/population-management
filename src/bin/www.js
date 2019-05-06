import mongoose from "mongoose";
import dotenv from 'dotenv';
import app from '../app';

dotenv.config();

const port = process.env.PORT || 3000;

const connectionUrl = process.env.NODE_ENV == 'test' ? process.env.DB_URL_TEST : process.env.DB_URL;

mongoose.connect(connectionUrl, {
  useNewUrlParser: true,
  useCreateIndex: true
}, () => {
  console.log('Database Connected');
});

app.listen(port, () => {
  console.log(`Listening at :${port}...`);
});

export default app;