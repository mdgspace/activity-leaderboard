import React, { useContext, useEffect, useState } from 'react';
import SearchBar from 'app/components/search';
import TimeRangeSwitch from 'app/components/timeRangeSwitch';
import ProjectCardCont from './components/projectCardContainer';
import LeaderBoard from './components/leaderboard';
import './index.scss';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getUser } from 'app/api/user';
import toast from 'react-hot-toast';
import { Query, useQuery } from 'react-query';
import { getAllOrgs, getOrgProjects } from 'app/api/organization';
import {
  getOrgGithubData,
  getOrgRank,
  getProjectGithubData,
} from 'app/api/githubData';
import { Projects } from 'app/api/organization';
import { ProjectsGithubData } from 'app/api/githubData';
import { Contributors } from 'app/api/githubData';
import loader from '../../app/assets/gifs/loader.gif';
import UserContext from 'app/context/user/userContext';

const Workspace = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userContext = useContext(UserContext);
  const [weekly, setWeekly] = useState<boolean>(true);
  const [orgProjects, setOrgProjects] = useState<Projects | null>(null);
  const [archives, setArcheives] = useState<boolean>(false);
  const [monthlyOrgRank, setMonthlyOrgRank] = useState<Contributors | null>(
    null
  );
  const [weeklyOrgRank, setWeeklyOrgRank] = useState<Contributors | null>(null);
  const [monthlyOrgProjectsData, setMOnthyOrgProjectsData] =
    useState<ProjectsGithubData | null>(null);
  const [weeklyOrgProjectsData, setWeeklyOrgProjectsData] =
    useState<ProjectsGithubData | null>(null);
  const { spaceName } = useParams();

  const fetchOrgProjects = async () => {
    if (token && spaceName) {
      const orgProjects = await getOrgProjects(token, spaceName);
      setOrgProjects(orgProjects.data.projects);
    }
  };

  const fetchWeeklyData = async () => {
    if (token && spaceName) {
      const weeklyOrgRank = await getOrgRank(token, spaceName, true);
      const weeklyOrgProjectsData = await getOrgGithubData(
        token,
        spaceName,
        false
      );

      setWeeklyOrgProjectsData(weeklyOrgProjectsData.data.projects);
      setWeeklyOrgRank(weeklyOrgRank.data.contributors);
    }
  };

  const fetchMonthlyData = async () => {
    if (token && spaceName) {
      const monthlyOrgRank = await getOrgRank(token, spaceName, true);
      const monthlyOrgProjectsData = await getOrgGithubData(
        token,
        spaceName,
        true
      );
      setMonthlyOrgRank(monthlyOrgRank.data.contributors);
      setMOnthyOrgProjectsData(monthlyOrgProjectsData.data.projects);
    }
  };

  const { error, isLoading } = useQuery('orgProjects', fetchOrgProjects, {
    enabled: true,
    staleTime: Infinity,
  });

  if (error) {
    navigate('/');
  }

  const {} = useQuery('weeklyData', fetchWeeklyData, {
    enabled: true,
    staleTime: Infinity,
  });

  const {} = useQuery('monthlyData', fetchMonthlyData, {
    enabled: true,
    staleTime: Infinity,
  });

  return (
    <>
      <div className='home-header'>
        <SearchBar />

        <button onClick={() => setArcheives(!archives)}>Archives</button>
        {spaceName &&
          (userContext?.userOrgs?.userOrgs[spaceName].role == 'admin' ||
            userContext?.userOrgs?.userOrgs[spaceName].role == 'manager') && (
            <button onClick={() => navigate(`/addProject/${spaceName}`)}>
              Add Project
            </button>
          )}

        <TimeRangeSwitch weekly={weekly} setWeekly={setWeekly} />
      </div>
      {isLoading ? (
        <div className='loader-container'>
          <img className='loading' src={loader} />
        </div>
      ) : (
        <div className='home-main-cont'>
          {spaceName && (
            <ProjectCardCont
              archives={archives}
              weekly={weekly}
              orgName={spaceName}
              orgProjects={orgProjects}
              monthlyOrgProjectsData={monthlyOrgProjectsData}
              weeklyOrgProjectsData={weeklyOrgProjectsData}
            />
          )}
          <LeaderBoard
            weekly={weekly}
            weeklyOrgRank={weeklyOrgRank}
            monthlyOrgRank={monthlyOrgRank}
          />
        </div>
      )}
    </>
  );
};

export default Workspace;