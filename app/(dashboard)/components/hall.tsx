import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { LectureHall } from "@prisma/client";
import { format } from "date-fns";
import CreateReservation from "./reservation-dialog";

interface HallProps {
  hall: LectureHall;
}

export default function Hall({ hall }: HallProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{hall.name}</CardTitle>
        <CardDescription>{hall.location}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul>
          <li className="text-sm">capacity: {hall.capacity}</li>
          <li className="text-sm line-clamp-1">amenities: {hall.amenities}</li>
          <li className="text-sm">
            Available from: <span>{format(hall.startTime, "p")}</span> to{" "}
            <span>{format(hall.endTime, "p")}</span>
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <CreateReservation
          startTime={hall.startTime}
          endTime={hall.endTime}
          hallName={hall.name!}
          hallId={hall.id}
        >
          <Button>Make a reservation</Button>
        </CreateReservation>
      </CardFooter>
    </Card>
  );
}
