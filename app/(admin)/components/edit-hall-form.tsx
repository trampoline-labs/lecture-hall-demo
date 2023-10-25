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
import { formSchema } from "./new-hall-form";

type EditHallFormProps = z.infer<typeof formSchema> & { id: string };

export default function EditHallForm({
  name,
  capacity,
  amenities,
  location,
  startTime,
  endTime,
  id,
}: EditHallFormProps) {
  const [startDate, setStartDate] = useState(setMinutes(startTime, 0));
  const [endDate, setEndDate] = useState(setMinutes(endTime, 0));
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name,
      capacity,
      amenities,
      location,
      startTime,
      endTime,
    },
    resolver: zodResolver(formSchema),
  });
  const { toast } = useToast();
  const router = useRouter();

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const res = await fetch("/api/halls", {
        method: "PATCH",
        body: JSON.stringify({ ...data, id }),
      });
      if (res.ok) {
        toast({
          title: "Update Successful",
          description: "Hall Updated Successfully",
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

  function filterTime(time: Date) {
    const selectedDate = new Date(time);
    return startDate.getTime() < selectedDate.getTime();
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
                  <Input placeholder="Building 24" type="text" {...field} />
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
                      dateFormat="h:mm aa"
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
                      dateFormat="h:mm aa"
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
            Update Hall Details
          </Button>
        </form>
      </Form>
    </div>
  );
}
