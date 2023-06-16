import React from "react";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  return (
    <div className="container p-10 justify-items-stretch grid-cols-3 grid gap-4 max-lg:grid-cols-2">
      {!loading &&
        !error &&
        data.projects.map((project) => <ProjectCard project={project} />)}
    </div>
  );
};

export default Projects;
