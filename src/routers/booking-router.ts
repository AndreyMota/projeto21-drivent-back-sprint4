import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { postBooking } from '@/controllers/booking-controller';

const bookingRouter = Router();

bookingRouter
    .all('/*', authenticateToken)
    .get('/', (req, res) => res.send('booking on!'))
    .post('/'/* , validateBody(createOrUpdateEnrollmentSchema) */, postBooking);

export { bookingRouter };
