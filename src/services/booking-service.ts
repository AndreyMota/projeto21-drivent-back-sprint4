import { enrollmentRepository, ticketsRepository } from "@/repositories";
import { forbiddenError, notFoundError } from "@/errors";
import { bookingRepository } from "@/repositories/booking-repository"; 

async function createNewBooking(customerId: number, roomNumber: number) {
    const userEnrollment = await enrollmentRepository.findWithAddressByUserId(customerId);
    if (!userEnrollment) throw forbiddenError();

    const userTicket = await ticketsRepository.findTicketByEnrollmentId(userEnrollment.id);
    if (
        !userTicket ||
        userTicket.status === 'RESERVED' ||
        userTicket.TicketType.isRemote ||
        !userTicket.TicketType.includesHotel 
      ) {
        throw forbiddenError();
      }

    const activeBooking = await bookingRepository.checkActiveBooking(customerId); 
    if (activeBooking) {
        throw forbiddenError();
    }

    const selectedRoom = await bookingRepository.retrieveRooms(roomNumber); 
    if (!selectedRoom) throw notFoundError();

    if (selectedRoom.Booking.length >= selectedRoom.capacity) {
        throw forbiddenError();
    }

    const newBooking = await bookingRepository.initiateBooking(customerId, roomNumber); 
    return newBooking;
}

async function getBookingList(userId: number) {
    const userBooking = await bookingRepository.findBookingByIdentifier(userId); 
    if (!userBooking) throw notFoundError();
    return userBooking;
}

async function modifyBooking(customerId: number, roomNumber: number, bookingId: number) {
    const userEnrollmentInfo = await enrollmentRepository.findWithAddressByUserId(customerId);
    if (!userEnrollmentInfo) throw forbiddenError();

    const userTicketInfo = await ticketsRepository.findTicketByEnrollmentId(userEnrollmentInfo.id);
    if (userTicketInfo.status === 'RESERVED' || !userTicketInfo || !userTicketInfo.TicketType.includesHotel || userTicketInfo.TicketType.isRemote ) throw forbiddenError();

    const selectedRoomInfo = await bookingRepository.retrieveRooms(roomNumber); 
    if (!selectedRoomInfo) throw notFoundError();

    if (selectedRoomInfo.Booking.length >= selectedRoomInfo.capacity) {
        throw forbiddenError();
    }

    const updatedBooking = await bookingRepository.amendBooking(customerId, roomNumber, bookingId); 
    return updatedBooking;
}

export const bookingService = {
    getBookingList,
    createNewBooking, 
    modifyBooking
};
