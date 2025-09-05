import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    console.log("❌ No session found in transactions API");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  console.log("🔍 Session user email:", session.user.email);

  try {
    // Get user's banking profile
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        bankingProfile: {
          include: {
            transactions: {
              orderBy: { createdAt: "desc" },
              take: 10, // Get last 10 transactions
            },
          },
        },
      },
    });

    console.log("🔍 User found:", !!user);
    console.log("🔍 Banking profile found:", !!user?.bankingProfile);
    console.log(
      "🔍 Transactions count:",
      user?.bankingProfile?.transactions?.length || 0
    );

    if (!user?.bankingProfile) {
      console.log("❌ Banking profile not found for user:", session.user.email);
      return NextResponse.json(
        { error: "Banking profile not found" },
        { status: 404 }
      );
    }

    // Format transactions for frontend
    const transactions = user.bankingProfile.transactions.map(
      (transaction) => ({
        id: transaction.id,
        type: transaction.type.toLowerCase(),
        amount: transaction.amount,
        description: transaction.description,
        date: transaction.createdAt.toISOString().split("T")[0],
        balance: transaction.balanceAfter,
        category: transaction.category,
      })
    );

    return NextResponse.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
