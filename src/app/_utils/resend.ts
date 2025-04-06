import { Resend as ResendClient } from 'resend';

export const Resend = new ResendClient(String(process.env.RESEND_API_KEY));
