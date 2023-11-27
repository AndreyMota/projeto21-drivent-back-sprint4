import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import { bookingService } from "@/services/booking-service";

export async function postBooking(req: AuthenticatedRequest, res: Response) {
    const { roomId } = req.body;
    const bookingId = await bookingService.postBooking(roomId, req.userId);
    res.status(200).json({ bookingId });
}
