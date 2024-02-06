import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Barbershop } from "@prisma/client";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
interface BarbershopItemProps {
  barbershop: Barbershop;
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  return (
    <Card className='rounded-2xl'>
      <CardContent className='p-0'>
        <div className='relative h-[159px] w-full'>
          <div className='absolute top-3 left-3 z-50 '>
            <Badge
              variant={"secondary"}
              className='opacity-90 flex items-center gap-2'
            >
              <StarIcon
                size={12}
                className='text-primary fill-primary mb-[3px]'
              />
              <span className='text-xs'>5,0</span>
            </Badge>
          </div>
          <Image
            fill
            sizes='100vw'
            src={barbershop.imageUrl}
            alt={barbershop.name}
            className='rounded-2xl object-cover p-1'
          />
        </div>

        <div className='px-3 pb-3'>
          <h2 className='font-bold mt-2 overflow-hidden text-ellipsis text-nowrap'>
            {barbershop.name}
          </h2>
          <p className='text-sm text-gray-400 overflow-hidden text-ellipsis text-nowrap'>
            {barbershop.address}
          </p>
          <Button variant='secondary' asChild className='w-full mt-3'>
            <Link href={`/barbershops/${barbershop.id}`}>Reservar</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarbershopItem;
