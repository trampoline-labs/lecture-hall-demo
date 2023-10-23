import Link from "next/link";

export default function Home() {
  return (
    <main>
      Lecture hall Reservation.
      <Link href="/dashboard" className="capitalize underline">
        go to dashboard
      </Link>
    </main>
  );
}
