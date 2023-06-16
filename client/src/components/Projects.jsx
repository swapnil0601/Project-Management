import React from "react";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import ProjectCard from "./ProjectCard";
import Modal from "./Common/Modal";
import AddProjectForm from "./Forms/AddProjectForm";

const Projects = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);
  const [showModal, setShowModal] = React.useState(false);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  return (
    <div>
      <div className="flex justify-end items-center pb-5 p-10">
        <button
          onClick={() => setShowModal(true)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Project
        </button>
      </div>
      <div className="container p-10 justify-items-stretch grid-cols-3 grid gap-4 max-lg:grid-cols-2">
        {showModal && (
          <Modal setShowModal={setShowModal}>
            <AddProjectForm setShowModal={setShowModal} />
          </Modal>
        )}

        {!loading &&
          !error &&
          data.projects.map((project) => <ProjectCard project={project} />)}
      </div>
    </div>
  );
};

export default Projects;
