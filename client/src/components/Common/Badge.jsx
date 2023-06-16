import React from "react";

const Badge = ({ status, className }) => {
  if (status === "In Progress") {
    return (
      <span
        class={`${className} bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-2 rounded dark:bg-yellow-900 dark:text-yellow-300`}
      >
        {status}
      </span>
    );
  } else if (status === "Completed") {
    return (
      <span
        class={`${className} bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-2 rounded dark:bg-green-900 dark:text-green-300`}
      >
        {status}
      </span>
    );
  } else {
    return (
      <span
        class={`${className}bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-2 rounded dark:bg-red-900 dark:text-red-300`}
      >
        {status}
      </span>
    );
  }
};

export default Badge;
