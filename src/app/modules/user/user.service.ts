import mongoose from 'mongoose';
import config from '../../config';
// import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { Student } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import { AppError } from '../../errors/AppError';
import httpStatus from 'http-status';
// import { generateStudentID } from './user.utils';

const createStudentIntoDB = async (password: string, payload: Student) => {
  //if password not given, use default password
  const userData: Partial<TUser> = {};

  userData.password = password || (config.default_password as string);

  //set user role
  userData.role = 'student';

  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  const session = await mongoose.startSession();

  try {
    session.startTransaction()
    //manually generated id
    userData.id = await generateStudentId(admissionSemester);
    //create a user
    const newUser = await User.create([userData], { session });
    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newStudent = await StudentModel.create([payload], { session });
    if (!newStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');

    }
    await session.commitTransaction();
    await session.endSession()
    return newStudent;
    //   return result;
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
  }
};

export const StudentServices = {
  createStudentIntoDB,
};
