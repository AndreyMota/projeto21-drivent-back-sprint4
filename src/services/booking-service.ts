import { forbiddenError } from "@/errors/forbidden-error";
import { validateUserBooking } from "./hotels-service";
import { bookingRepository } from "@/repositories/booking-repository";
import { notFoundError } from "@/errors";

async function validateMinCapacity(roomId: number) {
    const capacity = await bookingRepository.findRoom(roomId);
    const countBookingForRoom = await bookingRepository.bookingForRoom(roomId);

    if (countBookingForRoom.length >= capacity.capacity) {
        throw forbiddenError();
    }
}

async function postBooking(roomId: number, userId: number): Promise<number> {
    validateUserBooking(userId);
    validateMinCapacity(roomId);

    const booking = await bookingRepository.createBooking(userId, roomId);

    if (!booking) {
        throw notFoundError();
    }

    return booking.id;
}

export const bookingService = {
    postBooking,
};
