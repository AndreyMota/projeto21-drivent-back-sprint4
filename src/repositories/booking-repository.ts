import { prisma } from '@/config';

async function findBookingByIdentifier(userIdentifier: number) {
    return prisma.booking.findFirst({
        where: {
            userId: userIdentifier,
        },
        include: {
            Room: true,
        }
    });
}

async function retrieveRooms(roomIdentifier: number) {
    return prisma.room.findUnique({
        where: {
            id: roomIdentifier,
        },
        include: {
            Booking: true
        }
    });
}

async function retrieveBookingsByRoomId(roomIdentifier: number) {
    return prisma.booking.findMany({
        where: {
            roomId: roomIdentifier,
        },
        include: {
            Room: true,
        },
    });
}

async function checkActiveBooking(userIdentifier: number) {
    return prisma.booking.findFirst({
        where: {
            userId: userIdentifier,
        },
    });
}

async function initiateBooking(userIdentifier: number, roomIdentifier: number) {
    return prisma.booking.create({
        data: {
            roomId: roomIdentifier,
            userId: userIdentifier,
        }
    });
}

async function amendBooking(userIdentifier: number, roomIdentifier: number, bookingIdentifier: number) {
    return prisma.booking.update({
        where: {
            id: bookingIdentifier,
        },
        data: {
            roomId: roomIdentifier,
            userId: userIdentifier,
            updatedAt: new Date(),
        },
    });
}

async function getUserInformation(userIdentifier: number) {
    return await prisma.user.findUnique({
        where: {
            id: userIdentifier
        },
        select: {
            Booking: {
                select: {
                    id: true,
                    Room: true
                }
            },
            Enrollment: {
                select: {
                    Ticket: {
                        select: {
                            status: true,
                            TicketType: {
                                select: {
                                    includesHotel: true,
                                    isRemote: true
                                }
                            }
                        }
                    }
                }
            }
        }
    });
}

export const bookingRepository = {
    findBookingByIdentifier,
    initiateBooking,
    retrieveRooms,
    amendBooking,
    checkActiveBooking,
    retrieveBookingsByRoomId,
    getUserInformation
};
