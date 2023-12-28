import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import './todo.model.js';
import todosRoute from './todos.routes.js';
import 'dotenv/config.js';

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 4400;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/todos', todosRoute);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log('server and db up!');
    });
  })
  .catch((err) => console.log(err.message));
