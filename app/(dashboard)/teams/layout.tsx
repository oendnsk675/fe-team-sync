import React from "react";
import Breadcrumbs from "@/app/components/breadcrumbs";
import Avatar from "@/app/components/avatar";

function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className=" px-8">
      {/* header layout */}
      <div className="flex justify-between items-center mb-10">
        {/* Breadcrumbs */}
        <Breadcrumbs />

        {/* Avatar */}
        <Avatar
          name="sayidina ahmadal qososyi"
          username="oslab"
          img="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
        />
      </div>

      {children}
    </div>
  );
}

export default MainLayout;
