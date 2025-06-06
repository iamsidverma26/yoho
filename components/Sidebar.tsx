"use client"
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
    const pathname = usePathname();
  return (
    <section className='sticky left-0 flex h-screen w-fit flex-col justify-between bg-slate-900 text-white p-6 pt-20 max-sm:hidden lg:w-[264px] '>

    <div className="flex flex-col gap-2">
        {sidebarLinks.map((link) => {
            const isActive = pathname === link.route || pathname.startsWith(link.route+"/");

            return (
                <Link
                href={link.route}
                key={link.label}
                className={cn('flex gap-4 items-center p-4 rounded-lg justify-start' , {
                    'bg-blue-600':isActive,
                })}>
                    <Image
                    src={link.imgUrl}
                    alt={link.label}
                    width={24}
                    height={24}
                    />
                    <p className='text-lg font-semibold max-lg:hidden'>{link.label}</p>
                </Link>
            )
})}
    </div>
    </section>
  )
}

export default Sidebar
