import { useState } from 'react';
import { useProjects } from '../services/queries';

const Projects = () => {
  const [page, setPage] = useState(1);

  const { data, isPending, error, isError, isPlaceholderData, isFetching } =
    useProjects(page);

  return (
    <div>
      {isPending ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>{error.message}</div>
      ) : (
        <div>
          {data.map((project) => (
            <p key={project.id}>{project.name}</p>
          ))}
        </div>
      )}
      <span>Current Page: {page + 1}</span>
      <button onClick={() => setPage((prev) => Math.max(prev - 1, 0))}>
        Previous Page
      </button>
      {''}
      <button
        onClick={() => {
          if (!isPlaceholderData) {
            setPage((prev) => prev + 1);
          }
        }}
        disabled={isPlaceholderData}
      >
        Next Page
      </button>
      {isFetching ? <span>Loading...</span> : null}
    </div>
  );
};

export default Projects;
