import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function HallsCreateButton() {
  return (
    <Link href="/admin/new" className={buttonVariants({ variant: "outline" })}>
      New hall
    </Link>
  );
}
