import config from '../../config';
// import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { Student } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
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
  //manually generated id
  userData.id = await generateStudentId(admissionSemester);
  //create a user
  const result = await User.create(userData);
  //create a student
  if (Object.keys(result).length) {
    payload.id = result.id;
    payload.user = result._id;
  }

  const newStudent = await StudentModel.create(payload);
  return newStudent;
  //   return result;
};

export const StudentServices = {
  createStudentIntoDB,
};
