import React from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

const Header = () => {
  return (
    <Card>
      <CardContent className='flex justify-between items-center p-5'>
        <Image src='/logo.png' alt='fsw barber logo' height={22} width={120} />
        <Button variant='outline' className='h-8 w-8' size='icon'>
          <MenuIcon size={18} />
        </Button>
      </CardContent>
    </Card>
  );
};

export default Header;
