import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams,useLocation } from "react-router-dom";

export default function CompaniesList() {
  const navigate = useNavigate();
  const c=useLocation().state.stats.totalcompanies
 
  const [searchParams] = useSearchParams();
  const statusFilter = searchParams.get("status") || "all";

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCompanies() {
      try {
        // const url =
        //   statusFilter === "all"
        //     ? "http://localhost:5000/admin/companies"
        //     : `http://localhost:5000/admin/companies?status=${statusFilter}`;

        // const res = await fetch(url, {
        //   headers: { "x-admin": "1" }
        // });
        // const data = await res.json();
        setCompanies(c);
       console.log(c)
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }
    fetchCompanies();
  }, );
 // console.log(companies)
const id=c.id
//console.log(c._id)
  return (
    <div className="min-h-screen bg-gray-100 px-8 py-6">

      {/* PAGE HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Companies</h1>
          <p className="text-gray-600 text-sm">
            Review and manage registered companies
          </p>
        </div>
      </div>

      {/* FILTER TABS */}
      <div className="flex gap-3 mb-6">
        <FilterTab label="All" active={statusFilter === "all"} onClick={() => navigate("/admin/companies")} />
        <FilterTab label="Pending" active={statusFilter === "pending"} onClick={() => navigate("/admin/companies?status=pending")} />
        <FilterTab label="Approved" active={statusFilter === "approved"} onClick={() => navigate("/admin/companies?status=approved")} />
        <FilterTab label="Rejected" active={statusFilter === "rejected"} onClick={() => navigate("/admin/companies?status=rejected")} />
      </div>

      {/* TABLE */}
     <div className="bg-white rounded-lg shadow overflow-x-auto">
  {loading ? (
    <div className="p-6 text-gray-500">Loading companies...</div>
  ) : companies.length === 0 ? (
    <div className="p-6 text-gray-500">No companies found</div>
  ) : (
    <table className="w-full text-sm">
      <thead className="bg-gray-50 border-b">
        <tr className="text-gray-600 whitespace-nowrap">
          <th className="px-4 py-3 text-left">Company</th>
          <th className="px-4 py-3 text-left">Type</th>
          <th className="px-4 py-3 text-left">Size</th>
          <th className="px-4 py-3 text-left">Industry</th>
          <th className="px-4 py-3 text-left">Country</th>
          <th className="px-4 py-3 text-left">Reg. No</th>
          <th className="px-4 py-3 text-left">Website</th>
          <th className="px-4 py-3 text-right">Action</th>
        </tr>
      </thead>

      <tbody>
        {companies.map((c) => (
          <tr
            key={c._id}
            className="border-b hover:bg-gray-50 transition"
          >
            {/* Company */}
            <td className="px-4 py-3">
              <div className="font-medium">{c.companyName}</div>
              <div className="text-xs text-gray-500">{c.email}</div>
            </td>

            {/* Type */}
            <td className="px-4 py-3">{c.companyType || "-"}</td>

            {/* Size */}
            <td className="px-4 py-3">{c.companySize || "-"}</td>

            {/* Industry */}
            <td className="px-4 py-3">{c.industry}</td>

            {/* Country */}
            <td className="px-4 py-3">{c.country}</td>

            {/* Registration Number */}
            <td className="px-4 py-3 font-mono text-xs">
              {c.registrationNumber || "-"}
            </td>

            {/* Website */}
            <td className="px-4 py-3">
              {c.website ? (
                <a
                  href={c.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline text-xs"
                >
                  Visit
                </a>
              ) : (
                "-"
              )}
            </td>

            {/* Action */}
            <td className="px-4 py-3 text-right">
              <button
                onClick={() =>
                  navigate("/companies/details", {
                    state: { id: c._id },
                  })
                }
                className="px-4 py-1.5 bg-blue-700 text-white rounded hover:bg-blue-800"
              >
                Review
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>

    </div>
  );
}

/* ───────────────────────── */

function FilterTab({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md border text-sm font-medium transition
        ${
          active
            ? "bg-blue-700 text-white border-blue-700"
            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
        }`}
    >
      {label}
    </button>
  );
}

function StatusBadge({ status }) {
  const styles = {
    pending: "bg-yellow-100 text-yellow-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700"
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status] || "bg-gray-200"}`}
    >
      {status}
    </span>
  );
}
