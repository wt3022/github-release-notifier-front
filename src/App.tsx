import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ProjectList from "./pages/Projects/ProjectList";
import ProjectDetail from "./pages/Projects/ProjectDetail";
import ProjectCreate from "./pages/Projects/ProjectCreate";
import ProjectUpdate from "./pages/Projects/ProjectUpdate";

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<ProjectList />} />
          <Route path="/projects/" element={<ProjectList />} />
          <Route path="/projects/:projectId" element={<ProjectDetail />} />
          <Route path="/projects/create" element={<ProjectCreate />} />
          <Route
            path="/projects/update/:projectId"
            element={<ProjectUpdate />}
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
