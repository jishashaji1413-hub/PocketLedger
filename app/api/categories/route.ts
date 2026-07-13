import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const transactions = await prisma.transaction.findMany({
    orderBy: {
      date: "desc",
    },
  });

  return NextResponse.json(transactions);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const transaction = await prisma.transaction.create({
      data: {
        description: body.description,
        amount: body.amount,
        category: body.category,
      },
    });

    return NextResponse.json(transaction);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}