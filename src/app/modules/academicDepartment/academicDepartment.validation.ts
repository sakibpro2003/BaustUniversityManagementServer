import { z } from 'zod';

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string('Academic department must be string'),
    academicFaculty: z.string('Academic faculty must be string'),
  }),
});

const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string(
        'Academic department must be string',
        // required_error: 'Name is required',
      )
      .optional(),
    academicFaculty: z
      .string(
        'Academic faculty must be string',
        // required_error: 'Faculty is required',
      )
      .optional(),
  }),
});

export const AcademicDepartmentValidation = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
