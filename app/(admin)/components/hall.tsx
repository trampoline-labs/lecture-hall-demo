"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DeleteDialog from "@/components/delete-dialog";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface HallProps {
  id: string;
  name: string;
  location: string;
  capacity: number;
  amenities: string;
  from: string;
  to: string;
}

export function Hall({
  id,
  name,
  location,
  capacity,
  amenities,
  from,
  to,
}: HallProps) {
  const { toast } = useToast();
  const router = useRouter();

  async function handleClick() {
    try {
      const res = await fetch("/api/halls", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        router.refresh();
        toast({
          title: "Deleted",
          description: "Hall Deleted successfully",
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
    <Card className="w-fit">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <Link href={`/admin/${id}`}>{name}</Link>
          <DeleteDialog
            onDelete={handleClick}
            alertTitle="Are you sure you want to delete this hall?"
            alertDesc="All reservations for this hall will be cleared"
          >
            <Button variant="destructive">Delete</Button>
          </DeleteDialog>
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
