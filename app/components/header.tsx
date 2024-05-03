"use client";

import { faCartFlatbed, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";

const Header = () => {
  const [stateModal, setStateModal] = useState(false);

  return (
    <header className="md:flex justify-between py-5 items-center mb-10">
      {/* logo */}
      <div>
        <Image
          src={"/logo-3.png"}
          alt="logo team sync"
          width={146}
          height={35}
        />
      </div>
      {/* menu right */}
      <div className="flex items-center gap-5">
        <div className="p-1.5 px-5 text-primary rounded-md border-primary bg-white/5 text-sm flex gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            className="fill-primary"
            viewBox="0 0 24 24"
          >
            <path d="M12 4c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8zm0-2c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zm0 6c2.206 0 4 1.794 4 4s-1.794 4-4 4-4-1.794-4-4 1.794-4 4-4zm0-2c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 4c-1.105 0-2 .896-2 2s.895 2 2 2 2-.896 2-2-.895-2-2-2z" />
          </svg>
          <span>100 Pts</span>
        </div>

        <FontAwesomeIcon icon={faCartFlatbed} className="w-5" />
        <div className="h-4 w-0.5 bg-slate-400 rounded"></div>
        <FontAwesomeIcon icon={faUser} className="w-4" />
      </div>
    </header>
  );
};

export default Header;
