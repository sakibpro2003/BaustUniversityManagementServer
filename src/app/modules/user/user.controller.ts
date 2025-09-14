import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './user.service';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { student: studentData, password } = req.body;
    const result = await StudentServices.createStudentIntoDB(
      password,
      studentData,
    );

    res.status(200).json({
      success: true,
      message: 'Student is created succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const UserControllers = {
  createStudent,
};
