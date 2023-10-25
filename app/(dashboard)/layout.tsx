import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lecture Hall",
  description: "A lecture hall resevation system",
};

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
