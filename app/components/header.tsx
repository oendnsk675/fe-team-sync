'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
  const [stateModal, setStateModal] = useState(false);

  return (
    <header className="md:flex justify-between py-5 items-center mb-10 relative z-40">
      {/* logo */}
      <Link href={'/'}>
        <div className="flex items-center">
          <Image
            src={'/logo.svg'}
            alt="logo team sync"
            width={35}
            height={35}
          />
          <h1 className="text-lg 2xl:text-2xl font-bold italic ml-2 text-emerald-950">
            Team Sync
          </h1>
        </div>
      </Link>
      <div className="flex items-center gap-8">
        <Link href="" className="hover:opacity-75">
          Product
        </Link>
        <Link href="" className="hover:opacity-75">
          Company
        </Link>
        <Link href="" className="hover:opacity-75">
          Pricing
        </Link>
        <Link href="" className="hover:opacity-75">
          Blog
        </Link>
        <Link href="" className="hover:opacity-75">
          Jobs
        </Link>
        <Link href="" className="hover:opacity-75">
          Contacts
        </Link>
      </div>
      {/* menu right */}
      <div className="flex items-center gap-4">
        <Link href="/sign-in">
          <button className="btn btn-sm btn-outline">Login</button>
        </Link>
        <Link href={'/sign-up'}>
          <button className="btn btn-sm btn-primary">Register</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
