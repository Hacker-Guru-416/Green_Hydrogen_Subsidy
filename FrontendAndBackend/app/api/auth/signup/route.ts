import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { fullName, email, password, confirmPassword, role } = await request.json();

    // Basic validation
    if (!fullName || !email || !password || !confirmPassword || !role) {
      return NextResponse.json({ success: false, message: 'Please provide all required fields.' }, { status: 400 });
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ success: false, message: 'Passwords do not match.' }, { status: 400 });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json({ success: false, message: 'User with this email already exists.' }, { status: 409 });
    }

    // Create new user
    const newUser = new User({
      fullName,
      email,
      password,
      role,
    });

    await newUser.save();

    return NextResponse.json({
      success: true,
      message: 'User registered successfully!',
      user: { id: newUser._id, fullName: newUser.fullName, email: newUser.email, role: newUser.role },
    }, { status: 201 });

  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'An error occurred during registration.' }, { status: 500 });
  }
}