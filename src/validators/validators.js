import { z } from 'zod';

export const signUpSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(2, 'Name must be at least 2 characters'),
  email: z.string({ required_error: 'Email is required' }).email(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const signInSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email(),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, 'Password must be at least 6 characters'),
});

export const addTaskSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .min(3, 'Title must be at least 3 characters'),

  description: z
    .string({ required_error: 'Description is required' })
    .min(20, 'Description must be at least 20 characters'),

  date: z.string({ required_error: 'Date is required' }),
});
