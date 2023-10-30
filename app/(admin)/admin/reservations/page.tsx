import { AdminHeader } from "../../components/header";
import ReservationsTable from "../../components/reservations-table";
import { Button } from "@/components/ui/button";
import CreateReservation from "../../components/create-reservation";
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

      <ReservationsTable reservations={reservations} />
    </div>
  );
}
