"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const paths = {
  dashboard: "/dashboard",
  reservations: "/dashboard/manage-reservations",
};

export default function AdminNav() {
  const path = usePathname();

  return (
    <nav className="grid gap-2">
      <Link
        href={paths.dashboard}
        className={cn(
          "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
          path === paths.dashboard && "bg-accent",
        )}
      >
        Dashboard
      </Link>

      <Link
        href={paths.reservations}
        className={cn(
          "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
          path === paths.reservations && "bg-accent",
        )}
      >
        Manage
      </Link>
    </nav>
  );
}
