import type { Metadata } from "next";
import AdminNav from "./components/admin-nav";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard panel",
};

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container grid grid-cols-[200px_1fr] gap-12 p-6">
      <aside className="w-[200px] flex-col">
        <AdminNav />
      </aside>
      <section className="flex w-full">{children}</section>
    </main>
  );
}
