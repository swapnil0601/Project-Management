import React, { useState } from "react";
import { GET_CLIENTS } from "../queries/clinetQueries";
import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "../mutations/clientMutations";
import Client from "./Client";
import { useQuery } from "@apollo/client";
import Modal from "./Common/Modal";

const AddClientForm = ({ setShowModal }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: clients.concat([addClient]) },
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !phone) return alert("Please fill all the fields");
    addClient();
    setName("");
    setEmail("");
    setPhone("");
    setShowModal(false);
  };

  return (
    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Add Client
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
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John Doe"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            name="description"
            id="description"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="abc@gmail.com"
            required=""
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label
            for="phone"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="9999-9999-99"
            required=""
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="flex gap-3">
          <button
            // onClick={() => setShowModal(false)}
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Add Client
          </button>
        </div>
      </form>
    </div>
  );
};

const Clients = () => {
  const { data, loading, error } = useQuery(GET_CLIENTS);
  const [showModal, setShowModal] = React.useState(false);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  // console.log(data);

  return (
    <div className="">
      {showModal && (
        <Modal setShowModal={setShowModal}>
          <AddClientForm setShowModal={setShowModal} />
        </Modal>
      )}
      <div className="flex justify-start items-center p-10">
        <button
          onClick={() => setShowModal(true)}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Client
        </button>
      </div>
      {!loading && !error && (
        <div className="flex p-10 justify-center items-center">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Email
                </th>
                <th scope="col" class="px-6 py-3">
                  Phone
                </th>
                <th scope="col" class="px-6 py-3">
                  Remove
                </th>
              </tr>
            </thead>
            <tbody>
              {data.clients.map((client) => (
                <Client key={client.id} client={client} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Clients;
