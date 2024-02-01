"use client";
import React, { useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  CalendarIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  UserIcon,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { AvatarImage, Avatar } from "./ui/avatar";
import Link from "next/link";

const Header = () => {
  const { data } = useSession();

  const handleLogoutClick = () => signOut();
  const handleLoginClick = () => signIn("google");
  return (
    <Card>
      <CardContent className='flex justify-between items-center p-5'>
        <Image src='/logo.png' alt='fsw barber logo' height={22} width={120} />

        <Sheet>
          <SheetTrigger asChild>
            <Button variant='outline' className='h-8 w-8' size='icon'>
              <MenuIcon size={18} />
            </Button>
          </SheetTrigger>
          <SheetContent className='p-0'>
            <SheetHeader className='text-left border-b border-solid p-5 border-secondary'>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            {data?.user ? (
              <div className='flex justify-between items-center px-5 py-6'>
                <div className='flex items-center gap-3'>
                  <Avatar>
                    <AvatarImage sizes='' src={data.user.image ?? ""} />
                  </Avatar>

                  <h2 className='font-bold'>{data.user.name}</h2>
                </div>
                <Button
                  onClick={handleLogoutClick}
                  variant={"secondary"}
                  size={"icon"}
                >
                  <LogOutIcon />
                </Button>
              </div>
            ) : (
              <div className=' px-5 py-6 flex flex-col gap-3'>
                <div className='flex items-center gap-2'>
                  <UserIcon size={32} />
                  <h2 className='font-bold'>Olá, faça seu login</h2>
                </div>
                <Button
                  className='w-full'
                  variant={"secondary"}
                  onClick={handleLoginClick}
                >
                  <Link href={"/"}>
                    <LogInIcon className='mr-2 justify-start' size={18} />
                    Fazer login
                  </Link>
                </Button>
              </div>
            )}

            <div className='flex flex-col items-center gap-3 px-5'>
              <Button asChild className='justify-start ' variant={"outline"}>
                <Link href={"/"}>
                  <HomeIcon size={18} className='mr-2' />
                  Início
                </Link>
              </Button>
            </div>

            {data?.user && (
              <Button asChild className='justify-start ' variant={"outline"}>
                <Link href={"/"}>
                  <CalendarIcon size={18} className='mr-2' />
                  Agendamento
                </Link>
              </Button>
            )}
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  );
};

export default Header;
