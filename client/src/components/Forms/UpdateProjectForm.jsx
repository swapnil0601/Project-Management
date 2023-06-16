import { useMutation } from "@apollo/client";
import { useState } from "react";
import { UPDATE_PROJECT } from "../../mutations/projectMutations";
import { GET_PROJECT } from "../../queries/projectQueries";

const UpdateProjectForm = ({ setShowModal, project }) => {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState("");

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { name, description, status, id: project.id },
    refetchQueries: [
      { query: GET_PROJECT, variables: { projectID: project.id } },
    ],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, description, status);
    updateProject(name, description, status);
    setName("");
    setDescription("");
    setStatus("new");
    setShowModal(false);
  };
  return (
    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Update Project
      </h1>
      <form class="space-y-2 md:space-y-4" action="#" onSubmit={handleSubmit}>
        <div class="relative z-0 w-full group">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John Doe"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label
            for="descroption"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <textarea
            row="4"
            type="text"
            value={description}
            name="description"
            id="description"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write Here"
            required=""
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label
            for="status"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select Status
          </label>
          <select
            id="status"
            name="status"
            onChange={(e) => setStatus(e.target.value)}
            value={status}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value={""}>Not Selected</option>
            <option value={"new"}>Not Started</option>
            <option value={"progress"}>In Progress</option>
            <option value={"completed"}>Completed</option>
          </select>
        </div>

        <div className="flex gap-3">
          <button
            // onClick={() => setShowModal(false)}
            type="submit"
            className="mt-3 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Update Project
          </button>
        </div>
      </form>
    </div>
  );
};
export default UpdateProjectForm;
