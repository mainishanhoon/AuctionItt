import { z } from 'zod';

export const OnboardingUserSchema = z.object({
  firstName: z.string().min(2, 'Required').toLowerCase(),
  lastName: z.string().min(2, 'Required').toLowerCase(),
  phoneNumber: z
    .string({
      message: 'Phone Number is Required',
    })
    .min(10, 'Phone Number must be of 6 digits')
    .max(10, 'Phone Number must be of 6 digits')
    .toLowerCase(),
  pinCode: z
    .number({
      message: 'Pin Code is Required',
    })
    .int()
    .gte(100000, { message: 'Pin Code must be of 6 digits' })
    .lte(999999, { message: 'Pin Code must be of 6 digits' }),
});

export const ItemsSchema = z.object({
  name: z.string().min(2, 'Name is Required').toLowerCase(),
  startingPrice: z.number().min(0, 'Must be a positive number'),
  description: z
    .string({ message: 'Description is Required' })
    .min(10, 'Description must be at least 10 characters long'),
  image: z.array(z.string()).min(1, 'Images are Required'),
});

export type Items = z.infer<typeof ItemsSchema>;
