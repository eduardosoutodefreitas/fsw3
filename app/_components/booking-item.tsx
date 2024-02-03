"use client";
import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Barbershop, Booking, Service } from "@prisma/client";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
interface BookingItemProps {
  booking: Booking;
  service: Service;
  barbershop: Barbershop;
}

const BookingItem = ({ service, booking, barbershop }: BookingItemProps) => {
  const isBookingConfirmed = isFuture(booking.date);
  return (
    <Card className='min-w-[90%]'>
      <CardContent className='flex py-0 px-0'>
        <div className='flex flex-col gap-2 py-5 pl-5 flex-[4]'>
          <Badge
            variant={isBookingConfirmed ? "default" : "secondary"}
            className=' w-fit '
          >
            {isBookingConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>
          <h2 className='font-bold'>{service.name}</h2>
          <div className='flex items-center gap-2'>
            <Avatar className='h-6 w-6'>
              <AvatarImage src={barbershop.imageUrl} />

              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <h3 className='text-sm'>{barbershop.name}</h3>
          </div>
        </div>

        <div className='flex flex-col flex-1 items-center justify-center border-l border-solid border-secondary px-3'>
          <p className='text-sm capitalize'>
            {format(booking.date, "MMM", {
              locale: ptBR,
            })}
          </p>
          <p className='text-2xl'>{format(booking.date, "dd")}</p>
          <p className='text-sm'>{format(booking.date, "hh:mm")}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingItem;
