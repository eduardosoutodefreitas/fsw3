"use client";
import SideMenu from "@/app/_components/sideMenu";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/app/_components/ui/sheet";
import { Barbershop } from "@prisma/client";
import { ChevronLeftIcon, MenuIcon, MapPinIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BarbershopInfoProps {
  barbershop: Barbershop;
}

const BarbershopInfo = ({ barbershop }: BarbershopInfoProps) => {
  return (
    <div>
      <div className='h-[250px] w-full relative'>
        <Button
          size='icon'
          asChild
          variant='outline'
          className='z-50 absolute top-4 left-4'
        >
          <Link href={"/"}>
            <ChevronLeftIcon />
          </Link>
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              size='icon'
              variant='outline'
              className='z-50 absolute top-4 right-4'
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SheetContent className='p-0'>
            <SideMenu />
          </SheetContent>
        </Sheet>

        <Image
          fill
          sizes='100vw'
          className='object-cover oapcity-75'
          src={barbershop.imageUrl}
          alt={barbershop.name}
        />
      </div>

      <div className='px-5 pt-3 pb-6 border-b border-solid border-secondary'>
        <h1 className='font-bold text-xl'>{barbershop.name}</h1>
        <div className='flex items-center gap-1 mt-2'>
          <MapPinIcon className='text-primary' size={18} />
          <p>{barbershop.address}</p>
        </div>
        <div className='flex items-center gap-1 mt-2'>
          <StarIcon className='text-primary' size={18} />
          <p>5.0 (899 avaliações)</p>
        </div>
      </div>
    </div>
  );
};

export default BarbershopInfo;
