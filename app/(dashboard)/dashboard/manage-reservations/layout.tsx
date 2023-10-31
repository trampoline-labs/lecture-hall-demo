import type { Metadata } from "next";
import { AdminHeader } from "../../components/header";

export const metadata: Metadata = {
  title: "Reservations",
  description: "Manage reservations",
};

export default function ReservationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="w-full">
        <div className="flex items-center justify-between px-2">
          <div className="grid gap-1">
            <h1 className="font-bold text-3xl md:text-4xl">Reservations</h1>
            <p className="text-lg text-foreground">
              Create and manage your reservations
            </p>
          </div>
        </div>
      </div>
      {children}
    </section>
  );
}
