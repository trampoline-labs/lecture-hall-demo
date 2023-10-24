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
import { useSearchParams, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";

// Credentials
// email: test@test.com, password: testing

const formSchema = z
  .object({
    email: z
      .string({ required_error: "Enter your email" })
      .email({ message: "Enter a valid email address" }),
    password: z.string({ required_error: "Enter your password" }).min(6),
  })
  .required();

export default function LoginPage() {
  return (
    <main className="flex justify-center items-center min-h-screen">
      <Card className="w-[30%]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Log into your account</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </main>
  );
}

function LoginForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        callbackUrl,
        redirect: false,
      });

      if (!res?.error) {
        router.replace(callbackUrl);
      } else {
        toast({
          title: "Credentials Error",
          description: "Invalid email or password",
        });
      }
    } catch (error) {
      toast({ title: "Oops!", description: "Something went wrong" });
      console.log(error);
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

          <Button type="submit" className="w-full">
            Submit
          </Button>
          <a href="register" className="underline text-sm my-8 text-slate-700">Don't have an accoun? Sign Up</a>
        </form>
      </Form>
    </div>
  );
}
