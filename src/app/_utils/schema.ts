import { z } from 'zod';

export const OnboardingUserSchema = z.object({
  firstName: z.string().min(2, 'First Name is required'),
  lastName: z.string().min(2, 'Last Name is required'),
  phoneNumber: z.number(
    z
      .string()
      .min(10, 'Phone number must be exactly 10 digits long')
      .max(10, 'Phone number must be exactly 10 digits long'),
  ),
  pinCode: z
    .number({
      message: 'Pin Code is required',
    })
    .int()
    .gte(100000, { message: 'Pin Code must be of 6 digits' })
    .lte(999999, { message: 'Pin Code must be of 6 digits' }),
});

export const ItemsSchema = z.object({
  name: z.string(),
  price: z.number().min(0, 'Must be a positive number'),
  description: z.string(),
  image: z.array(z.string()).min(1, 'At least 4 Images are Required'),
});

export type Items = z.infer<typeof ItemsSchema>;
