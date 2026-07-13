import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required." },
        { status: 400 }
      );
    }

    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
      },
      orderBy: {
        date: "desc",
      },
    });

    return NextResponse.json(transactions);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch transactions." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      description,
      amount,
      category,
      userId,
    } = body;

    if (
      !description ||
      amount === undefined ||
      !category ||
      !userId
    ) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    const transaction = await prisma.transaction.create({
      data: {
        description,
        amount,
        category,
        userId,
      },
    });

    return NextResponse.json(transaction, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const {
      id,
      description,
      amount,
      category,
    } = body;

    if (!id) {
      return NextResponse.json(
        { message: "Transaction ID is required." },
        { status: 400 }
      );
    }

    const updatedTransaction =
      await prisma.transaction.update({
        where: {
          id,
        },
        data: {
          description,
          amount,
          category,
        },
      });

    return NextResponse.json(updatedTransaction);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to update transaction.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Transaction ID is required." },
        { status: 400 }
      );
    }

    await prisma.transaction.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Transaction deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to delete transaction." },
      { status: 500 }
    );
  }
}