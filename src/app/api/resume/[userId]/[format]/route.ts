import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ userId: string; format: string }> }
) {
  try {
    const { userId, format } = await context.params;

    const resume = await prisma.resume.findUnique({
      where: {
        userId_resumeFormat: {
          userId,
          resumeFormat: format,
        },
      },
    });

    if (!resume) {
      return new Response("Resume not found", { status: 404 });
    }

    return Response.json(resume);

  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}