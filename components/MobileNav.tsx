"use client"
import React from 'react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from 'next/image';
import Link from 'next/link';
import { sidebarLinks } from '@/constants';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';


const MobileNav = () => {
    const pathname = usePathname();
  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src="/sheet.svg"
            width={24}
            height={24}
            alt="menu"
            className="cursor-pointer ml-3 sm:hidden"
          />
        </SheetTrigger>
        <SheetContent side="left" className="bg-slate-900 border-none">
          <Link href="/" className="flex items-center gap-1">
            <Image
              src="/logo.png"
              alt="logo"
              width={30}
              height={30}
              className="max-sm:size-12 max-sm:w-16 ml-2 rounded-2xl pt-2 pl-1"
            />
            <p className="text-[26px] font-extrabold text-white mt-4 ml-4">YOHO</p>
            <SheetTitle>
            </SheetTitle>
          </Link>
          <div className="flex h-[calc(100vh -72px)] flex-col justify-between overflow-y-auto ">
            <SheetClose asChild>
              <section className="flex h-full flex-col gap-6 pt-16 text-white">
                {sidebarLinks.map((link) => {
                  const isActive = pathname === link.route;

                  return (
                    <SheetClose asChild key={link.route}>
                      <Link
                        href={link.route}
                        key={link.label}
                        className={cn(
                          "flex gap-4 items-center p-4 rounded-lg w-full max-w-60",
                          {
                            "bg-blue-600": isActive,
                          }
                        )}
                      >
                        <Image
                          src={link.imgUrl}
                          alt={link.label}
                          width={24}
                          height={24}
                        />
                        <p className="font-semibold">{link.label}</p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
}

export default MobileNav
