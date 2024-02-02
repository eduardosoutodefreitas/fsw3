"use client";
import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import { Card, CardContent } from "@/app/_components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { Barbershop, Service } from "@prisma/client";
import { ptBR } from "date-fns/locale";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { generateDayTimeList } from "../_helpers/hours";
import { format } from "date-fns";

interface ServiceItemProps {
  service: Service;
  isAuthenticated?: boolean;
  barbershop: Barbershop;
}
const ServiceItem = ({
  service,
  isAuthenticated,
  barbershop,
}: ServiceItemProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [hour, setHour] = useState<string | undefined>(undefined);
  const handleHourClick = (time: string) => {
    setHour(time);
  };

  const handleDateClick = (date: Date | undefined) => {
    setDate(date);
    setHour(undefined);
  };

  const handleBookingClick = () => {
    if (!isAuthenticated) {
      signIn("google");
    }
  };

  const timeList = useMemo(() => {
    return date ? generateDayTimeList(date) : [];
  }, [date]);

  return (
    <Card>
      <CardContent className='p-3'>
        <div className='flex gap-4 items-center'>
          <div className='relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]'>
            <Image
              fill
              src={service.imageUrl}
              alt={service.name}
              className='object-contain rounded-lg'
            />
          </div>
          <div className='flex flex-col w-full'>
            <h2 className='font-bold'>{service.name}</h2>
            <p className='text-gray-400 text-sm'>{service.description}</p>
            <div className='flex items-center justify-between mt-3'>
              <p className='text-sm text-primary font-bold'>
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(service.price))}
              </p>

              <Sheet>
                <SheetTrigger asChild>
                  <Button onClick={handleBookingClick} variant={"secondary"}>
                    Reservar
                  </Button>
                </SheetTrigger>
                <SheetContent className='p-0'>
                  <SheetHeader className='px-5 py-6 border-b border-solid border-secondary'>
                    <SheetTitle>Fazer Reserva</SheetTitle>
                  </SheetHeader>
                  <div className='py-6'>
                    <Calendar
                      styles={{
                        head_cell: {
                          width: "100%",
                          textTransform: "capitalize",
                        },
                        cell: {
                          width: "100%",
                        },
                        button: {
                          width: "100%",
                        },
                        caption: {
                          textTransform: "capitalize",
                        },
                        nav_button_previous: {
                          width: "32px",
                          height: "32px",
                        },
                        nav_button_next: {
                          height: "32px",
                          width: "32px",
                        },
                      }}
                      fromDate={new Date()}
                      locale={ptBR}
                      mode='single'
                      selected={date}
                      onSelect={handleDateClick}
                    />
                  </div>

                  {date && (
                    <div className='flex overflow-x-auto [&::-webkit-scrollbar]:hidden gap-3 px-5 py-6 border-t border-solid border-secondary'>
                      {timeList.map((time) => (
                        <Button
                          onClick={() => handleHourClick(time)}
                          variant={hour === time ? "default" : "outline"}
                          className='rounded-full'
                          key={time}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  )}

                  <div className='py-6 px-5 border-t border-solid border-secondary'>
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
                        {date && (
                          <div className='flex justify-between text-sm'>
                            <h3 className='text-gray-400'>Data</h3>
                            <h4>
                              {format(date, "dd 'de' MMM", {
                                locale: ptBR,
                              })}
                            </h4>
                          </div>
                        )}
                        {hour && (
                          <div className='flex justify-between text-sm'>
                            <h3 className='text-gray-400'>Hora</h3>
                            <h4>{hour}</h4>
                          </div>
                        )}
                        <div className='flex justify-between text-sm'>
                          <h3 className='text-gray-400'>Barbearia</h3>
                          <h4>{barbershop.name}</h4>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <SheetFooter className='px-5'>
                    <Button disabled={!hour || !date}>Confirmar reserva</Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceItem;
