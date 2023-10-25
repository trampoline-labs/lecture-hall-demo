import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

type Hall = Prisma.LectureHallCreateWithoutReservationInput;

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
  }
}
