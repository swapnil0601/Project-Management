import React from "react";
import { GET_CLIENTS } from "../queries/clientQueries";
import Client from "./Client";
import { useQuery } from "@apollo/client";
import Modal from "./Common/Modal";
import AddClientForm from "./Forms/AddClientForm";

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
      <div className="flex justify-end items-center p-5 pr-10">
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded "
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
