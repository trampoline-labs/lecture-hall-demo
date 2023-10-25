"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setMinutes } from "date-fns";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const formSchema = z
  .object({
    name: z.string({ required_error: "Enter the name of this hall" }),
    capacity: z.coerce.number({
      required_error: "Specify the capacity this hall can take",
    }),
    location: z.string({
      required_error: "Specify where this hall is located",
    }),
    // TODO: could be an enum
    amenities: z.string(),
    startTime: z.date({
      required_error: "Start date-time for availability is required",
    }),
    endTime: z.date({
      required_error: "End date-time for availability is required",
    }),
  })
  .required();

// for testing, time availability is only for the current day

export default function NewHallForm() {
  const [startDate, setStartDate] = useState(setMinutes(new Date(), 0));
  const [endDate, setEndDate] = useState(setMinutes(new Date(), 0));
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      capacity: 50,
    },
    resolver: zodResolver(formSchema),
  });
  const { toast } = useToast();
  const router = useRouter();

  function filterTime(time: Date) {
    const selectedDate = new Date(time);
    return startDate.getTime() < selectedDate.getTime();
  }

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const res = await fetch("/api/halls", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast({
          title: "Creation Successful",
          description: "New Hall Created Successfully",
        });
        setLoading(false);
        router.refresh();
        router.push("/admin");
      }
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error",
        description: "Something went wrong, Try again",
        variant: "destructive",
      });
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hall Name:</FormLabel>
                <FormControl>
                  <Input placeholder="Hall #1" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hall Capacity:</FormLabel>
                <FormControl>
                  <Input placeholder="50" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hall Location:</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John building, 24"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amenities"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hall Amenities:</FormLabel>
                <FormControl>
                  <Input
                    placeholder="whiteboard, speaker"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="startTime"
              render={({ field: { onChange } }) => (
                <FormItem>
                  <FormLabel>Available From:</FormLabel>
                  <FormControl className="ml-6">
                    <DatePicker
                      minDate={new Date()}
                      maxDate={new Date()}
                      selected={startDate}
                      showTimeSelect
                      timeIntervals={60}
                      dateFormat="MMMM d, yyyy h:mm aa"
                      onChange={(date) => {
                        setStartDate(date!);
                        onChange(date);
                      }}
                      // {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endTime"
              render={({ field: { onChange } }) => (
                <FormItem>
                  <FormLabel>Till:</FormLabel>
                  <FormControl className="ml-6">
                    <DatePicker
                      minDate={new Date()}
                      maxDate={new Date()}
                      selected={endDate}
                      showTimeSelect
                      timeIntervals={60}
                      dateFormat="MMMM d, yyyy h:mm aa"
                      onChange={(date) => {
                        setEndDate(date!);
                        onChange(date);
                      }}
                      filterTime={filterTime}
                      // {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" disabled={loading}>
            Create Hall
          </Button>
        </form>
      </Form>
    </div>
  );
}
