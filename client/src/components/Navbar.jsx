import React from "react";
import { FaList } from "react-icons/fa";

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          class="self-center flex gap-2 items-center text-2xl font-semibold whitespace-nowrap dark:text-white"
        >
          <span>
            <FaList style={{ color: "orange", fontSize: "1rem" }} />
          </span>
          Project Management
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
