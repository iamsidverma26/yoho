import Link from 'next/link'
import MobileNav from './MobileNav'
import Image from 'next/image'
import { SignedIn, UserButton } from '@clerk/nextjs';

const Navbar = () => {
  return (
    <nav className="flex-between fixed z-50 bg-slate-900 w-full px-6 py-4 lf:px-10">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src={"/logo.png"}
          alt="logo"
          width={80}
          height={60}
          className="max-sm:size-14 max-sm:w-28 max-md:w-20 rounded-2xl"
        />
        <p className="text-[26px] pl-8 font-extrabold text-white max-sm:hidden">
          Yoho
        </p>
      </Link>

      <div className="flex-between">
        <SignedIn>
          <UserButton />
        </SignedIn>

        <MobileNav />
      </div>
    </nav>
  );
}

export default Navbar
