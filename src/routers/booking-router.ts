import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { createBooking } from '@/schemas/booking-schema';
import { bookingController } from '@/controllers/booking-controller';

const bookingRouter = Router();

bookingRouter
    .all('/*', authenticateToken)
    .get('/', bookingController.getBooking)
    .post('/', validateBody(createBooking), bookingController.postBooking)
    .put('/', bookingController.putBooking);

export { bookingRouter };
