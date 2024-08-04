"use client";

import React from "react";
import Breadcrumbs from "@/app/components/breadcrumbs";
import Avatar from "@/app/components/avatar";
import { formatAvatarImage, loadAvatarImage } from "@/app/utils/common/image";
import { useUser } from "@/app/stores/userStore";

function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const user = useUser();

  return (
    <div className=" px-8">
      {/* header layout */}
      <div className="flex justify-between items-center mb-10">
        {/* Breadcrumbs */}
        <Breadcrumbs />

        {/* Avatar */}
        <Avatar
          name={user.fullname}
          username={user.username}
          img={
            user.avatar == ""
              ? loadAvatarImage(user, 45)
              : formatAvatarImage(user.avatar)
          }
          width={45}
          height={45}
        />
      </div>

      {children}
    </div>
  );
}

export default MainLayout;
