import React, { useEffect, useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import axios from 'axios'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);


export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalCompanies: 0,
    pendingCompanies: 0,
    approvedCompanies: 0,
    totalUsers: 0,
    pendingSubmissions: 0,
    approvedSubmissions: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await axios.post("http://localhost:5000/admin");
        const data = await res.data;
        console.log(data)
        setStats(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchStats();
  }, []);

  

  return (
    <div className="min-h-screen bg-gray-100">

      {/* TOP NAVIGATION BAR */}
      <header className="bg-blue-900 text-white px-8 py-5 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-4 items-center">
          <span className="text-gray-300">Admin Panel</span>
          <div className="h-10 w-10 rounded-full bg-gray-300"></div>
        </div>
      </header>

      {/* PAGE TABS */}
      <nav className="bg-white shadow px-8 py-3 flex gap-6 border-b">
        <Tab label="Overview" active />
        <Tab label="Companies" onClick={() => navigate("/admin/companies")} />
        <Tab label="Users" onClick={() => navigate("/admin/users")} />
        <Tab label="Submissions" onClick={() => navigate("/admin/submissions")} />
      </nav>

      {/* MAIN CONTENT */}
      <main className="px-8 py-8 space-y-8">

        {/* STAT CARDS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <StatCard title="Companies" value={stats?.totalcompanies?.length}  color="blue" />
          <StatCard title="Pending" value={stats.pendingCompanies} color="yellow" />
          
          <StatCard title="Users" value={stats?.userdata?.length} color="purple" />
          <StatCard title="Pending Submissions" value={stats.pendingSubmissions} color="red" />
        </div>

        {/* CHART + STATUS ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Company Registration Trend" />
          <StatusCard stats={stats} />
        </div>

        {/* TABLE ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ActivityTable />
          <PendingApprovals onClick={() => navigate("/admin/companies?status=pending")} />
        </div>

      </main>
    </div>
  );


/* ─────────────────────────────────────────────
   SMALL UI COMPONENTS
───────────────────────────────────────────── */

function Tab({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`pb-2 border-b-2 ${
        active ? "border-blue-700 text-blue-700 font-semibold" : "border-transparent text-gray-500"
      } hover:text-blue-600 transition`}
    >
      {label}
    </button>
  );
}

function StatCard({ title, value, color }) {
    const navigate = useNavigate();

  const bgColors = {
    blue: "bg-blue-100 text-blue-800",
    yellow: "bg-yellow-100 text-yellow-800",
    green: "bg-green-100 text-green-800",
    purple: "bg-purple-100 text-purple-800",
    red: "bg-red-100 text-red-800",
    teal: "bg-teal-100 text-teal-800",
  };

  return (
    <div className="p-5 bg-white shadow rounded-lg" onClick={()=>navigate(`/${title}`,{state:{stats:stats}})}>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
      <div className={`mt-3 inline-block px-3 py-1 rounded ${bgColors[color]}`}>
        {title}
      </div>
    </div>
  );
}

function ChartCard({ title }) {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],

    datasets: [
      {
        label: "Companies",
        data: [2, 4, 8, 12, 18, 25],
        borderColor: "#2563EB",
        backgroundColor: "rgba(37, 99, 235, 0.15)",
        tension: 0.4,
        fill: true,
        pointRadius: 4,
      },
      {
        label: "Users",
        data: [5, 10, 18, 28, 40, 55],
        borderColor: "#16A34A",
        backgroundColor: "rgba(22, 163, 74, 0.15)",
        tension: 0.4,
        fill: true,
        pointRadius: 4,
      },
      {
        label: "Submissions",
        data: [1, 3, 6, 9, 15, 22],
        borderColor: "#7C3AED",
        backgroundColor: "rgba(124, 58, 237, 0.15)",
        tension: 0.4,
        fill: true,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "#E5E7EB",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="font-semibold mb-4">{title}</h3>
      <Line data={data} options={options} />
    </div>
  );
}


function StatusCard({ stats }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="font-semibold mb-4">Status Report</h3>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <StatusRow label="Total Companies" value={stats.totalCompanies} />
        
        <StatusRow label="Pending" value={stats.pendingCompanies} />
        <StatusRow label="Users" value={stats.totalUsers} />
        <StatusRow label="Pending Submissions" value={stats.pendingSubmissions} />
      </div>
    </div>
  );
}

function StatusRow({ label, value }) {
  return (
    <div className="p-3 bg-gray-50 rounded border flex justify-between">
      <span className="text-gray-600">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

function ActivityTable() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="font-semibold mb-4">Recent Activity</h3>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-600 border-b">
            <th className="pb-2">Activity</th>
            <th className="pb-2">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-2">Company ABC submitted new metrics</td>
            <td className="py-2 text-gray-500">Today</td>
          </tr>
          <tr>
            <td className="py-2">Company XYZ approved</td>
            <td className="py-2 text-gray-500">2 days ago</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function PendingApprovals({ onClick }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow flex flex-col justify-between">
      <div>
        <h3 className="font-semibold mb-3">Pending Approvals</h3>
        <p className="text-gray-600 text-sm">You have pending company approvals.</p>
      </div>

      <button
        onClick={onClick}
        className="mt-6 px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
      >
        Review Now
      </button>
    </div>
  );
}
}