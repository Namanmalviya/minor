import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Details() {
  const id = useLocation().state.id;
  const [details, setDetails] = useState({});
  const stats=useLocation().state.stats.datasubmissio
  console.log(stats)

//   useEffect(() => {
//     try {
//       axios
//         .post("http://localhost:5000/companydetails", { id: id })
//         .then((res) => {
//           if(res.data){
//           setDetails(res.data);}
//           else{
//             alert('no data submitted')
//           }
//         });
//       console.log(id);
//     } catch (err) {
//       console.log(err);
//     }
//   }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Page Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Company Innovation Details
      </h1>

      {/* Card */}
      <div className="bg-white rounded-xl shadow-md p-6">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <DetailCard label="Total Revenue" value={`₹ ${details.totalRevenue} Cr`} />
          <DetailCard label="New Product Revenue" value={`₹ ${details.newProductRevenue} Cr`} />
          <DetailCard label="R&D Expenditure" value={`${details.rdExpenditure}%`} />
          <DetailCard label="R&D Percentage" value={`${details.rdPercentage}%`} />

          <DetailCard label="Total Staff" value={details.totalStaff} />
          <DetailCard label="Innovation Staff" value={details.innovationStaff} />
          <DetailCard label="Training Programs" value={details.trainingPrograms} />

          <DetailCard label="New Products" value={details.newProducts} />
          <DetailCard label="Commercialized Products" value={details.commercializedProducts} />

          <DetailCard label="Patent Applications" value={details.patentApplications} />
          <DetailCard label="Patents Granted" value={details.patentsGranted} />

          <DetailCard label="Research Collaborations" value={details.researchCollaborations} />
          <DetailCard label="Industry Partnerships" value={details.industryPartnerships} />
          <DetailCard label="Academic Partnerships" value={details.academicPartnerships} />

          <DetailCard label="Publications" value={details.publicationCount} />

        </div>
      </div>
    </div>
  );
}

/* Reusable Card Component */
const DetailCard = ({ label, value }) => {
  return (
    <div className="border rounded-lg p-4 hover:shadow transition">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-xl font-semibold text-gray-800 mt-1">
        {value ?? "-"}
      </p>
    </div>
  );
};

export default Details;
