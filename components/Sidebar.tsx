"use client";

import Link from "next/link";
import Image from "next/image";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Footer from "./Footer";

const Sidebar = ({ user }: SiderbarProps) => {
  const pathname = usePathname();

  return (
    <section className="sidebar">
      <nav className="flex gap-4">
        <Link
          href="/"
          className="mb-12 border border-gray-400 rounded-full p-5 cursor-pointer flex items-center gap-2"
        >
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt={"Lume logo"}
            className="size-[24px] max-xl:size-14"
          />
          <h1 className="sidebar-logo">Lume</h1>
        </Link>
      </nav>
      <div className="flex h-10 items-center">
        {sidebarLinks.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`);

          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn("sidebar-link", { "bg-bank-black": isActive })}
            >
              <p className={cn("sidebar-label", { "!text-white": isActive })}>
                {item.label}
              </p>
            </Link>
          );
        })}

        <Footer user={user} />
      </div>
    </section>
  );
};

export default Sidebar;
