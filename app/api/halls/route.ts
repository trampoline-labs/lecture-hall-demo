import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

type Hall = Prisma.LectureHallCreateWithoutReservationInput;
export type StrippedHall = Pick<Hall, "id" | "name" | "startTime" | "endTime">;

export async function GET(req: NextRequest) {
  try {
    const halls = await prisma.lectureHall.findMany({
      select: {
        name: true,
        id: true,
        startTime: true,
        endTime: true,
      },
    });

    return NextResponse.json(halls);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, capacity, location, amenities, startTime, endTime } =
      (await req.json()) as Hall;
    const newHall = await prisma.lectureHall.create({
      data: {
        name,
        capacity,
        location,
        amenities,
        startTime,
        endTime,
      },
    });

    return NextResponse.json(newHall);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = (await req.json()) as { id: string };
    await prisma.lectureHall.delete({
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

export async function PATCH(req: NextRequest) {
  try {
    const { name, capacity, location, amenities, startTime, endTime, id } =
      (await req.json()) as Hall;
    const newHall = await prisma.lectureHall.update({
      where: {
        id,
      },
      data: {
        name,
        capacity,
        location,
        amenities,
        startTime,
        endTime,
      },
    });

    return NextResponse.json(newHall);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
