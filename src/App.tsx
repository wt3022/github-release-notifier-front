import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ProjectList from "./pages/Projects/ProjectList";
import ProjectDetail from "./pages/Projects/ProjectDetail";
import ProjectCreate from "./pages/Projects/ProjectCreate";
import ProjectUpdate from "./pages/Projects/ProjectUpdate";
import RepositoryCreate from "./pages/Repositories/RepositoryCreate";
import RepositoryDetail from "./pages/Repositories/RepositoryDetail";
import { Location } from "./types/location";

const App: React.FC = () => {
  const [locationList, setLocationList] = useState<Location[]>([]);

  return (
    <Router>
      <Layout locationList={locationList}>
        <Routes>
          <Route
            path="/"
            element={<ProjectList setLocationList={setLocationList} />}
          />
          <Route
            path="/projects/"
            element={<ProjectList setLocationList={setLocationList} />}
          />
          <Route
            path="/projects/:projectId"
            element={<ProjectDetail setLocationList={setLocationList} />}
          />
          <Route
            path="/projects/create"
            element={<ProjectCreate setLocationList={setLocationList} />}
          />
          <Route
            path="/projects/update/:projectId"
            element={<ProjectUpdate setLocationList={setLocationList} />}
          />
          <Route
            path="/repositories/create"
            element={<RepositoryCreate setLocationList={setLocationList} />}
          />
          <Route
            path="/repositories/:repositoryId"
            element={<RepositoryDetail setLocationList={setLocationList} />}
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
