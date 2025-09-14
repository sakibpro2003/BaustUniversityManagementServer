import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import status from 'http-status';
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

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const UserControllers = {
  createStudent,
};
