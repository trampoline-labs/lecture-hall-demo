import EditHallForm from "../../components/edit-hall-form";
import { AdminHeader } from "../../components/header";
import { prisma } from "@/lib/prisma";

export default async function EditHallPage({
  params,
}: {
  params: { hallId: string };
}) {
  const hall = await prisma.lectureHall.findFirst({
    where: {
      id: params.hallId,
    },
  });

  return (
    <div className="w-full px-2">
      <AdminHeader heading={hall?.name || "NIL"} text="Edit Hall details" />
      <div>
        <EditHallForm
          id={params.hallId}
          amenities={hall?.amenities!}
          capacity={hall?.capacity!}
          location={hall?.location!}
          name={hall?.name!}
          startTime={hall?.startTime!}
          endTime={hall?.endTime!}
        />
      </div>
    </div>
  );
}
