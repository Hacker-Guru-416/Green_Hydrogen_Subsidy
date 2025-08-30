import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/dbConnect';
import Project from '@/models/Project';
import User from '@/models/User'; // We need User model for population

// Helper function to get user data from the auth token in cookies
const getUserDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get('token')?.value ?? '';
    if (!token || !process.env.JWT_SECRET) {
      return null;
    }
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET);
    return { id: decodedToken.id, role: decodedToken.role };
  } catch (error) {
    // If token is expired or invalid
    return null;
  }
};

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const userData = getUserDataFromToken(request);

    if (!userData) {
      return NextResponse.json(
        { success: false, message: 'Authentication failed. Please log in again.' },
        { status: 401 }
      );
    }

    const { role, id } = userData;

    let stats = {};
    let projects;

    // Fetch data based on the user's role
    switch (role) {
      case 'government':
        stats = {
          "Applications Pending": await Project.countDocuments({ status: 'Pending' }),
          "Approved Projects": await Project.countDocuments({ status: 'Approved' }),
          "Funds Disbursed": "$2.3M", // This would typically come from another collection
        };
        projects = await Project.find({})
          .sort({ createdAt: -1 })
          .limit(5)
          .populate({ path: 'createdBy', model: User, select: 'organizationName fullName' });
        break;

      case 'startup':
        stats = {
          "My Applications": await Project.countDocuments({ createdBy: id }),
          "Approved": await Project.countDocuments({ createdBy: id, status: 'Approved' }),
          "Pending": await Project.countDocuments({ createdBy: id, status: 'Pending' }),
        };
        projects = await Project.find({ createdBy: id })
          .sort({ createdAt: -1 })
          .limit(5);
        break;

      case 'bank':
        stats = {
          "Loan Requests": await Project.countDocuments({ status: 'Approved' }),
          "Approved Loans": await Project.countDocuments({ status: 'Funding' }),
          "Funds Disbursed": "$1.1M",
        };
        projects = await Project.find({ status: { $in: ['Approved', 'Funding'] } })
          .sort({ createdAt: -1 })
          .limit(5);
        break;

      case 'auditor':
        stats = {
          "Audits Pending": await Project.countDocuments({ status: 'Funding' }),
          "Audits Completed": await Project.countDocuments({ status: 'Auditing' }),
          "Reports Generated": 6,
        };
        projects = await Project.find({ status: { $in: ['Funding', 'Auditing', 'Completed'] } })
          .sort({ createdAt: -1 })
          .limit(5);
        break;

      default:
        return NextResponse.json(
          { success: false, message: 'Invalid user role.' },
          { status: 400 }
        );
    }

    // Format projects for the frontend
    const formattedProjects = projects.map((p: any) => ({
      id: p._id,
      name: p.projectName,
      status: p.status,
      // For government view, show the startup's organization name
      organization:
        (p.createdBy as any)?.organizationName ||
        (p.createdBy as any)?.fullName,
    }));

    return NextResponse.json(
      {
        success: true,
        data: { stats, projects: formattedProjects },
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'An internal server error occurred.' },
      { status: 500 }
    );
  }
}