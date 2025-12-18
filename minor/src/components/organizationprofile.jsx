import React from "react";
import company from "./companydata.json";
import { useNavigate } from "react-router-dom";
import Header from "./ui/Header";
import logo from "./ui/companylogo.jpg"

export default function CompanyProfile() {
const Navigate=useNavigate();
const logout=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem('company')
    Navigate('/login');
}


  if (!company) return <div className="p-6">Loading...</div>;



  return (
    <div>
        <Header />
    <div className="p-6 max-w-5xl mx-auto space-y-8">

      {/* HEADER SECTION */}
      <div className="flex items-center gap-4 mt-20">
        <img
          src={logo}
          alt="Logo"
          className="h-20 w-20 rounded-full border object-cover"
        />

        <div>
          <h1 className="text-3xl font-bold">{company.name}</h1>
          <p className="text-gray-600">{company.tagline}</p>

          <span className="mt-2 inline-block px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">
            {company.status || "Active"}
          </span>
        </div>
<div>
        <button className="bg-red-500 h-10 w-20 rounded-lg text-white font-bold ml-96" onClick={logout}>logout</button>
      </div>

      </div>

      <hr className="border-gray-200" />

      {/* OVERVIEW */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Company Overview</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <Info label="Industry" value={company.industry} />
          <Info label="Founded" value={company.founded} />
          <Info label="Company Size" value={company.size} />
          <Info label="Registration No." value={company.registrationNo} />
          <Info label="Ownership" value={company.type} />
          <Info label="Headquarters" value={company.location} />
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-3">About</h2>
        <p className="text-gray-700 leading-relaxed">{company.description}</p>
      </section>

      {/* CONTACT */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Contact Information</h2>

        <div className="space-y-2 text-sm">
          <ContactRow label="Email" value={company.email} />
          <ContactRow label="Phone" value={company.phone} />
          <ContactRow label="Website" value={company.website} />
          <ContactRow label="Address" value={company.address} />
        </div>
      </section>

      {/* METRIC CARDS */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard label="Employees" value={company.metrics?.employees} />
        <MetricCard label="Projects" value={company.metrics?.projects} />
        <MetricCard label="Patents" value={company.metrics?.patents} />
        <MetricCard label="Revenue" value={company.metrics?.revenue} />
      </section>

      {/* PRODUCTS */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Products / Services</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {company.products?.map((p, i) => (
            <div key={i} className="border p-4 rounded-lg">
              <h3 className="font-semibold">{p.name}</h3>
              <p className="text-gray-600 text-sm mt-1">{p.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Leadership Team</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {company.team?.map((member, i) => (
            <div key={i} className="flex items-center gap-3 p-3 border rounded-lg">
              <img
                src={member.photo}
                className="h-12 w-12 rounded-full object-cover"
                alt={member.name}
              />

              <div>
                <p className="font-semibold">{member.name}</p>
                <p className="text-gray-600 text-sm">{member.position}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DOCUMENTS */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Documents</h2>

        <div className="space-y-3">
          {company.documents?.map((doc, i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
              <span>{doc.name}</span>
              <a
                href={doc.url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline text-sm"
              >
                View
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* TIMELINE */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Company Timeline</h2>

        <div className="space-y-4">
          {company.timeline?.map((item, i) => (
            <div key={i} className="border-l-4 border-blue-500 pl-4">
              <p className="font-semibold">{item.year}</p>
              <p className="text-gray-700 text-sm">{item.event}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
    </div>
  );
}

// ------------------- SMALL COMPONENTS -------------------

function Info({ label, value }) {
  return (
    <div>
      <p className="text-gray-500 text-xs">{label}</p>
      <p className="font-medium">{value || "—"}</p>
    </div>
  );
}

function ContactRow({ label, value }) {
  return (
    <p className="text-gray-700">
      <span className="font-semibold">{label}: </span>{value}
    </p>
  );
}

function MetricCard({ label, value }) {
  return (
    <div className="bg-white shadow p-4 rounded-lg text-center">
      <p className="text-gray-500 text-sm">{label}</p>
      <h2 className="text-2xl font-bold mt-1">{value ?? "—"}</h2>
    </div>
  );
}
