"use client";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import SideMenu from "./sideMenu";

const Header = () => {
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
            <SideMenu />
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  );
};

export default Header;
