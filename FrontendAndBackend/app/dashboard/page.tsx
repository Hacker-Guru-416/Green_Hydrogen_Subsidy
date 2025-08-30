"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// --- Helper Components ---
const LeafIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-8 w-8 text-green-400" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM5.586 8.586a2 2 0 112.828 2.828L10 10l-2.828-2.828-1.586 1.586zM10 10l1.414 1.414a2 2 0 11-2.828-2.828L10 10z" clipRule="evenodd" />
  </svg>
);

const CustomizeDashboardLink = ({ role }: { role: string }) => (
  <div className="my-6 text-center">
    <Link
      href={`/dashboard/customizable?role=${role}`}
      className="inline-flex items-center gap-2 rounded-full border-2 border-green-400 px-6 py-3 font-semibold text-green-300 transition-all duration-300 hover:bg-green-400 hover:text-black hover:shadow-lg hover:shadow-green-400/30"
    >
      Customize Dashboard
    </Link>
  </div>
);

// --- Project type ---
type Project = {
  id: number;
  name: string;
  description: string;
  subsidy: number;
  approvals: {
    government: boolean;
    auditor: boolean;
    bank: boolean;
  };
  status: "Pending" | "Approved" | "Funded";
};

// --- Sample projects ---
const initialProjects: Project[] = [
  {
    id: 1,
    name: "Green Hydrogen Plant",
    description: "Setup of 10MW hydrogen plant",
    subsidy: 50000,
    approvals: { government: false, auditor: false, bank: false },
    status: "Pending",
  },
  {
    id: 2,
    name: "Hydrogen Storage Unit",
    description: "Storage for produced hydrogen",
    subsidy: 30000,
    approvals: { government: false, auditor: false, bank: false },
    status: "Pending",
  },
];

// --- Main Page Component ---
export default function DashboardPage() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "startup"; // fallback role
  const [content, setContent] = useState<JSX.Element | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  // User-specific storage key
  const username = searchParams.get("user") || "defaultUser";
  const storageKey = `projects_${username}`;

  // Load projects from localStorage (user-specific) or initialize
  useEffect(() => {
    const savedProjects = localStorage.getItem(storageKey);
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      localStorage.setItem(storageKey, JSON.stringify(initialProjects));
      setProjects(initialProjects);
    }
  }, [storageKey]);

  // Save projects to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(projects));
  }, [projects, storageKey]);

  // Approve handler (for govt, auditor, bank)
  const handleApprove = (id: number, role: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const updated = { ...p };
          if (role === "government") updated.approvals.government = true;
          if (role === "auditor") updated.approvals.auditor = true;
          if (role === "bank") updated.approvals.bank = true;

          if (updated.approvals.government && updated.approvals.auditor && updated.approvals.bank) {
            updated.status = "Funded";
          } else if (updated.approvals.government && updated.approvals.auditor) {
            updated.status = "Approved";
          }
          return updated;
        }
        return p;
      })
    );
  };

  // Set dashboard content based on role
  useEffect(() => {
    switch (role) {
      case "government":
        setContent(<GovernmentDashboard projects={projects} onApprove={(id) => handleApprove(id, "government")} />);
        break;
      case "startup":
        setContent(<StartupDashboard projects={projects} setProjects={setProjects} />);
        break;
      case "bank":
        setContent(<BankDashboard projects={projects} onApprove={(id) => handleApprove(id, "bank")} />);
        break;
      case "auditor":
        setContent(<AuditorDashboard projects={projects} onApprove={(id) => handleApprove(id, "auditor")} />);
        break;
      default:
        setContent(<p className="text-red-500">Invalid role.</p>);
    }
  }, [role, projects]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-green-950 text-white p-4 md:p-8 font-sans">
      <header className="flex flex-col md:flex-row justify-between items-center mb-8 bg-black/30 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-green-700/50">
        <h1 className="text-3xl md:text-4xl font-extrabold flex items-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-300 mb-4 md:mb-0">
          Green Hydrogen Gateway <LeafIcon />
        </h1>
        <a href="/login" className="px-6 py-2 rounded-full bg-red-600 hover:bg-red-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-lg font-medium">
          Logout
        </a>
      </header>
      <div className="bg-white/5 backdrop-blur-md rounded-3xl shadow-2xl p-6 md:p-10 border border-green-600/30 animate-fade-in">
        {content}
      </div>
    </div>
  );
}

// --- Dashboard Views ---
function GovernmentDashboard({ projects, onApprove }: { projects: Project[]; onApprove: (id: number) => void }) {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-300 mb-6 border-b border-green-700/50 pb-2">
        Government Dashboard
      </h2>
      <CustomizeDashboardLink role="government" />
      <ActivityTable rows={projects} onApprove={onApprove} role="government" />
    </div>
  );
}

function BankDashboard({ projects, onApprove }: { projects: Project[]; onApprove: (id: number) => void }) {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-300 mb-6 border-b border-green-700/50 pb-2">
        Bank Dashboard
      </h2>
      <CustomizeDashboardLink role="bank" />
      <ActivityTable rows={projects} onApprove={onApprove} role="bank" />
    </div>
  );
}

function StartupDashboard({ projects, setProjects }: { projects: Project[]; setProjects: React.Dispatch<React.SetStateAction<Project[]>> }) {
  const [form, setForm] = useState({ name: "", description: "", subsidy: 0 });

  const handleCreate = () => {
    if (!form.name.trim()) return;
    const newProject: Project = {
      id: projects.length + 1,
      name: form.name,
      description: form.description,
      subsidy: form.subsidy,
      approvals: { government: false, auditor: false, bank: false },
      status: "Pending",
    };
    setProjects([...projects, newProject]);
    setForm({ name: "", description: "", subsidy: 0 });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-300 mb-6 border-b border-green-700/50 pb-2">
        Startup Dashboard
      </h2>
      <CustomizeDashboardLink role="startup" />
      <div className="bg-black/40 p-6 rounded-2xl border border-green-800/50 space-y-4">
        <input
          type="text"
          placeholder="Project Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-green-600 bg-black/60 text-white"
        />
        <textarea
          placeholder="Project Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-green-600 bg-black/60 text-white"
        />
        <input
          type="number"
          placeholder="Subsidy Amount"
          value={form.subsidy}
          onChange={(e) => setForm({ ...form, subsidy: Number(e.target.value) })}
          className="w-full px-4 py-2 rounded-lg border border-green-600 bg-black/60 text-white"
        />
        <button onClick={handleCreate} className="px-6 py-2 rounded-lg bg-green-500 text-black font-semibold hover:bg-green-400 transition-all">
          + Create Project
        </button>
      </div>
      <ActivityTable rows={projects} role="startup" />
    </div>
  );
}

function AuditorDashboard({ projects, onApprove }: { projects: Project[]; onApprove: (id: number) => void }) {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-300 mb-6 border-b border-green-700/50 pb-2">
        Auditor Dashboard
      </h2>
      <CustomizeDashboardLink role="auditor" />
      <ActivityTable rows={projects} onApprove={onApprove} role="auditor" />
    </div>
  );
}

// --- Reusable Activity Table ---
function ActivityTable({ rows, onApprove, role }: { rows: Project[]; onApprove?: (id: number) => void; role: string }) {
  return (
    <div className="bg-black/40 p-6 rounded-2xl border border-green-800/50 overflow-hidden">
      <h3 className="text-xl font-semibold mb-4 text-green-200">Projects</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr className="text-green-300 border-b-2 border-green-700/70">
              <th className="p-3 text-sm font-semibold">#</th>
              <th className="p-3 text-sm font-semibold">Project</th>
              <th className="p-3 text-sm font-semibold">Description</th>
              <th className="p-3 text-sm font-semibold">Subsidy</th>
              <th className="p-3 text-sm font-semibold">Status</th>
              {role !== "startup" && <th className="p-3 text-sm font-semibold">Action</th>}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, index) => (
              <tr key={r.id} className={`border-b border-gray-700/50 hover:bg-white/5 ${index % 2 === 0 ? "bg-black/10" : "bg-black/20"}`}>
                <td className="p-3 text-gray-200">{r.id}</td>
                <td className="p-3 font-medium text-white">{r.name}</td>
                <td className="p-3 text-gray-300">{r.description}</td>
                <td className="p-3 text-green-300">${r.subsidy}</td>
                <td className={`p-3 font-semibold ${r.status === "Funded" ? "text-green-400" : r.status === "Approved" ? "text-blue-400" : "text-yellow-400"}`}>
                  {r.status}
                </td>
                {role !== "startup" && (
                  <td className="p-3">
                    {!r.approvals[role as "government" | "auditor" | "bank"] && r.status !== "Funded" ? (
                      <button onClick={() => onApprove && onApprove(r.id)} className="px-4 py-1 rounded bg-green-500 text-black hover:bg-green-400">
                        Approve
                      </button>
                    ) : (
                      <span className="text-gray-500">—</span>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
