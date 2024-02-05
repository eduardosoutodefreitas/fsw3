"use client";
import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Barbershop, Booking, Service } from "@prisma/client";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Image from "next/image";
import { Button } from "./ui/button";
import { cancelBooking } from "../_actions/cancel-booking";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
interface BookingItemProps {
  booking: Booking;
  service: Service;
  barbershop: Barbershop;
}

const BookingItem = ({ service, booking, barbershop }: BookingItemProps) => {
  const isBookingConfirmed = isFuture(booking.date);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const handleCancelClick = async () => {
    try {
      setIsDeleteLoading(true);
      cancelBooking(booking.id);
      toast.success("Reserva cancelada com sucesso!");
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleteLoading(false);
    }
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
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
      </SheetTrigger>
      <SheetContent className='px-0'>
        <SheetHeader className=' px-5 text-left pb-6 border-b border-solid border-secondary'>
          <SheetTitle>Informações da reserva</SheetTitle>
        </SheetHeader>

        <div className='px-5'>
          <div className='relative h-[180px] w-full mt-6'>
            <Image src={"/barbershop-map.png"} fill alt={booking.name} />

            <div className='w-full absolute bottom-4 left-0 px-5'>
              <Card>
                <CardContent className='p-3 flex gap-2 items-center'>
                  <Avatar>
                    <AvatarImage src={barbershop.imageUrl} />
                  </Avatar>
                  <div>
                    <h2 className='font-bold'>{barbershop.name}</h2>
                    <h3 className='text-xs overflow-hidden text-nowrap text-ellipsis'>
                      {barbershop.address}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Badge
            variant={isBookingConfirmed ? "default" : "secondary"}
            className='w-fit mt-3 mb-6'
          >
            {isBookingConfirmed ? "confirmado" : "finalizado"}
          </Badge>
          <Card>
            <CardContent className='p-3 flex flex-col gap-3'>
              <div className='flex justify-between'>
                <h2 className='font-bold'>{service.name}</h2>
                <h3 className='font-bold text-sm'>
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(service.price))}
                </h3>
              </div>
              <div className='flex justify-between text-sm'>
                <h3 className='text-gray-400'>Data</h3>
                <h4>
                  {format(booking.date, "dd 'de' MMM", {
                    locale: ptBR,
                  })}
                </h4>
              </div>
              <div className='flex justify-between text-sm'>
                <h3 className='text-gray-400'>Hora</h3>
                <h4>{format(booking.date, "hh:mm")}</h4>
              </div>
              <div className='flex justify-between text-sm'>
                <h3 className='text-gray-400'>Barbearia</h3>
                <h4>{barbershop.name}</h4>
              </div>
            </CardContent>
          </Card>
          <SheetFooter className='gap-3 flex-row mt-6'>
            <SheetClose asChild>
              <Button className='w-full' variant={"secondary"}>
                Voltar
              </Button>
            </SheetClose>
            <Button
              onClick={handleCancelClick}
              disabled={!isBookingConfirmed || isDeleteLoading}
              className='w-full'
              variant={"destructive"}
            >
              {isDeleteLoading && (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              )}
              Cancelar reserva
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BookingItem;
