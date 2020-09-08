import React from 'react';
import { Header } from './header/Header';
import { JobList, JobListVariables } from './job-list/JobList';

import icon from '../assets/icon-remove.svg';

function isEmpty(obj: JobListVariables) {
  return (
    Object.keys(obj).length === 0 ||
    Object.values(obj).every((val) => val === undefined)
  );
}

export function App() {
  const [variables, setVariables] = React.useState<JobListVariables>({});

  const renderTags = () => {
    return Object.keys(variables).map((key, idx) => {
      if (variables[key] !== undefined) {
        return (
          <div className="tag" key={idx}>
            <p>{variables[key]}</p>
            <button onClick={() => removeTag(key)}>
              <img src={icon} />
            </button>
          </div>
        );
      }
    });
  };

  const removeTag = (key: string) => {
    console.log(key);
    setVariables((prev) => ({
      ...prev,
      [key]: undefined,
    }));
  };

  return (
    <React.Fragment>
      <Header />

      <div className="container">
        <div className={`filter ${isEmpty(variables) ? 'hidden' : ''}`}>
          <div className="tags">{renderTags()}</div>
          <div className="clear" onClick={() => setVariables({})}>
            <a href="#">Clear</a>
          </div>
        </div>
        <JobList setVariables={setVariables} variables={variables} />
      </div>
      <div className="attribution">
        Challenge by{' '}
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
          Frontend Mentor
        </a>
        . Coded by <a href="https://github.com/mibragimov">@mibragimov</a>.
      </div>
    </React.Fragment>
  );
}
