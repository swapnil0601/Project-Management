import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Navbar from "./components/Navbar";
import Project from "./components/Project";

const server = process.env.REACT_APP_API || "http://localhost:5000/";
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: `${server}/graphql`,
  cache,
});
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:projectID" element={<Project />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
