import { z } from 'zod';

export type UserType = 'student' | 'messOwner';

export interface AuthUser {
  id: string;
  email: string;
  userType: UserType;
  created_at: string;
}

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = loginSchema.extend({
  userType: z.enum(['student', 'mess_owner'] as const),
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;