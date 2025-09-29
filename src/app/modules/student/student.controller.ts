/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import status from 'http-status';
import catchAsync from '../../utils/catchAsync';



const getAllStudents = catchAsync(async (req, res, next) => {
  const result = await StudentServices.getAllStudentsFromDB();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Student retrieved successfully',
    data: result,
  });
});

const getSingleStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { studentId } = req.params;

    const result = await StudentServices.getSingleStudentFromDB(studentId);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Student is retrieved succesfully',
      data: result,
    });
  },
);

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
};
