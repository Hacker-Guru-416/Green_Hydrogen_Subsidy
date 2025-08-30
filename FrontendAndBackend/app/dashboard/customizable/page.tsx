"use client";

import { useSearchParams } from "next/navigation";
import React, { useState, useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend
} from "recharts";

// --- MOCK DATA ---
const allSubsidies = [
  { id: 1, project: "Apollo Green Energy", region: "North", type: "Production", amount: 2.5, status: "Approved", date: "2025-08-15" },
  { id: 2, project: "Neptune Electrolyzers", region: "South", type: "R&D", amount: 1.2, status: "Pending", date: "2025-08-10" },
  { id: 3, project: "Project Phoenix", region: "East", type: "Infrastructure", amount: 3.0, status: "Approved", date: "2025-07-22" },
  { id: 4, project: "West Coast H2", region: "West", type: "Production", amount: 4.1, status: "Rejected", date: "2025-07-18" },
  { id: 5, project: "HydroTech Innovations", region: "North", type: "R&D", amount: 0.8, status: "Approved", date: "2025-06-30" },
  { id: 6, project: "Southern Grid H2", region: "South", type: "Infrastructure", amount: 2.8, status: "Pending", date: "2025-06-25" },
];

const pieData = [
    { name: 'Production', value: 400 },
    { name: 'Infrastructure', value: 300 },
    { name: 'R&D', value: 200 },
];
const PIE_COLORS = ['#4ade80', '#3b82f6', '#facc15'];


// --- WIDGET COMPONENTS (Unchanged) ---
const UserInfoCard = ({ role }: { role: string | null }) => (
    <div className="widget-container">
        <h3 className="widget-title">User Information</h3>
        <p className="text-gray-300">Welcome, <span className="font-bold text-green-300 capitalize">{role || 'Guest'}</span>!</p>
        <p className="mt-2 text-sm text-gray-400">Here's your personalized overview of the Green Hydrogen subsidy landscape.</p>
    </div>
);

const SubsidyStatsChart = ({ data }: { data: typeof allSubsidies }) => (
    <div className="widget-container">
        <h3 className="widget-title">Subsidy Amounts by Region ($M)</h3>
        <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                <XAxis dataKey="region" stroke="#a0aec0" fontSize={12} />
                <YAxis stroke="#a0aec0" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderColor: '#4ade80' }} />
                <Bar dataKey="amount" fill="#4ade80" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    </div>
);

const SubsidyDistributionPieChart = () => (
    <div className="widget-container">
        <h3 className="widget-title">Subsidy Distribution by Type</h3>
         <ResponsiveContainer width="100%" height={250}>
            <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" nameKey="name" label={(entry) => entry.name}>
                    {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    </div>
);

const SubsidyActivityTable = ({ data }: { data: typeof allSubsidies }) => (
    <div className="widget-container col-span-1 md:col-span-2">
        <h3 className="widget-title">Detailed Subsidy Records</h3>
        <div className="overflow-x-auto">
            <table className="min-w-full text-left">
                <thead>
                    <tr className="text-green-300 border-b-2 border-green-700/70">
                        <th className="p-3 text-sm font-semibold">Project</th>
                        <th className="p-3 text-sm font-semibold">Region</th>
                        <th className="p-3 text-sm font-semibold">Amount ($M)</th>
                        <th className="p-3 text-sm font-semibold">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row.id} className="border-b border-gray-700/50 hover:bg-white/5">
                            <td className="p-3 font-medium text-white">{row.project}</td>
                            <td className="p-3 text-gray-200">{row.region}</td>
                            <td className="p-3 text-gray-200">{row.amount.toFixed(1)}</td>
                            <td className={`p-3 font-semibold ${row.status === "Approved" ? "text-green-400" : row.status === "Pending" ? "text-yellow-400" : "text-red-400"}`}>
                                {row.status}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);


// --- MAIN DASHBOARD PAGE ---
export default function CustomizableDashboardPage() {
    const searchParams = useSearchParams();
    const role = searchParams.get("role");

    // ✨ CHANGE #1: Define all possible widgets with their types and titles.
    const allAvailableWidgets = [
        { id: 'userInfo', type: 'UserInfo', title: "User Info" },
        { id: 'subsidyChart', type: 'SubsidyChart', title: "Subsidy Chart" },
        { id: 'subsidyPieChart', type: 'SubsidyPieChart', title: "Distribution Pie Chart"},
        { id: 'subsidyTable', type: 'SubsidyTable', title: "Subsidy Table" },
    ];
    
    // ✨ CHANGE #2: State now only stores the widget's data (id and type), not the component itself.
    const [widgets, setWidgets] = useState(allAvailableWidgets);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");

    const filteredData = useMemo(() => {
        return allSubsidies.filter(item => {
            const matchesSearch = item.project.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
            return matchesSearch && matchesStatus;
        });
    }, [searchTerm, filterStatus]);
    
    const addWidget = (widgetId: string) => {
        if (widgets.find(w => w.id === widgetId)) return;
        const widgetToAdd = allAvailableWidgets.find(w => w.id === widgetId);
        if (widgetToAdd) {
            setWidgets([...widgets, widgetToAdd]);
        }
    };

    const removeWidget = (widgetId: string) => {
        setWidgets(widgets.filter(widget => widget.id !== widgetId));
    };
    
    // ✨ CHANGE #3: A function to render the correct component based on the widget's type.
    const renderWidget = (widget: { id: string; type: string; title: string }) => {
        switch (widget.type) {
            case 'UserInfo':
                return <UserInfoCard role={role} />;
            case 'SubsidyChart':
                return <SubsidyStatsChart data={filteredData} />;
            case 'SubsidyPieChart':
                return <SubsidyDistributionPieChart />;
            case 'SubsidyTable':
                return <SubsidyActivityTable data={filteredData} />;
            default:
                return null;
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-950 text-white p-4 md:p-8 font-sans">
            <header className="flex flex-col md:flex-row justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-green-300 mb-4 md:mb-0">Customizable Dashboard</h1>
                 <a href="/login" className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors text-sm font-medium">Logout</a>
            </header>

            {/* --- CONTROLS: FILTER, SEARCH, ADD WIDGET --- */}
            <div className="bg-black/30 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-green-700/50 mb-8 flex flex-col md:flex-row gap-4 items-center">
                <input
                    type="text"
                    placeholder="Search by project name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-2 w-full md:w-1/3 text-white focus:ring-2 focus:ring-green-400 focus:outline-none"
                />
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-2 w-full md:w-auto text-white focus:ring-2 focus:ring-green-400 focus:outline-none"
                >
                    <option value="all">All Statuses</option>
                    <option value="Approved">Approved</option>
                    <option value="Pending">Pending</option>
                    <option value="Rejected">Rejected</option>
                </select>

                <div className="relative ml-auto">
                     <select 
                        onChange={(e) => addWidget(e.target.value)}
                        className="bg-green-600 hover:bg-green-700 rounded-lg px-4 py-2 w-full md:w-auto text-white focus:ring-2 focus:ring-green-400 focus:outline-none appearance-none font-semibold"
                        value=""
                    >
                        <option value="" disabled>+ Add Widget</option>
                        {allAvailableWidgets.filter(aw => !widgets.find(w => w.id === aw.id)).map(widget => (
                            <option key={widget.id} value={widget.id}>{widget.title}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* --- WIDGET GRID --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {/* ✨ CHANGE #4: The rendering logic is now cleaner. */}
                {widgets.map(widget => (
                    <div key={widget.id} className="relative group">
                         <button
                            onClick={() => removeWidget(widget.id)}
                            className="absolute top-3 right-3 z-10 bg-red-600 text-white rounded-full h-6 w-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Remove widget"
                        >
                            &times;
                        </button>
                        {renderWidget(widget)}
                    </div>
                ))}
                {widgets.length === 0 && (
                    <div className="col-span-full text-center py-12 bg-black/20 rounded-xl">
                        <h3 className="text-xl text-gray-400">Your dashboard is empty.</h3>
                        <p>Use the "+ Add Widget" button to add some data.</p>
                    </div>
                )}
            </div>
        </div>
    );
}