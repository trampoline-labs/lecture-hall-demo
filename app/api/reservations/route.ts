import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Reservation = {
  hallId: string;
  startTime: Date;
  endTime: Date;
  userId: string;
  status: string;
};

export async function POST(req: NextRequest) {
  try {
    const { hallId, startTime, endTime, userId, status } =
      (await req.json()) as Reservation;

    await prisma.reservation.create({
      data: {
        startTime,
        endTime,
        userId,
        status,
        lectureHallId: hallId,
      },
    });

    return NextResponse.json({ message: "success" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = (await req.json()) as { id: string };
    await prisma.reservation.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ message: "deleted" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
