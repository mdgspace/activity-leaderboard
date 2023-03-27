import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from 'features/home';
import ProjectPage from 'features/project';
import Error from 'features/Error';
const BasicRoutes = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Home />} />
      <Route path={'/projects/:projectid'} element={<ProjectPage />} />
      <Route path={'/*'} element={<Error />} />
    </Routes>
  );
};

export default BasicRoutes;