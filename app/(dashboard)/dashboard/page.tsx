import { AdminHeader } from "../components/header";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import LogoutButton from "../components/logout-button";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import DeleteReserve from "../components/delete-reserve";

export default async function Dashboard() {
  const session = await getServerSession(options);
  const id = session?.user?.id;
  const reservations = await prisma.reservation.findMany({
    where: {
      userId: id,
    },
    include: {
      lectureHall: true,
    },
  });

  return (
    <div className="w-full">
      <AdminHeader
        heading="Dashboard"
        text={`Welcome to your Dashboard, ${session?.user.email}`}
      >
        <div className="space-x-6">
          {session?.user.role === "admin" && (
            <Link
              href="/admin"
              className={cn(buttonVariants({ variant: "link" }), "capitalize")}
            >
              admin panel
            </Link>
          )}
          <LogoutButton />
        </div>
      </AdminHeader>
      <Table className="mt-8">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Res. Num</TableHead>
            <TableHead>Hall</TableHead>
            <TableHead>Time</TableHead>
            <TableHead className="text-right">Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservations?.map((reservation, index) => (
            <TableRow key={reservation.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{reservation.lectureHall.name}</TableCell>
              <TableCell>{`${format(reservation.startTime, "p")} - ${format(
                reservation.endTime,
                "p",
              )}`}</TableCell>
              <TableCell className="text-right">{reservation.status}</TableCell>
              <TableCell className="text-right">
                <DeleteReserve id={reservation.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
