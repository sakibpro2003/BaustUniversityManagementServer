/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.route';
import { success } from 'zod';
import globalErrorHandler from './app/middleware/globalErrorHandler';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
// app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/user', UserRoutes);

const getAController = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get('/', getAController);
app.use(globalErrorHandler);
export default app;
