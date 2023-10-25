import { AdminHeader } from "../components/header";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

// TODO: Create the loading file for skeleton loaders while fetching

export default async function AdminHome() {
  return (
    <div className="w-full">
      <AdminHeader heading="Halls" text="Create and manage halls">
        <Link
          href="/admin/new"
          className={buttonVariants({ variant: "outline" })}
        >
          New hall
        </Link>
      </AdminHeader>
    </div>
  );
}
