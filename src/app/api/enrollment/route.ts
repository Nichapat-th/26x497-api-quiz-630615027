import { getPrisma } from "@/libs/getPrisma";
import { Course, Enrollment, Student } from "@prisma/client";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

type EnrollmentWithRelation = Enrollment & {
  student: Student;
  course: Course;
};

export type EnrollmentGetResponse = {
  enrollments: EnrollmentWithRelation[];
};

export const GET = async () => {
  const prisma = getPrisma();
  const enrollments: EnrollmentWithRelation[] =
    await prisma.enrollment.findMany({
      include: {
        student: true,
        course: true,
      },
    });

  return NextResponse.json<EnrollmentGetResponse>({
    enrollments: enrollments,
  });
};
