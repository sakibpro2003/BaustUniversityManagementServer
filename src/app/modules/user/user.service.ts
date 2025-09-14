import config from '../../config';
import { Student } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: Student) => {
  //if password not given, use default password
  const userData: Partial<TUser> = {};

  userData.password = password || (config.default_password as string);

  //set user role
  userData.role = 'student';

  //manually generated id
  userData.id = '2030001';
  //create a user
  const result = await User.create(userData);
  //create a student
  if (Object.keys(result).length) {
    studentData.id = result.id;
    studentData.user = result._id;
  }

  const newStudent = await StudentModel.create(studentData);
  return newStudent;
  //   return result;
};

export const StudentServices = {
  createStudentIntoDB,
};
