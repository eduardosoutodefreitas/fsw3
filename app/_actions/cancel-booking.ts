"use server";
import { revalidatePath } from "next/cache";
import prisma from "../_lib/prisma";

export const cancelBooking = async (bookingID: string) => {
  await prisma.booking.delete({
    where: {
      id: bookingID,
    },
  });
  revalidatePath("/");
  revalidatePath("/bookings");
};
