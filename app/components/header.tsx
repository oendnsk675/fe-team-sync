'use client';

import Image from 'next/image';
import { useState } from 'react';

const Header = () => {
  const [stateModal, setStateModal] = useState(false);

  return (
    <header className="md:flex justify-between py-5 items-center mb-10">
      {/* logo */}
      <div>
        <Image
          src={'/logo-3.png'}
          alt="logo team sync"
          width={146}
          height={35}
        />
      </div>
      {/* menu right */}
      <div className="flex items-center gap-5">
        <button className="btn btn-outline">Login</button>
        <button className="btn">Register</button>
      </div>
    </header>
  );
};

export default Header;
