import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function DropdownSearch({
  ButtonDropdown,
  title,
  subTitle,
  emptyTitle,
  FooterDropdown,
  textFooter,
}: {
  ButtonDropdown: any;
  title: string;
  subTitle?: string;
  emptyTitle?: string;
  FooterDropdown?: any;
  textFooter?: string;
}) {
  return (
    <div className="border-b-2 pb-2 p-2 pr-4 text-sm dropdown w-full">
      <ButtonDropdown title={title} />
      <div
        tabIndex={0}
        className="menu dropdown-content bg-base-100 rounded-box z-[1] w-[80%] p-0 shadow right-4"
      >
        <div className="border-b p-2 px-4 ">
          <span className="block font-semibold mb-2">{subTitle}</span>
          <input type="text" className="input input-xs input-bordered w-full" />
        </div>
        <ul className="p-2">
          <li>
            <a className="px-2">Item 1</a>
          </li>
          <li>
            <a className="px-2">Item 2</a>
          </li>
        </ul>
        {FooterDropdown ? <FooterDropdown text={textFooter} /> : null}
      </div>
      <div className="max-h-24 overflow-y-auto mb-3 p-2">
        <span className="opacity-30">{emptyTitle}</span>
      </div>
      {/* <FooterDropdown text={textFooter} /> */}
    </div>
  );
}
