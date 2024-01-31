"use client";
import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";

const BookingItem = () => {
  return (
    <Card>
      <CardContent className='flex px-5 justify-between'>
        <div className='flex flex-col gap-2 py-5'>
          <Badge className='bg-[#221c3d] text-primary hover:bg-[#221c3d]'>
            Confirmado
          </Badge>
          <h2 className='font-bold'>Corte de Cabelo</h2>
          <div className='flex items-center gap-2'>
            <Avatar className='h-6 w-6'>
              <AvatarImage>
                <Image
                  src={
                    "https://utfs.io/f/0ddfbd26-a424-43a0-aaf3-c3f1dc6be6d1-1kgxo7.png"
                  }
                  alt={"Barbershop image"}
                />
                <AvatarFallback></AvatarFallback>
              </AvatarImage>
            </Avatar>
            <h3 className='text-sm'>Vintage Barber</h3>
          </div>
        </div>

        <div className='flex flex-col items-center justify-center border-l border-solid border-secondary px-3'>
          <p className='text-sm'>Fevereiro</p>
          <p className='text-2xl'>06</p>
          <p className='text-sm'>09:45</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingItem;
