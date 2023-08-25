import 'reflect-metadata';
import { configDotenv } from 'dotenv';
import { app } from './express';

configDotenv();

const port: number = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
