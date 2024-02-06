"use server";
import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma";

export const cancelBooking = async (bookingID: string) => {
  await db.booking.delete({
    where: {
      id: bookingID,
    },
  });
  revalidatePath("/");
  revalidatePath("/bookings");
};
