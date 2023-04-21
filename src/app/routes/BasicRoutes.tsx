import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from 'features/home';
import ProjectPage from 'features/project';
import AddProject from 'features/AddProject';
import Error from 'features/Error';
import AddWorkspace from 'features/AddWorkspace';
const BasicRoutes = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Home />} />
      <Route path={'/projects/:projectid'} element={<ProjectPage />} />
      <Route path={'/addproject'} element={<AddProject />} />
      <Route path={'/addworkspace'} element={<AddWorkspace />} />

      <Route path={'/*'} element={<Error />} />
    </Routes>
  );
};

export default BasicRoutes;
