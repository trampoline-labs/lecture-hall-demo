import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <main>
      <Card className="text-center">
        <CardHeader>
          <CardTitle>Lecture Hall Management System</CardTitle>
          <CardDescription>
            Proof Of Concept app for a Lecture Hall Reservation System
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/dashboard" className="capitalize underline">
            go to dashboard
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
