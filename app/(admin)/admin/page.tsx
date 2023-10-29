import { AdminHeader } from "../components/header";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { Hall } from "../components/hall";
import { format } from "date-fns";

export default async function AdminHome() {
  const halls = await prisma.lectureHall.findMany();

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

      <div className="flex gap-2 flex-wrap">
        {halls.map((hall) => {
          return (
            <Hall
              id={hall.id}
              name={hall.name ? hall.name : ""}
              location={hall.location ? hall.location : ""}
              capacity={hall.capacity}
              amenities={hall.amenities ? hall.amenities : ""}
              from={format(hall.startTime, "p")}
              to={format(hall.endTime, "p")}
              key={hall.id}
            />
          );
        })}
      </div>
    </div>
  );
}
