"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";

const paths = {
  halls: "/admin",
  reservations: "/admin/reservations",
};

export default function AdminNav() {
  const path = usePathname();

  return (
    <nav className="grid gap-2">
      <Link
        href={paths.halls}
        className={cn(
          "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
          path === paths.halls && "bg-accent",
        )}
      >
        Halls
      </Link>

      <Link
        href={paths.reservations}
        className={cn(
          "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
          path === paths.reservations && "bg-accent",
        )}
      >
        Reservations
      </Link>

      <Link
        href="/dashboard"
        className={cn(buttonVariants({ variant: "link" }), "text-left")}
      >
        User Dashboard
      </Link>

      <Button variant="secondary" onClick={() => signOut()} className="mt-40">
        Logout
      </Button>
    </nav>
  );
}
