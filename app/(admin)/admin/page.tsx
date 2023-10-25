import { AdminHeader } from "../components/header";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import DeleteButton from "../components/delete-dialog";

// TODO: Create the loading file for skeleton loaders while fetching

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

interface HallProps {
  id: string;
  name: string;
  location: string;
  capacity: number;
  amenities: string;
  from: string;
  to: string;
}

function Hall({
  id,
  name,
  location,
  capacity,
  amenities,
  from,
  to,
}: HallProps) {
  return (
    <Card className="w-fit">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <Link href={`/admin/${id}`}>{name}</Link>
          <DeleteButton id={id}>
            <Button variant="destructive">Delete</Button>
          </DeleteButton>
        </CardTitle>
        <CardDescription>{location}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul>
          <li>capacity: {capacity}</li>
          <li>amenities: {amenities}</li>
        </ul>
      </CardContent>
      <CardFooter>
        <p>
          Available from:
          <span>{from}</span> to <span>{to}</span>
        </p>
      </CardFooter>
    </Card>
  );
}
