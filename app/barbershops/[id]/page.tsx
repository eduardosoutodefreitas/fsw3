import prisma from "@/app/_lib/prisma";
import BarbershopInfo from "./_components/barbershop-info";
import ServiceItem from "./_components/service-item";
import { Service } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
interface BarbershopDetailsPageProps {
  params: {
    id?: string;
  };
}

const BarbershopDetailsPage = async ({
  params,
}: BarbershopDetailsPageProps) => {
  const session = await getServerSession(authOptions);
  if (!params.id) {
    return null;
  }
  const barbershop = await prisma.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  });

  if (!barbershop) {
    return null;
  }
  return (
    <div>
      <BarbershopInfo barbershop={barbershop} />
      <div className='flex flex-col px-5 gap-4 py-6'>
        {barbershop.services.map((service: Service) => (
          <ServiceItem
            isAuthenticated={!!session?.user}
            service={service}
            key={service.id}
          />
        ))}
      </div>
    </div>
  );
};

export default BarbershopDetailsPage;
