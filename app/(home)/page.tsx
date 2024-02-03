import { format } from "date-fns";
import Header from "../_components/header";
import { ptBR } from "date-fns/locale";
import Search from "./_components/search";
import BookingItem from "../_components/booking-item";
import BarbershopItem from "./_components/barbershop-item";
import prisma from "@/app/_lib/prisma";
import { Barbershop, Booking } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const [barbershops, confirmedBookings] = await Promise.all([
    prisma.barbershop.findMany({}),
    session?.user
      ? await prisma.booking.findMany({
          where: {
            userId: (session?.user as any).id,
            date: {
              gte: new Date(),
            },
          },
          include: {
            service: true,
            barbershop: true,
          },
        })
      : Promise.resolve([]),
  ]);
  return (
    <div>
      <Header />
      <div className='px-5 pt-5 space'>
        <h2 className='font-bold text-xl'>Olá, Miguel!</h2>
        <p className='capitalize text-sm'>
          {format(new Date(), "EEEE',' dd 'de' MMMM", {
            locale: ptBR,
          })}
        </p>
      </div>
      <div className='px-5 mt-6'>
        <Search />
      </div>

      <div className='mt-6'>
        <h2 className='pl-5 uppercase text-xs text-gray-400 font-bold mb-3'>
          Agendamentos
        </h2>
        <div className=' px-5 flex overflow-x-auto [&::-webkit-scrollbar]:hidden gap-3'>
          {confirmedBookings.map((booking: Booking) => (
            <BookingItem
              key={booking.id}
              barbershop={booking.barbershop}
              booking={booking}
              service={booking.service}
            />
          ))}
        </div>
      </div>

      <div className='mt-6'>
        <h2 className='px-5 uppercase text-xs text-gray-400 font-bold mb-3'>
          Recomendados
        </h2>
        <div>
          <div className='flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden px-5'>
            {barbershops.map((barbershop: Barbershop) => (
              <BarbershopItem barbershop={barbershop} key={barbershop.id} />
            ))}
          </div>
        </div>
      </div>
      <div className='mt-6'>
        <h2 className='px-5 uppercase text-xs text-gray-400 font-bold mb-3'>
          Populares
        </h2>
        <div>
          <div className='flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden px-5 mb-[4.5rem]'>
            {barbershops.map((barbershop: Barbershop) => (
              <BarbershopItem barbershop={barbershop} key={barbershop.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
