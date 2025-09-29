/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { StudentServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
const createStudent = catchAsync(async (req, res, next) => {
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
});

export const UserControllers = {
  createStudent,
};
