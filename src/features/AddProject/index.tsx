import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import './index.scss';
import tick from '../../app/assets/images/tick.png';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { addProject } from 'app/api/project';
import {  Projects, getOrgProjects } from 'app/api/organization';


const AddProject = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { spaceName } = useParams();
  const [name, setName] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [link, setLink] = useState<string | null>(null);

  const [orgProject, setOrgProjects] = useState<Projects | null>(null);

  const fetchData = async () => {
    if (token && spaceName) {
      try {
        const res = await getOrgProjects(token, spaceName);
        setOrgProjects(res.data.projects);
      } catch (e) {}
    }
  };

  useEffect(() => {
    fetchData();
  }, [spaceName]);

  const linkChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setLink(event.target.value);
  };

  const nameChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  function isGitHubRepositoryLink(link: string): boolean {
    // Define a regular expression pattern for a GitHub repository URL
    const githubRepoPattern =
      /^https:\/\/github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+(\.git)?$/;

    // Check if the provided link matches the pattern
    return githubRepoPattern.test(link);
  }

  function isValidName(input: string): boolean {
    // Regular expression to match only alphanumeric characters, hyphens, and underscores
    const regex = /^[a-zA-Z0-9-_]+$/;

    // Test if the input string matches the regular expression
    return regex.test(input);
  }

  const isUnique = (name: string) => {
    if (orgProject && name in orgProject) {
      return false;
    }
    return true;
  };

  const SubmitHandler = async () => {
    if (
      spaceName &&
      token &&
      name &&
      link &&
      isValidName(name) &&
      isGitHubRepositoryLink(link) &&
      description &&
      description?.length < 200
    ) {
      const func = async () => {
        const res = await addProject(token, spaceName, {
          name: name,
          description: description,
          link: link,
        });
        navigate(`/workspace/${spaceName}`);
      };
      toast.promise(func(), {
        loading: 'Saving Project',
        success: <b>Project saved</b>,
        error: <b>Could not save</b>,
      });
    } else {
      toast.error('Invalid inputs');
    }
  };

  return (
    <div>
      <div className='add-project-container'>
        <form className='add-project-form'>
          <div className='input-title'>Name</div>
          <input
            type='text'
            placeholder='Project name'
            onChange={nameChange}
            value={name ? name : ''}
          />
          {!name ? 'Name feild should not be empty' : <></>}
          {name && !isValidName(name) && 'Not a valid name'}
          {name && !isUnique(name) && 'This project name already exists'}
          <div className='input-title'>Project link</div>
          <input
            type='text'
            value={link ? link : ''}
            onChange={linkChange}
            placeholder='Github link of project'
          />
          {!link ? 'Link feild should not be empty' : <></>}
          {link &&
            !isGitHubRepositoryLink(link) &&
            'Not a valid github repository link'}
          <div className='input-title'>Description</div>
          <input
            type='text'
            value={description ? description : ''}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setDescription(event.target.value)
            }
            placeholder='Details about project'
          />
          {!description ? 'Description feild should not be empty' : <></>}
          {description &&
            description.length >= 200 &&
            'Description length should not be greater than 200'}
        </form>
        <button className='add-project-btn' onClick={SubmitHandler}>
          <img src={tick} alt='' /> Done
        </button>
      </div>
    </div>
  );
};

export default AddProject;
