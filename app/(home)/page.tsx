import { format } from "date-fns";
import Header from "../_components/header";
import { ptBR } from "date-fns/locale";
import Search from "./_components/search";
import BookingItem from "../_components/booking-item";
import BarbershopItem from "./_components/barbershop-item";
import prisma from "@/app/_lib/prisma";
import { Barbershop } from "@prisma/client";

export default async function Home() {
  const barbershops = await prisma.barbershop.findMany({});
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

      <div className='px-5 mt-6'>
        <h2 className='uppercase text-xs text-gray-400 font-bold mb-3'>
          Agendamentos
        </h2>
        <BookingItem />
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
