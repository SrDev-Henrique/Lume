"use client";

import Link from "next/link";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Footer from "./Footer";

const Sidebar = ({ user }: SiderbarProps) => {
  const pathname = usePathname();

  return (
    <section className="sidebar">
      <nav>
        <Link
          href="/"
          className="mb-12 border-2 h-10 border-gray-400 rounded-full p-5 cursor-pointer flex items-center gap-2"
        >
          <h1 className="sidebar-logo">Lume</h1>
        </Link>
      </nav>
      <div className="flex h-10 mt-0.5 items-center">
        {sidebarLinks.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`);

          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn("sidebar-link", { "!bg-bank-black": isActive })}
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
