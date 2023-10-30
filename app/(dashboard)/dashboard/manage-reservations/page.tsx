import { prisma } from "@/lib/prisma";
import Hall from "../../components/hall";

export default async function ManageReservations() {
  const halls = await prisma.lectureHall.findMany();

  return (
    <div className="px-3 py-3 flex gap-2">
      {halls.map((hall, idx) => {
        return <Hall key={idx} hall={hall} />;
      })}
    </div>
  );
}
