import { AdminHeader } from "../../components/header";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import CreateReservation from "../../components/create-reservation";
import { format } from "date-fns";
import { prisma } from "@/lib/prisma";

export default async function AdminReservations() {
  const reservations = await prisma.reservation.findMany({
    include: {
      user: {
        select: {
          email: true,
        },
      },
      lectureHall: {
        select: {
          name: true,
        },
      },
    },
  });
  return (
    <div className="w-full">
      <AdminHeader heading="Reservations" text="Create and manage reservations">
        <CreateReservation>
          <Button>Create a new Entry</Button>
        </CreateReservation>
      </AdminHeader>

      <Table>
        <TableCaption>List of all reservations.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">User</TableHead>
            <TableHead>Hall</TableHead>
            <TableHead>Time</TableHead>
            <TableHead className="text-right">Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservations.map((reservation, idx) => (
            <TableRow key={idx}>
              <TableCell className="font-medium">
                {reservation.user.email}
              </TableCell>
              <TableCell>{reservation.lectureHall.name}</TableCell>
              <TableCell>{`${format(reservation.startTime, "p")} - ${format(
                reservation.endTime,
                "p",
              )}`}</TableCell>
              <TableCell className="text-right">{reservation.status}</TableCell>
              <TableCell className="text-right">
                <div className="space-x-4">
                  <Button variant="destructive">Delete</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
