import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import User from "../../../models/User";
import { auth } from "../../auth";

export async function POST(req) {
  try {
    await connectDB();

    const session = await auth();

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const email = session.user.email;

    const { category, data } = await req.json();

    if (!category || !data) {
      return NextResponse.json(
        { success: false, message: "Category and data required" },
        { status: 400 }
      );
    }

    // ✅ Allowed categories validation
    const allowedCategories = [
      "ArticleGen",
      "KeywordGen",
    ];

    if (!allowedCategories.includes(category)) {
      return NextResponse.json(
        { success: false, message: "Invalid category" },
        { status: 400 }
      );
    }

    await User.updateOne(
      { email },
      {
        $push: {
          [`AllCreation.${category}`]: data
        }
      }
    );

    return NextResponse.json({
      success: true,
      message: "Data added successfully"
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
