import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { postBooking } from '@/controllers/booking-controller';
import { createBooking } from '@/schemas/booking-schema';

const bookingRouter = Router();

bookingRouter
    .all('/*', authenticateToken)
    .get('/', (req, res) => res.send('booking on!'))
    .post('/', validateBody(createBooking), postBooking);

export { bookingRouter };
