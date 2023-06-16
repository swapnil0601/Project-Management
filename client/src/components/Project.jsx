import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECT, GET_PROJECTS } from "../queries/projectQueries";
import { DELETE_PROJECT } from "../mutations/projectMutations";
import { FaEdit, FaTrash } from "react-icons/fa";
import Modal from "./Common/Modal";
import UpdateProjectForm from "./Forms/UpdateProjectForm";
import Badge from "./Common/Badge";
const Project = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { projectID } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { projectID },
  });

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectID },
    onCompleted: () => {
      navigate("/");
    },
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const handleDelete = (e) => {
    deleteProject();
  };

  return (
    <div className="container flex justify-center items-center p-10">
      {showModal && (
        <Modal setShowModal={setShowModal}>
          <UpdateProjectForm
            project={data.project}
            setShowModal={setShowModal}
          />
        </Modal>
      )}
      {!loading && !error && (
        <div className="max-w-2xl  min-w-lg w-3/4 bg-white border border-gray-200 rounded shadow  dark:bg-gray-800 dark:border-gray-700  p-6">
          <div className="flex justify-between gap-5 items-center">
            <h1 className="text-2xl font-bold tracking-tight text-gray-50">
              {data.project.name}
            </h1>
            <button
              onClick={() => setShowModal(true)}
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold p-2 rounded"
            >
              <FaEdit />
            </button>
          </div>
          <div className="flex justify-between gap-5 flex-col">
            <h3 className="text-xl tracking-tight text-neutral-100">
              {data.project.client.name}
            </h3>
            <Badge className="w-24 text-center" status={data.project.status} />
            <p className="text-lg font-normal tracking-tight text-gray-100">
              {data.project.description}
            </p>
          </div>
          <div className="flex mt-4 justify-end gap-5">
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold p-2 rounded">
              <FaTrash onClick={handleDelete} />
            </button>
            <Link
              to="/"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold p-2 px-6 rounded"
            >
              Back
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Project;
