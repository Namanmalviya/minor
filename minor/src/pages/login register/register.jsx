import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      return alert("Passwords do not match");
    }

    if (!document) {
      return alert("Please upload verification document (PDF)");
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("companyName", companyName);
      formData.append("industry", industry);
      formData.append("companySize", companySize);
      formData.append("companyType", companyType);
      formData.append("registrationNumber", registrationNumber);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("website", website);
      formData.append("country", country);
      formData.append("document", document);

      const response = await axios.post(
        "http://localhost:5000/Register",{companyName,
          industry,
          companySize,
          
          companyType,
          registrationNumber,
          email,
          password,
          website,
          country},
       
      );
console.log(formData)
      if (response.status === 201) {
        navigate("/Login");
      }
    } catch (err) {
      if (err.response?.status === 400) {
        alert("Company already registered");
      } else {
        console.error(err);
        alert("Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-black">
      <form
        onSubmit={submit}
        className="w-full max-w-2xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 text-white space-y-6 shadow-2xl"
      >
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold">Company Registration</h1>
          <p className="text-gray-300 mt-1">
            Register your organization for innovation assessment
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Company Name" value={companyName} onChange={setCompanyName} />
          <Input label="Industry" value={industry} onChange={setIndustry} />
          <Select label="Company Size" value={companySize} onChange={setCompanySize}
            options={["1-10", "11-50", "51-200", "201-500", "500+"]}
          />
          <Select label="Company Type" value={companyType} onChange={setCompanyType}
            options={["Innovation", "Startup", "Research"]}
          />
          <Input label="Registration Number" value={registrationNumber} onChange={setRegistrationNumber} />
          <Input label="Official Email" type="email" value={email} onChange={setEmail} />
          <Input label="Website (optional)" type="url" value={website} onChange={setWebsite} />
          <Input label="Country" value={country} onChange={setCountry} />
          <Input label="Password" type="password" value={password} onChange={setPassword} />
          <Input label="Confirm Password" type="password" value={confirm} onChange={setConfirm} />
        </div>

        {/* Document Upload */}
        <div>
          <label className="block text-sm mb-2 text-gray-300">
            Verification Document (PDF)
          </label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setDocument(e.target.files[0])}
            className="block w-full text-sm
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:bg-indigo-600 file:text-white
              hover:file:bg-indigo-700"
          />
          {document && (
            <p className="text-sm text-gray-300 mt-1">
              Selected: <span className="font-medium">{document.name}</span>
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 transition py-2 rounded-lg font-bold disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register Company"}
        </button>

        <p className="text-center text-sm text-gray-300">
          Already registered?{" "}
          <button
            type="button"
            onClick={() => navigate("/Login")}
            className="text-indigo-400 hover:underline font-medium"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
}

/* Reusable Inputs */
const Input = ({ label, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-sm mb-1 text-gray-300">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 rounded-lg bg-white/90 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      required={label !== "Website (optional)"}
    />
  </div>
);

const Select = ({ label, value, onChange, options }) => (
  <div>
    <label className="block text-sm mb-1 text-gray-300">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 rounded-lg bg-white/90 text-gray-900"
      required
    >
      <option value="">Select</option>
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  </div>
);

export default Register;
