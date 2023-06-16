import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { ADD_PROJECT } from "../../mutations/projectMutations";
import { GET_PROJECTS } from "../../queries/projectQueries";

import { GET_CLIENT_IDS } from "../../queries/clientQueries";

const AddProjectForm = ({ setShowModal }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("new");
  const [clientId, setClientId] = useState("");

  const { data } = useQuery(GET_CLIENT_IDS);

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, status, clientId },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: projects.concat([addProject]) },
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description || !status || !clientId)
      return alert("Please fill all the fields");
    // console.log(name, description, status, clientID);
    addProject(name, description, status, clientId);
    setName("");
    setDescription("");
    setStatus("new");
    setClientId("");
    setShowModal(false);
  };
  return (
    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Add Project
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
        <div>
          <label
            for="client"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select Client
          </label>
          <select
            id="client"
            name="client"
            placeholder={"Select"}
            onChange={(e) => setClientId(e.target.value)}
            value={clientId}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value={""}>Not Selected</option>
            {data &&
              data.clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
          </select>
        </div>

        <div className="flex gap-3">
          <button
            // onClick={() => setShowModal(false)}
            type="submit"
            className="mt-3 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Add Project
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddProjectForm;
