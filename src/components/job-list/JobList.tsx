import React, { SetStateAction, Dispatch } from 'react';
import { gql, useQuery } from '@apollo/client';
import { JobItem } from '../job-item/JobItem';
import { JobProps } from '../../types';
import './styles.scss';

const GET_JOBS = gql`
  query GetJobList($level: String, $role: String, $lan: String, $tool: String) {
    jobs(
      where: {
        level: $level
        role: $role
        languages_contains: $lan
        tools_contains: $tool
      }
      sort: "created_at:desc"
    ) {
      title
      location
      level
      role
      languages
      tools
      type
      featured
      id
      created_at
      company {
        name
        logo {
          url
        }
      }
    }
  }
`;

interface JobListData {
  jobs: JobProps[];
}
export interface JobListVariables {
  [key: string]: string | undefined;
}
interface JobListProps {
  variables: JobListVariables;
  setVariables: Dispatch<SetStateAction<JobListVariables>>;
}

export const JobList: React.FC<JobListProps> = ({
  setVariables,
  variables,
}) => {
  // const [variables, setVariables] = React.useState<JobListVariables>({});
  const { loading, error, data } = useQuery<JobListData, JobListVariables>(
    GET_JOBS,
    { variables }
  );

  const renderJobs = () => {
    if (loading) {
      return <div className="lds-hourglass"></div>;
    }
    if (error) {
      return <div>{error.message}</div>;
    }

    return data?.jobs.map((job) => {
      return <JobItem key={job.id} job={job} setVariables={setVariables} />;
    });
  };

  return <div className="jobList">{renderJobs()}</div>;
};
