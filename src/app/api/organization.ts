import axios from 'axios';
import { BACKEND_URL } from 'envConstants';

export interface organizationBody {
  name: string;
  description: string;
}

export const deleteOrg = async (
  authorizationToken: string,
  orgName: string
) => {
  const url = BACKEND_URL + '/api/protected/org/delete/' + orgName;
  const respnse = await axios.delete(url, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authorizationToken}`,
    },
  });
  return respnse;
};

export const addOrg = async (
  authorizationToken: string,
  org: organizationBody
) => {
  const url = BACKEND_URL + '/api/protected/org/add';
  const respnse = await axios.post(url, org, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authorizationToken}`,
    },
  });
  return respnse;
};

export const updateOrg = async (
  authorizationToken: string,
  orgName: string,
  org: organizationBody
) => {
  const url = BACKEND_URL + '/api/protected/org/update/' + orgName;
  const response = await axios.put(url, org, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authorizationToken}`,
    },
  });

  return response;
};

export const addOrgMembers = async (
  authorizationToken: string,
  orgName: string,
  members: string[]
) => {
  const url = BACKEND_URL + '/api/protected/org/addMembers/' + orgName;
  const respnse = await axios.post(
    url,
    {
      members: members,
    },
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${authorizationToken}`,
      },
    }
  );

  return respnse;
};

export const removeOrgMembers = async (
  authorizationToken: string,
  orgName: string,
  members: string[]
) => {
  const url = BACKEND_URL + '/api/protected/org/removeMembers/' + orgName;
  const response = axios.delete(url, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authorizationToken}`,
    },
    data: {
      members: members,
    },
  });
  return response;
};

export const changeOrgMembersStatus = async (
  authorizationToken: string,
  orgName: string,
  orgMemberStatus: { [key: string]: string }
) => {
  const url = BACKEND_URL + '/api/protected/org/removeMembers/';
  const respnse = await axios.put(
    url,
    {
      orgMemberStatus: orgMemberStatus,
    },
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${authorizationToken}`,
      },
    }
  );

  return respnse;
};

export const setArcheiveStatus = async (
  authorizationToken: string,
  orgName: string,
  archeiveStatus: { [key: string]: boolean }
) => {
  const url = BACKEND_URL + '/api/protected/org/setArcheiveStatus/' + orgName;
  const respnse = await axios.put(
    url,
    {
      archeiveStatus: archeiveStatus,
    },
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${authorizationToken}`,
      },
    }
  );
  return respnse;
};

export const setBookmarkStatus = async (
  authorizationToken: string,
  orgName: string,
  bookmarkStatus: { [key: string]: boolean }
) => {
  const url = BACKEND_URL + '/api/protected/org/setBookmarkStatus/' + orgName;
  const respnse = await axios.put(
    url,
    {
      bookmarkStatus: bookmarkStatus,
    },
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${authorizationToken}`,
      },
    }
  );

  return respnse;
};

export const getOrgMembers = async (
  authorizationToken: string,
  orgName: string
) => {
  const url = BACKEND_URL + '/api/protected/org/getMembers/' + orgName;

  const respnse = await axios.get(url, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authorizationToken}`,
    },
  });
  return respnse;
};

export const getOrgProjects = async (
  authorizationToken: string,
  orgName: string
) => {
  const url = BACKEND_URL + '/api/protected/org/getProjects/' + orgName;
  const respnse = await axios.get(url, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authorizationToken}`,
    },
  });
  return respnse;
};

export const getOrg = async (authorizationToken: string, orgName: string) => {
  const url = BACKEND_URL + '/api/protected/org/getProjects/' + orgName;
  const respnse = await axios.get(url, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authorizationToken}`,
    },
  });
  return respnse;
};

export const getAllOrgs = async (authorizationToken: string) => {
  const url = BACKEND_URL + '/api/protected/org/getAllOrg';
  const respnse = await axios.get(url, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authorizationToken}`,
    },
  });
  return respnse;
};