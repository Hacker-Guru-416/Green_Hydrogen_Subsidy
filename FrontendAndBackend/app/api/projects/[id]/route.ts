// app/api/projects/route.ts
import dbConnect from "@/lib/dbConnect";
import Project from "@/models/Project";

export async function GET() {
  try {
    await dbConnect();
    const projects = await Project.find({});
    return Response.json(projects, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const project = new Project(body);
    await project.save();
    return Response.json(project, { status: 201 });
  } catch (error) {
    return Response.json({ error: "Failed to create project" }, { status: 500 });
  }
}
