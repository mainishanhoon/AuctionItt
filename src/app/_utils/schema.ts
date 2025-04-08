import { z } from 'zod';

export const OnboardingUserSchema = z.object({
  firstName: z.string().min(2, 'Required'),
  lastName: z.string().min(2, 'Required'),
  phoneNumber: z
    .number({
      message: 'Phone Number is Required',
    })
    .int()
    .gte(1000000000, { message: 'Pin Code must be of 10 digits' })
    .lte(9999999999, { message: 'Pin Code must be of 10 digits' }),
  pinCode: z
    .number({
      message: 'Pin Code is Required',
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
