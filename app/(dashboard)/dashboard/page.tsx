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
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export default async function Dashboard() {
  const session = await getServerSession(options);
  const id = session?.user?.id;
  const reservations = await prisma.reservation.findMany({
    where: {
      id,
    },
    include: {
      lectureHall: true,
    },
  });
  console.log(id);

  return (
    <div className="w-full">
      <AdminHeader
        heading="Dashboard"
        text="Welcome to your Dashboard, Dear User."
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
      <div className="mt-8">
        <p>
          Email: <b>test@test.com</b>
        </p>
      </div>
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
              <TableCell className="text-right"></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
