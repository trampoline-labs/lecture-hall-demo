import type { Metadata } from "next";
import { AdminHeader } from "../../components/header";

export const metadat: Metadata = {
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
        <AdminHeader
          heading="Reservations"
          text="Create and manage reservations"
        />
      </div>
      {children}
    </section>
  );
}
