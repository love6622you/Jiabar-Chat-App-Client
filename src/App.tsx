import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes } from "@/routes";
import { ApolloProvider } from "@apollo/client";
import { client } from "./lib/apollo";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes />
      </Router>
    </ApolloProvider>
  );
}

export default App;
