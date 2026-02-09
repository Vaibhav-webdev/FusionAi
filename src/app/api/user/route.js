import { connectDB } from "../../../lib/db";
import User from "../../../models/User";
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10)

    await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    return NextResponse.json({
      success: true,
      message: "User added successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
