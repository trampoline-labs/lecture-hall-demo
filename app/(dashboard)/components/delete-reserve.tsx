"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import DeleteDialog from "@/components/delete-dialog";
interface HallProps {
  id: string;
}

export default function DeleteReserve({ id }: HallProps) {
  const { toast } = useToast();
  const router = useRouter();

  async function handleClick() {
    try {
      const res = await fetch("/api/reservations", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        router.refresh();
        toast({
          title: "Deleted",
          description: "Reservation Deleted successfully",
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
    <DeleteDialog
      onDelete={handleClick}
      alertTitle="Are you sure you want to delete this reservation?"
      alertDesc="Action can't be undone"
    >
      <Button variant="destructive">Delete</Button>
    </DeleteDialog>
  );
}
