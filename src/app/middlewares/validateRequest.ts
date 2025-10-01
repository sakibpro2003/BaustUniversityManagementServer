import { NextFunction } from 'express';
// import { ZodObject } from 'zod';
import { ZodTypeAny } from 'zod';

const validateRequest = (schema: ZodTypeAny) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
      });
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default validateRequest;
