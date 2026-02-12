import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import User from "../../../models/User";
import { auth } from "../../auth";

export async function GET() {
  try {
    await connectDB();

    // 🔐 session get karo
    const session = await auth();

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // ✅ session wali email
    const email = session.user.email;

    const user = await User.findOne({ email });

    return NextResponse.json({ TotalCreation: user.AllCreation });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
