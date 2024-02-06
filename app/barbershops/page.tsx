import { Barbershop } from "@prisma/client";
import BarbershopItem from "../(home)/_components/barbershop-item";
import Header from "../_components/header";
import prisma from "../_lib/prisma";
interface BarbershopPageProps {
  searchParams: {
    search?: string;
  };
}

const BarbershopPage = async ({ searchParams }: BarbershopPageProps) => {
  const barbershops = prisma.barbershop.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: "insensitive",
      },
    },
  });
  return (
    <>
      <Header />

      <div className='px-5 py-6'>
        <h1 className='text-gray-400 font-bold text-xs uppercase'>
          Resultado para &ldquo;{searchParams.search}&ldquo;
        </h1>
        <div className='grid grid-cols-2 gap-3 mt-3'>
          {barbershops.map((barbershop: Barbershop) => (
            <div key={barbershop.id} className='w-full'>
              <BarbershopItem barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BarbershopPage;
