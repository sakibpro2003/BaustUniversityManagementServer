import { z } from 'zod';
const userValidationSchema = z.object({
  id: z.string(),
  passowrd: z
    .string()
    .max(20, { message: 'Password cannot exceed 20 characters' })
    .min(8, { message: 'Password must be at least of 8 characters' }),
  role: z.enum(['student', 'faculty', 'admin']),
});

export const UserValidation = {
  userValidationSchema,
};
