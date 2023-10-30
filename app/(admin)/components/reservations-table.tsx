"use client";

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
import DeleteDialog from "./delete-dialog";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

type Reservations = {
  id: string;
  name: string | null;
  startTime: Date;
  endTime: Date;
  userId: string;
  user: {
    email: string | null;
  };
  status: string;
  description: string | null;
  lectureHallId: string;
  lectureHall: {
    name: string | null;
  };
}[];

interface ReservationsTableProps {
  reservations: Reservations;
}

export default function ReservationsTable({
  reservations,
}: ReservationsTableProps) {
  const { toast } = useToast();
  const router = useRouter();

  async function handleClick(id: string) {
    try {
      const res = await fetch("/api/reservations", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        router.refresh();
        toast({
          title: "Deleted",
          description: "Reservation Deleted Successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  }

  return (
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
        {reservations.map((reservation) => (
          <TableRow key={reservation.id}>
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
              <DeleteDialog
                alertTitle="Are you sure you want to delete this reservation?"
                alertDesc="This action cannot be undone"
                onDelete={() => handleClick(reservation.id)}
              >
                <Button variant="destructive">Delete</Button>
              </DeleteDialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
