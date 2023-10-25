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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";
import { useState } from "react";

const formSchema = z
  .object({
    email: z
      .string({ required_error: "Enter your email" })
      .email({ message: "Enter a valid email address" }),
    password: z
      .string({ required_error: "Enter your password" })
      .min(6)
      .max(10),
    confirm_password: z
      .string({ required_error: "Confirm your password" })
      .min(6),
  })
  .required()
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export default function RegisterPage() {
  return (
    <main className="flex justify-center items-center min-h-screen">
      <Card className="w-[30%]">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Sign up for an account</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </main>
  );
}

function RegisterForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
    },
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, password } = values;
    try {
      setLoading(true);
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLoading(false);
      if (!res.ok) {
        toast({
          title: "Invalid Credentials",
          description: "Email probably already exists",
        });
        return;
      }

      signIn(undefined, { callbackUrl: "/dashboard" });
    } catch (error) {
      setLoading(false);
      toast({
        title: "Server Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="mt-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="test@test.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="secret" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input placeholder="secret" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={loading}>
            Submit
          </Button>
          <a
            href="/login"
            className="underline text-sm my-8 mx-3 text-slate-700"
          >
            Have an account? Login
          </a>
        </form>
      </Form>
    </div>
  );
}
