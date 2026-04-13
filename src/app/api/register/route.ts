import { prisma } from "../../../lib/prisma"
import { NextResponse } from "next/server"
const bcrypt = require('bcrypt');

export async function POST(req: Request) {
  const body = await req.json()

  const { email, password, name } = body
  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return NextResponse.json(
      { error: "User already exists" },
      { status: 400 }
    )
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  })

  return NextResponse.json(user)
}