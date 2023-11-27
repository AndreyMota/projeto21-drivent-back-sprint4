import { InputBookingBody } from '@/protocols';
import Joi from 'joi';

export const createBooking = Joi.object<InputBookingBody>({
    roomId: Joi.number().required()
});