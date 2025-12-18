import React, { useState, useEffect, use } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import MetricCard from './components/MetricCard';
import ExcellenceScoreCard from './components/ExcellenceScoreCard';
import SubmissionTracker from './components/SubmissionTracker';
import QuickActions from './components/QuickActions';
import MetricsChart from './components/MetricsChart';
import axios from 'axios'

const OrganizationDashboard = () => {
  const navigate = useNavigate();
  const [companyinfo,setCompanyinfo]=useState({companysubmission:{}})
  const company = JSON.parse(localStorage.getItem('company'))
  const token = localStorage.getItem('token')
console.log(company)

if (!company) {
    alert("Please login first");
    navigate("/login"); // or your login route
    return;
  

}

  const id=company.companyid
const organizationData = {
    name: company.companyName,
    sector: company.companyType,
    region: company.country,
    establishedYear: 2015
  
 }
console.log(token)
console.log(id)
console.log(company.companyType)

function normalize(value, min, max) {
  // safety checks
  if (value === undefined || value === null) return 0;
  if (isNaN(value)) return 0;

  // clamp
  if (value <= min) return 0;
  if (value >= max) return 1;

  // scale to 0–1
  return (value - min) / (max - min);
}


useEffect(()=>{
  const response=axios.post(`http://localhost:5000/`,{id:id})
.then((response)=>{
  console.log(response)
  setCompanyinfo(response.data)
})},[])

console.log(companyinfo.companysubmission)
  const [currentLanguage, setCurrentLanguage] = useState('en');

  
  // Mock data for organization metrics
  

  const cs = companyinfo?.companysubmission ?? {
  rdPercentage: 0,
  rdExpenditure: 0,
  patentApplications: 0,
  patentsGranted: 0,
  newProducts: 0,
  prototypesBuilt: 0,
  innovationStaff: 0,
  totalStaff: 1, // to avoid division by zero
  trainingPrograms: 0,
  researchCollaborations: 0,
  academicPartnerships: 0,
  innovationAwards: 0,
  commercializedProducts: 0,
  newProductRevenue: 0
};


  const  rdScore =
   normalize(cs.rdPercentage, 0, 20) * 0.6 +
   normalize(cs.rdExpenditure, 0, 10_000_000) * 0.4
 console.log(rdScore)
  const innovationScore =
  normalize(cs.patentsGranted, 0, 20) * 0.5 +
  normalize(cs.newProducts, 0, 10) * 0.3 +
  normalize(cs.prototypesBuilt, 0, 15) * 0.2

  const peopleScore =
  normalize(cs.innovationStaff / cs.totalStaff, 0, 0.4) * 0.6 +
  normalize(cs.trainingPrograms, 0, 10) * 0.4

  const ecosystemScore =
  normalize(cs.researchCollaborations, 0, 15) * 0.5 +
  normalize(cs.academicPartnerships, 0, 10) * 0.5

  const impactScore =
  normalize(cs.innovationAwards, 0, 10) * 0.6 +
  normalize(cs.commercializedProducts, 0, 10) * 0.4

  const Score =
  rdScore * 25 +
  innovationScore * 30 +
  peopleScore * 20 +
  ecosystemScore * 15 +
  impactScore * 10;

  console.log('Final Innovation Excellence Score:', Math.round(Score));


  

  const excellenceScore = {
   score:  Math.round(Score),
    trend: 5.2,
    ranking: 15,
    totalOrganizations: 247,
    trendData: [
      { month: 'Jun', score: 72 },
      { month: 'Jul', score: 74 },
      { month: 'Aug', score: 73 },
      { month: 'Sep', score: 76 },
      { month: 'Oct', score: 77 },
      { month: 'Nov', score: 78 }
    ]
  };

  // Safe fallback: always at least an empty object


  function delta(current = 0, previous = 0, unit = "") {
  const diff = current - previous;
  return `${diff >= 0 ? "+" : ""}${diff}${unit}`;
}
function percentProgress(value = 0, target = 1) {
  if (!target || isNaN(value)) return 0;
  return Math.min(100, Math.round((value / target) * 100));
}


const metrics = [
  {
    title: "R&D Investment",
   value: cs?.rdPercentage != null ? cs.rdPercentage.toFixed(1) : "0.0",

    unit: "%",
    change: delta(cs.rdPercentage, cs.prevRdPercentage ?? 0, "%"),
    changeType: cs.rdPercentage >= (cs.prevRdPercentage ?? 0) ? "positive" : "negative",
    icon: "FlaskConical",
    target: "15%",
    progress: percentProgress(cs.rdPercentage, 15)
  },
  {
    title: "Patents Filed",
    value: cs.patentApplications,
    unit: "this year",
    change: delta(cs.patentApplications, cs.prevPatentApplications ?? 0),
    changeType: "positive",
    icon: "FileText",
    target: "30",
    progress: percentProgress(cs.patentApplications, 30)
  },
  {
    title: "Innovation Staff",
    value: cs.innovationStaff,
    unit: "employees",
    change: delta(cs.innovationStaff, cs.prevInnovationStaff ?? 0),
    changeType: "positive",
    icon: "Users",
    target: "180",
    progress: percentProgress(cs.innovationStaff, 180)
  },
  {
    title: "Collaboration Projects",
    value: cs.researchCollaborations,
    unit: "active",
    change: delta(cs.researchCollaborations, cs.prevCollaborations ?? 0),
    changeType: "positive",
    icon: "Handshake",
    target: "10",
    progress: percentProgress(cs.researchCollaborations, 10)
  },
  {
    title: "Revenue from Innovation",
    value: `$${(cs.newProductRevenue / 1_000_00).toFixed(1)}L`,
    unit: "",
    change: "+15.3%", // typically YoY from backend
    changeType: "positive",
    icon: "DollarSign",
    target: "$3M",
    progress: percentProgress(cs.newProductRevenue, 3_000_000)
  },
  {
    title: "Training Programs",
    value: cs.trainingPrograms,
    unit: "completed",
    change: delta(cs.trainingPrograms, cs.prevTrainingPrograms ?? 0),
    changeType: "positive",
    icon: "GraduationCap",
    target: "24",
    progress: percentProgress(cs.trainingPrograms, 24)
  }
];


  const submissions = [
    {
      id: 1,
      title: "Q4 R&D Metrics",
      dueDate: "Nov 15, 2024",
      status: "pending",
      category: "R&D"
    },
    {
      id: 2,
      title: "Innovation Output Report",
      dueDate: "Nov 20, 2024",
      status: "pending",
      category: "Output"
    },
    {
      id: 3,
      title: "Financial Indicators",
      dueDate: "Nov 10, 2024",
      status: "overdue",
      category: "Financial"
    },
    {
      id: 4,
      title: "Q3 Human Capital Data",
      submittedDate: "Oct 28, 2024",
      status: "completed",
      validationStatus: "Approved",
      category: "Human Capital"
    },
    {
      id: 5,
      title: "Ecosystem Metrics",
      submittedDate: "Oct 25, 2024",
      status: "completed",
      validationStatus: "Under Review",
      category: "Ecosystem"
    },
    {
      id: 6,
      title: "Patent Portfolio Update",
      submittedDate: "Oct 22, 2024",
      status: "completed",
      validationStatus: "Approved",
      category: "IP"
    }
  ];

  const notifications = [
    {
      id: 1,
      title: "Submission Deadline Approaching",
      message: "Q4 R&D Metrics due in 11 days",
      time: "2 hours ago",
      type: "deadline",
      unread: true
    },
    {
      id: 2,
      title: "Milestone Achievement",
      message: "Congratulations! You\'ve reached 80% of your patent filing target",
      time: "1 day ago",
      type: "milestone",
      unread: true
    },
    {
      id: 3,
      title: "Benchmark Report Available",
      message: "Your sector comparison report is ready for review",
      time: "2 days ago",
      type: "info",
      unread: false
    },
    {
      id: 4,
      title: "Data Validation Complete",
      message: "Your Q3 Human Capital submission has been approved",
      time: "3 days ago",
      type: "info",
      unread: false
    }
  ];

  const chartData = [
    { month: 'Jun', value: 72 },
    { month: 'Jul', value: 74 },
    { month: 'Aug', value: 73 },
    { month: 'Sep', value: 76 },
    { month: 'Oct', value: 77 },
    { month: 'Nov', value: 78 }
  ];

  const rdChartData = [
    { month: 'Jun', value: 10.2 },
    { month: 'Jul', value: 11.1 },
    { month: 'Aug', value: 10.8 },
    { month: 'Sep', value: 11.9 },
    { month: 'Oct', value: 12.1 },
    { month: 'Nov', value: 12.5 }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const handleSubmitData = () => {
    navigate('/data-submission');
  };

  return (
    <div className="min-h-screen bg-background">
      <p className=''>hello</p>
      <Header companyname={company.companyName} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Welcome back, {organizationData?.name}
                </h1>
                <p className="text-muted-foreground">
                  Track your innovation performance and manage data submissions
                </p>
              </div>
              <div className="text-right">
                {/* <p className="text-sm text-muted-foreground">Last updated</p>
                <p className="text-sm font-medium text-foreground"></p> */}
              </div>
            </div>
          </div>

          {/* Excellence Score Section */}
          <div className="mb-8">
            <ExcellenceScoreCard 
              score={excellenceScore?.score}
              trend={excellenceScore?.trend}
              ranking={excellenceScore?.ranking}
              innovationScore={innovationScore}
              peopleScore={peopleScore}
              ecosystemScore={ecosystemScore}
              totalOrganizations={excellenceScore?.totalOrganizations}
              trendData={excellenceScore?.trendData}
            />
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {metrics?.map((metric, index) => (
              <MetricCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                unit={metric?.unit}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                target={metric?.target}
                progress={metric?.progress}
              />
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <MetricsChart 
              data={chartData}
              title="Innovation Excellence Trend"
              type="line"
            />
            <MetricsChart 
              data={rdChartData}
              title="R&D Investment Percentage"
              type="bar"
            />
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Submission Tracker */}
            <div className="lg:col-span-2">
              <SubmissionTracker 
                submissions={submissions}
                onSubmitData={handleSubmitData}
              />
            </div>

            {/* Quick Actions & Notifications */}
            <div>
              <QuickActions notifications={notifications} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrganizationDashboard;