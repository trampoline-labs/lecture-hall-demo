"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";
import { setMinutes } from "date-fns";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface CreateReservationProps {
  startTime: Date;
  endTime: Date;
  hallName: string;
  hallId: string;
  children: React.ReactNode;
}

const formSchema = z
  .object({
    startTime: z.date({
      required_error: "Please enter a start-time for your reservation",
    }),
    endTime: z.date({
      required_error: "Please enter an end-time for your reservation",
    }),
  })
  .required();

export default function CreateReservation({
  startTime,
  endTime,
  hallName,
  children,
  hallId,
}: CreateReservationProps) {
  // const [startTime, setStartTime] = useState(setMinutes(new Date(), 0));
  // const [endTime, setEndTime] = useState(setMinutes(new Date(), 0));
  const { data: session } = useSession();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startTime: startTime,
      endTime: endTime,
    },
  });

  function filterTime(time: Date) {
    const selectedDate = new Date(time);
    return form.getValues("startTime").getTime() < selectedDate.getTime();
  }

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const res = await fetch("/api/reservations", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          status: "pending",
          userId: session!.user.id,
          hallId,
        }),
      });
      setLoading(false);
      if (res.ok) {
        setIsDialogOpen(false);
        toast({
          title: "Creation Successful",
          description: "Reservation made successfully",
        });
      }
      router.push("/dashboard");
      router.refresh();
      setIsDialogOpen(false);
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error",
        description: "Something went wrong somewhere",
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={(open) => setIsDialogOpen(open)}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Make a Reservation</DialogTitle>
          <DialogDescription>
            Make a reservation for <span className="font-bold">{hallName}</span>
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem className="space-x-4">
                  <FormLabel>Start Time:</FormLabel>
                  <FormControl>
                    <DatePicker
                      minDate={new Date()}
                      maxDate={new Date()}
                      selected={setMinutes(field.value, 0)}
                      showTimeSelect
                      timeIntervals={60}
                      dateFormat="h:mm aa"
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem className="space-x-4">
                  <FormLabel>End Time:</FormLabel>
                  <FormControl>
                    <DatePicker
                      minDate={new Date()}
                      maxDate={new Date()}
                      selected={setMinutes(field.value, 0)}
                      filterTime={filterTime}
                      showTimeSelect
                      timeIntervals={60}
                      dateFormat="h:mm aa"
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="capitalize" disabled={loading}>
              create reservation
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
