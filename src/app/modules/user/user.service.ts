import { Student } from '../student/student.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, student: Student) => {
  const result = await User.create(student);
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
};
