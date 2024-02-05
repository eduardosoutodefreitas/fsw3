"use server";
import prisma from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

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
      barbershopId,
      date: date,
      serviceId: serviceId,
      userId: userId,
    },
  });
  revalidatePath("/");
  revalidatePath("/bookings");
};
