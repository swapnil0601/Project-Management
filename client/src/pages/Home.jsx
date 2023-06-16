import React from "react";
import Clients from "../components/Clients";
import Projects from "../components/Projects";

const Home = () => {
  return (
    <div className="px-16">
      <Projects />
      <Clients />
    </div>
  );
};

export default Home;
