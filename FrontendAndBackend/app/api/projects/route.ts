import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

const sampleProjects = [
  {
    name: "Green Hydrogen Plant",
    description: "Setup of 10MW hydrogen plant",
    subsidy: 50000,
    approvals: { government: false, auditor: false, bank: false },
    status: "Pending",
  },
  {
    name: "Hydrogen Storage Unit",
    description: "Storage for produced hydrogen",
    subsidy: 30000,
    approvals: { government: false, auditor: false, bank: false },
    status: "Pending",
  },
];

export async function GET() {
  const client = await clientPromise;
  const db = client.db("green-hydrogen");
  const projectsCollection = db.collection("projects");

  const projects = await projectsCollection.find({}).toArray();

  // Seed sample projects if collection is empty
  if (projects.length === 0) {
    await projectsCollection.insertMany(sampleProjects);
    const seededProjects = await projectsCollection.find({}).toArray();
    return NextResponse.json(seededProjects);
  }

  return NextResponse.json(projects);
}


