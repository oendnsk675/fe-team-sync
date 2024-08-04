import {
  faGear,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

type AType = {
  name: string;
  username: string;
  img: string;
  width: number;
  height: number;
};

const Avatar = ({ name, username, img, width, height }: AType) => {
  return (
    <div className="flex items-center gap-3">
      <div>
        <span className="text-sm">{name}</span>
        <span className="text-sm block text-end text-slate-600">
          @{username}
        </span>
      </div>
      <div className="avatar online dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="w-10 h-10 rounded-xl border-2"
        >
          <Image src={img} width={width} height={height} alt="avatar" />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[999] w-52 p-2 shadow"
        >
          <li>
            <Link
              href={"settings"}
              className="flex items-center gap-3 text-slate-600"
            >
              <FontAwesomeIcon icon={faGear} />
              <span>Account Settings</span>
            </Link>
          </li>
          <li>
            <Link
              href={"signout"}
              className="flex items-center gap-3 text-slate-600"
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
              <span>Sign Out</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Avatar;
