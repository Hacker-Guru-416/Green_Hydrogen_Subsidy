import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("❌ Please define JWT_SECRET in your .env.local");
}

type LoginBody = {
  email: string;
  password: string;
};

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { email, password }: LoginBody = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required." },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials." },
        { status: 401 }
      );
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials." },
        { status: 401 }
      );
    }

    // Create JWT
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1d",
    });

    // Use NextResponse to set cookie
    const response = NextResponse.json(
      {
        success: true,
        message: "Logged in successfully!",
        role: user.role,
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    return response;
  } catch (err: unknown) {
    console.error("Login error:", err);
    return NextResponse.json(
      {
        success: false,
        message:
          err instanceof Error
            ? err.message
            : "An error occurred during login.",
      },
      { status: 500 }
    );
  }
}