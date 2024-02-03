import React from "react";
import Header from "../_components/header";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import prisma from "../_lib/prisma";
import { redirect } from "next/navigation";
import ServiceItem from "../barbershops/[id]/_components/service-item";
import BookingItem from "../_components/booking-item";
import { Booking } from "@prisma/client/edge";
import { isFuture, isPast } from "date-fns";

const BookingsPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/");
  }
  const bookings = await prisma.booking.findMany({
    where: {
      userId: (session.user as any).id,
    },
    include: {
      service: true,
      barbershop: true,
    },
  });

  const confirmedBookings = bookings.filter((booking: Booking) =>
    isFuture(booking.date)
  );
  const finishedBookings = bookings.filter((booking: Booking) =>
    isPast(booking.date)
  );
  return (
    <>
      <Header />
      <div className='px-5 py-6'>
        <h1 className='text-xl font-bold'>Agendamentos</h1>

        <h2 className='text-sm text-gray-400 font-bold uppercase mt-6 mb-3'>
          Confirmados
        </h2>
        <div className='flex flex-col gap-3'>
          {confirmedBookings.map((booking: Booking) => (
            <BookingItem
              barbershop={booking.barbershop}
              booking={booking}
              service={booking.service}
              key={booking.id}
            />
          ))}
        </div>
        <h2 className='text-sm text-gray-400 font-bold uppercase mt-6 mb-3'>
          Finalizados
        </h2>
        <div className='flex flex-col gap-3'>
          {finishedBookings.map((booking: Booking) => (
            <BookingItem
              barbershop={booking.barbershop}
              booking={booking}
              service={booking.service}
              key={booking.id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default BookingsPage;
