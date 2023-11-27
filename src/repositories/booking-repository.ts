import { prisma } from "@/config";

async function bookingForRoom(roomId: number) {
    return prisma.booking.findMany({
        where: {
            roomId
        }
    })
}

async function findRoom(roomId: number) {
    return await prisma.room.findFirst({
        where: {
            id: roomId,
        },
    });
}

async function createBooking(userId: number, roomId: number) {
    return prisma.booking.create({
        data: {
            userId,
            roomId,
        },
    })
}

export const bookingRepository = {
    bookingForRoom,
    findRoom,
    createBooking,
}