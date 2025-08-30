"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Rectangle
} from "recharts";

// --- Helper Components & Data ---

const LeafIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-8 w-8 text-green-400" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM5.586 8.586a2 2 0 112.828 2.828L10 10l-2.828-2.828-1.586 1.586zM10 10l1.414 1.414a2 2 0 11-2.828-2.828L10 10z" clipRule="evenodd" />
  </svg>
);

const data = [ { month: "Jan", projects: 4 }, { month: "Feb", projects: 6 }, { month: "Mar", projects: 3 }, { month: "Apr", projects: 8 }, { month: "May", projects: 5 }, { month: "Jun", projects: 7 },];

const CustomActiveBar = (props: any) => {
    const { x, y, width, height } = props;
    return ( <Rectangle {...props} x={x} y={y - 2} width={width} height={height + 4} fill="#86efac" stroke="#bef264" strokeWidth={2} radius={[8, 8, 0, 0]} /> );
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-4 bg-gray-900/90 flex flex-col gap-2 rounded-xl border border-green-500 shadow-lg">
                <p className="text-lg font-bold text-green-300">{label}</p>
                <p className="text-sm text-white"> Projects: <span className="ml-2 font-bold text-lg">{payload[0].value}</span> </p>
            </div>
        );
    }
    return null;
};

const CustomizeDashboardLink = ({ role }: { role: string }) => (
    <div className="my-6 text-center">
        <Link
            href={`/dashboard/customizable?role=${role}`}
            className="inline-flex items-center gap-2 rounded-full border-2 border-green-400 px-6 py-3 font-semibold text-green-300 transition-all duration-300 hover:bg-green-400 hover:text-black hover:shadow-lg hover:shadow-green-400/30"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
            </svg>
            Customize Dashboard
        </Link>
    </div>
);

// --- Main Page Component ---
export default function DashboardPage() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const [content, setContent] = useState<JSX.Element | null>(null);

  useEffect(() => {
    if (!role) {
      setContent(<p className="text-red-500 font-semibold animate-pulse">No role selected! Please log in.</p>);
      return;
    }

    switch (role) {
      case "government": setContent(<GovernmentDashboard />); break;
      case "startup": setContent(<StartupDashboard />); break;
      case "bank": setContent(<BankDashboard />); break;
      case "auditor": setContent(<AuditorDashboard />); break;
      default: setContent(<p className="text-red-500">Invalid role.</p>);
    }
  }, [role]);

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

function GovernmentDashboard() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-300 mb-6 border-b border-green-700/50 pb-2">
        Government Dashboard
      </h2>
      <CustomizeDashboardLink role="government" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Applications Pending" value="12" icon="📝" />
        <StatCard title="Approved Projects" value="34" icon="✅" />
        <StatCard title="Funds Disbursed" value="$2.3M" icon="💰" />
      </div>
      <div className="bg-black/40 p-6 rounded-2xl shadow-inner border border-green-800/50 hover:shadow-green-500/20 transition-shadow duration-300">
        <h3 className="text-xl font-semibold mb-4 text-green-200">Projects Over Time (Last 6 Months)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
            <XAxis dataKey="month" stroke="#a0aec0" className="text-sm" />
            <YAxis stroke="#a0aec0" className="text-sm" />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(134, 239, 172, 0.1)' }} />
            <Bar dataKey="projects" fill="rgba(74, 222, 128, 0.6)" radius={[8, 8, 0, 0]} animationDuration={1500} activeBar={<CustomActiveBar />} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <ActivityTable />
    </div>
  );
}

function StartupDashboard() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-300 mb-6 border-b border-green-700/50 pb-2">
        Startup Dashboard
      </h2>
      <CustomizeDashboardLink role="startup" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="My Applications" value="3" icon="📄" />
        <StatCard title="Approved" value="1" icon="🎉" />
        <StatCard title="Pending" value="2" icon="⏳" />
      </div>
      <ActivityTable />
    </div>
  );
}

function BankDashboard() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-300 mb-6 border-b border-green-700/50 pb-2">
        Bank Dashboard
      </h2>
      <CustomizeDashboardLink role="bank" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Loan Requests" value="7" icon="💸" />
        <StatCard title="Approved Loans" value="4" icon="👍" />
        <StatCard title="Funds Disbursed" value="$1.1M" icon="📈" />
      </div>
      <ActivityTable />
    </div>
  );
}

function AuditorDashboard() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-300 mb-6 border-b border-green-700/50 pb-2">
        Auditor Dashboard
      </h2>
      <CustomizeDashboardLink role="auditor" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Audits Pending" value="5" icon="📋" />
        <StatCard title="Audits Completed" value="11" icon="✔️" />
        <StatCard title="Reports Generated" value="6" icon="📊" />
      </div>
      <ActivityTable />
    </div>
  );
}

// --- Reusable Components ---

function StatCard({ title, value, icon }: { title: string; value: string; icon?: string }) {
  return (
    <div className="bg-gradient-to-br from-gray-800/60 to-black/60 p-6 rounded-xl text-center shadow-lg border border-green-700/30 transform hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer group">
      <div className="flex items-center justify-center mb-2 text-3xl group-hover:animate-bounce-y">
        {icon && <span className="mr-2">{icon}</span>}
        <h4 className="text-gray-300 text-lg font-medium">{title}</h4>
      </div>
      <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 group-hover:from-green-300 group-hover:to-blue-300 transition-colors duration-300">
        {value}
      </p>
    </div>
  );
}

function ActivityTable() {
  const rows = [
    { id: 1, name: "Hydrogen Plant A", status: "Approved" }, { id: 2, name: "Fuel Cell R&D", status: "Pending" }, { id: 3, name: "Electrolyzer Project", status: "Rejected" }, { id: 4, name: "Green Ammonia Synthesis", status: "Approved" }, { id: 5, name: "Hydrogen Storage Facility", status: "Pending" },
  ];
  return (
    <div className="bg-black/40 p-6 rounded-2xl shadow-inner border border-green-800/50 overflow-hidden">
      <h3 className="text-xl font-semibold mb-4 text-green-200">Recent Activity</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left border-collapse"><thead>
            <tr className="text-green-300 border-b-2 border-green-700/70">
              <th className="p-3 text-sm font-semibold">#</th>
              <th className="p-3 text-sm font-semibold">Project</th>
              <th className="p-3 text-sm font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, index) => (
              <tr key={r.id} className={`border-b border-gray-700/50 hover:bg-white/5 transition-colors duration-200 ${ index % 2 === 0 ? "bg-black/10" : "bg-black/20" }`}>
                <td className="p-3 text-gray-200">{r.id}</td>
                <td className="p-3 font-medium text-white">{r.name}</td>
                <td className={`p-3 font-semibold ${ r.status === "Approved" ? "text-green-400" : r.status === "Pending" ? "text-yellow-400" : "text-red-400" }`}>
                  {r.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}