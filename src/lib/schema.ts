import { z } from 'zod';
import { cities } from '@/constants/cities';
import { states } from '@/constants/states';

export const OnboardingUserSchema = z.object({
  firstName: z.string().min(2, 'First Name is required'),
  lastName: z.string().min(2, 'Last Name is required'),
  state: z.string().refine((state) => states.includes(state), {
    message: 'Invalid state selected',
  }),
  city: z.string().refine((city) => cities.some((c) => c.city === city), {
    message: 'Invalid city selected',
  }),
  pinCode: z
    .number({
      message: 'Pin Code is required',
    })
    .int()
    .gte(100000, { message: 'Pin Code must be of 6 digits' })
    .lte(999999, { message: 'Pin Code must be of 6 digits' }),
});
