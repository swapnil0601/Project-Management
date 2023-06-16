import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import ProjectCard from "./ProjectCard";
const Project = () => {
  const { projectID } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { projectID },
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  console.log(data);

  return (
    <div>{!loading && !error && <ProjectCard project={data.project} />}</div>
  );
};

export default Project;
