import { NextResponse } from "next/server";
import User from "../../../models/User";
import { auth } from "../../auth";
import { connectDB } from "../../../lib/db";

export async function POST(req) {
  try {
    await connectDB();

    // session se email nikaalo
    const session = await auth();

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const email = session.user.email;

    // frontend se data (optional)
    const { creditUsed } = await req.json();

    // user update
    const updatedUser = await User.findOneAndUpdate(
      {
    email,
    credits: { $gte: creditUsed },
  },
      {
        $inc: {
          credits: -creditUsed, // credits kam
          creations: 1,          // creations +1
        },
      },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}