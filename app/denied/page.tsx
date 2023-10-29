"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Denied() {
  const router = useRouter();

  return (
    <main className="flex justify-center items-center min-h-screen">
      <Card className="w-[50%]">
        <CardHeader>
          <CardTitle>Access Denied</CardTitle>
          <CardDescription>
            In short, you are not meant to be here
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => router.push("/dashboard")}>Go Home</Button>
        </CardContent>
      </Card>
    </main>
  );
}
