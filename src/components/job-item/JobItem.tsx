import React, { Dispatch, SetStateAction } from 'react';
import moment from 'moment';
import { JobProps } from '../../types';
import { JobListVariables } from '../job-list/JobList';

interface JobItemProps {
  job: JobProps;
  setVariables: Dispatch<SetStateAction<JobListVariables>>;
}

export function JobItem({ job, setVariables }: JobItemProps) {
  const {
    company,
    featured,
    title,
    type,
    location,
    languages,
    tools,
    created_at,
    role,
    level,
    id,
  } = job;

  const ONE_HOUR = 60 * 60 * 1000;
  const isNew =
    new Date().valueOf() - new Date(created_at).valueOf() < ONE_HOUR;

  return (
    <div className={`job ${featured ? 'featured' : ''}`}>
      <div className="jobinfo">
        <div className="logo">
          <img
            src={`https://api-job-listing.herokuapp.com${company.logo.url}`}
            alt="logo"
          />
        </div>
        <div className="info">
          <h3>{company.name}</h3>
          {isNew && <p className="labels newlabel">New!</p>}
          {featured && <p className="labels featuredlabel">Featured</p>}
          <h2>{title}</h2>
          <ul>
            <li>{moment(created_at).fromNow()}</li>
            <li>{type}</li>
            <li>{location}</li>
          </ul>
        </div>
      </div>
      <div className="jobroles">
        {role && (
          <button
            onClick={() =>
              setVariables((prev) => ({
                ...prev,
                role: prev.role ? undefined : role,
              }))
            }
          >
            {role}
          </button>
        )}
        {level && (
          <button
            onClick={() =>
              setVariables((prev) => ({
                ...prev,
                level: prev.level ? undefined : level,
              }))
            }
          >
            {level}
          </button>
        )}
        {languages &&
          languages.split(',').map((lan, idx) => (
            <button
              key={idx}
              onClick={() =>
                setVariables((prev) => ({
                  ...prev,
                  lan: prev.lan ? undefined : lan,
                }))
              }
            >
              {lan}
            </button>
          ))}
        {tools &&
          tools.split(',').map((tool, idx) => (
            <button
              key={idx}
              onClick={() =>
                setVariables((prev) => ({
                  ...prev,
                  tool: prev.tool ? undefined : tool,
                }))
              }
            >
              {tool}
            </button>
          ))}
      </div>
    </div>
  );
}
