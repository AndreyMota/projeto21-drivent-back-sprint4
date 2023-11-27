import { Response } from 'express';
import { bookingService } from '@/services/booking-service';
import { AuthenticatedRequest } from '@/middlewares';

export const bookingController = {
    getBooking: async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.userId; 
        const booking = await bookingService.getBookingList(userId);

        return res.status(200).json({
            id: booking.id,
            Room: booking.Room,
        });
    },

    postBooking: async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.userId; 
        const { roomId } = req.body;

        const newBookingId = await bookingService.createNewBooking(userId, roomId);

        return res.status(200).json({
            bookingId: newBookingId,
        });
    },

    putBooking: async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.userId; 
        const { roomId } = req.body;
        const bookingId = Number(req.params.bookingId);

        const updatedBookingId = await bookingService.modifyBooking(userId, roomId, bookingId);

        return res.status(200).json({
            bookingId: updatedBookingId,
        });
    },
};
