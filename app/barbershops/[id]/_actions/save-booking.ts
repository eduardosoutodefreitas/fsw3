"use server";
import prisma from "@/app/_lib/prisma";

interface SaveBookingParams {
  barbershopId: string;
  serviceId: string;
  userId: string;
  date: Date;
}

export const SaveBooking = async ({
  barbershopId,
  date,
  serviceId,
  userId,
}: SaveBookingParams) => {
  await prisma.booking.create({
    data: {
      babershopId: barbershopId,
      date: date,
      serviceId: serviceId,
      userId: userId,
    },
  });
};
