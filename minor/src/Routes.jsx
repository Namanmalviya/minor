import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrBoundary";
import NotFound from "./pages/NotFound";
import ResearcherDashboard from './pages/researcher-dashboard';
import BenchmarkingComparison from './pages/benchmarking-comparison';
import KnowledgeRepository from './pages/knowledge-repository';
import OrganizationDashboard from './pages/organization-dashboard';
import AnalyticsVisualization from './pages/analytics-visualization';
import DataSubmission from './pages/data-submission';
import Login from './pages/login register/login'
import Signup from './pages/login register/signup'
import Register from './pages/login register/register'
import Home from './userdashboard/Home'
import Research from './userdashboard/Researchinfo'
import Innovation from './userdashboard/Innovationinfo'
import Organizationprofile from './components/organizationprofile'
import AdminDashboard from "./admin/admindashboard";
import Approve from "./admin/approve";
import Users from "./admin/users";
// import AdminDashboard from "./admin/admindashboard";
 import  Companydetails from "./admin/company-details";
import Companylist from "./admin/companylist";
const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<OrganizationDashboard />} />
        <Route path="/researcher-dashboard" element={<ResearcherDashboard />} />
        <Route path="/benchmarking-comparison" element={<BenchmarkingComparison />} />
        <Route path="/knowledge-repository" element={<KnowledgeRepository />} />
        <Route path="/organization-dashboard" element={<OrganizationDashboard />} />
        <Route path="/analytics-visualization" element={<AnalyticsVisualization />} />
        <Route path="/data-submission" element={<DataSubmission />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/research" element={<Research />} />
        <Route path="/innovationinfo" element={<Innovation />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/Companies" element={<Companylist />} />
        <Route path="/organizationprofile" element={<Organizationprofile />} />
        <Route path="/Companies/details" element={<Companydetails />} />
        <Route path="/Approved_Submissions" element={<Approve />} />
        <Route path="/Users" element={<Users />} />
       
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
