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
import Link from "next/link";

const Header = () => {
  return (
    <header>
      <Card>
        <CardContent className='flex justify-between items-center p-5'>
          <Link href={"/"}>
            <Image
              src='/logo.png'
              alt='fsw barber logo'
              height={22}
              width={120}
            />
          </Link>

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
    </header>
  );
};

export default Header;
