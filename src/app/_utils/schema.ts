import { z } from 'zod';

export const ITEM_STATUS = ['DRAFT', 'PUBLISHED'] as const;

export type ITEM_STATUS_TYPE = typeof ITEM_STATUS[number];


export const UserSchema = z.object({
  firstName: z.string().min(2, 'Required').toLowerCase(),
  lastName: z.string().min(2, 'Required').toLowerCase(),
  phoneNumber: z
    .string({
      message: 'Phone Number is Required',
    })
    .min(10, 'Phone Number must be of 10 digits')
    .max(10, 'Phone Number must be of 10 digits')
    .toLowerCase(),
  pinCode: z
    .number({
      message: 'Pin Code is Required',
    })
    .int()
    .gte(100000, { message: 'Pin Code must be of 6 digits' })
    .lte(999999, { message: 'Pin Code must be of 6 digits' }),
  image: z.string().optional(),
  email: z.string().email().optional(),
});

export const ItemsSchema = z.object({
  name: z.string().min(2, 'Name is Required').toLowerCase(),
  startingBid: z.number().min(0, 'Must be a positive number'),
  bidInterval: z.number().min(0, 'Must be a positive number'),
  endDate: z.date({ message: 'Date is required' }),
  description: z
    .string({ message: 'Description is Required' })
    .min(10, 'Description must be at least 10 characters long'),
  image: z.array(z.string()).min(1, 'Images are Required'),
  status: z.enum(ITEM_STATUS, {
    errorMap: () => ({ message: 'Status must be from the given options.' }),
  }),
});

export type Items = z.infer<typeof ItemsSchema>;

export const BidSchema = z.object({
  itemId: z.string(),
  currentBid: z.number(),
});
