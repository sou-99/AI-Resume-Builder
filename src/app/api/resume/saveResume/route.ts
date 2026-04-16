import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma"

export const POST = async (req: Request) => {
  try{
  const body = await req.json()
  const { userId, content, resumeFormat } = body;
  const isUserExist = await prisma.user.findUnique({
    where: { email: userId },
  })

  if (isUserExist) {
    const resume = await prisma.resume.upsert({
      where: {
        userId_resumeFormat: {
          userId,
          resumeFormat,
        },
      },
      update: {
        content,
      },
      create: {
        userId,
        resumeFormat,
        content,
      },
    });
    // const resume = await prisma.resume.create({
    //   data: {
    //     userId: userId,
    //     content: content,
    //   }
    // });
    return NextResponse.json({ data: resume, message: "SUCCESS", type: "success" });
  } else {
    return NextResponse.json({ data: null, message: "User Does not exist!", type: "error" });
  }}
  catch (error) {
    console.error("ERROR:", error);
    return NextResponse.json({
      message: "Internal Server Error",
      type: "error",
    });
  }

}