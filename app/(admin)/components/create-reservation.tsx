"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useSWR from "swr";
import type { StrippedHall } from "@/app/api/halls/route";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";

const formSchema = z
  .object({
    hallId: z.string({ required_error: "Enter a hall" }),
    startTime: z.date({
      required_error: "Start date-time for availability is required",
    }),
    endTime: z.date({
      required_error: "End date-time for availability is required",
    }),
  })
  .required();

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// ! Of course a simpler way to do this
// ! would have been fetch this data in a RSC
// ! and pass it as props but hey, allow

// overly complex actually
// what I'm doing here is not supposed
// to look like this

export default function CreateReservation({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, isLoading } = useSWR<StrippedHall[], Error>(
    "/api/halls",
    fetcher,
  );
  const { data: session } = useSession();
  const [startTime, setStartTime] = useState(setMinutes(new Date(), 0));
  const [endTime, setEndTime] = useState(setMinutes(new Date(), 0));
  const { toast } = useToast();
  function filterTime(time: Date) {
    const selectedDate = new Date(time);
    return startTime.getTime() < selectedDate.getTime();
  }
  const someRef = useRef(new Map());
  const router = useRouter();

  if (!isLoading) {
    if (data) {
      data.forEach((item) => {
        someRef.current.set(item.id, {
          start: new Date(item.startTime),
          end: new Date(item.endTime),
          name: item.name,
        });
      });
    }
  }

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          status: "pending",
          userId: session!.user?.id,
        }),
      });
      if (res.ok) {
        toast({
          title: "Creation Successful",
          description: "New Reservation Created Successfully",
        });
        router.refresh();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong, Try again",
        variant: "destructive",
      });
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New Reservation</SheetTitle>
          <SheetDescription>Make a new reservation</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="hallId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hall Name:</FormLabel>
                  <Select
                    onValueChange={(hallId) => {
                      const time = someRef.current.get(hallId);
                      setStartTime(time.start);
                      setEndTime(time.end);
                      field.onChange(hallId);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a lecture Hall" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {data
                        ? data.map((item) => {
                            return (
                              <SelectItem value={item.id!} key={item.id}>
                                {item.name}
                              </SelectItem>
                            );
                          })
                        : "loading..."}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>From: </FormLabel>
                  <FormControl>
                    <DatePicker
                      minDate={new Date()}
                      maxDate={new Date()}
                      selected={startTime}
                      showTimeSelect
                      timeIntervals={60}
                      dateFormat="h:mm aa"
                      onChange={(date) => {
                        setStartTime(date!);
                        field.onChange(date);
                      }}
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
                <FormItem>
                  <FormLabel>To: </FormLabel>
                  <FormControl>
                    <DatePicker
                      minDate={new Date()}
                      maxDate={new Date()}
                      selected={endTime}
                      showTimeSelect
                      timeIntervals={60}
                      dateFormat="h:mm aa"
                      filterTime={filterTime}
                      onChange={(date) => {
                        setEndTime(date!);
                        field.onChange(date);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetClose asChild>
              <Button type="submit">Create reservation</Button>
            </SheetClose>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
