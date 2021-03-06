import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "./index.css";
import App from "./App";
import { LoadingProvider } from "./components/Loading"
import { ThemeSwitcherProvider } from "react-css-theme-switcher";

const themes = {
  dark: `${process.env.PUBLIC_URL}/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/light-theme.css`,
};

const prevTheme = window.localStorage.getItem("theme");

// "http://localhost:8000/subgraphs/name/scaffold-eth/your-contract"
let subgraphUri = process.env.REACT_APP_GRAPHQL;

const client = new ApolloClient({
  uri: subgraphUri,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeSwitcherProvider themeMap={themes} defaultTheme={prevTheme ? prevTheme : "light"}>
      <LoadingProvider >
        <App subgraphUri={subgraphUri} />
      </LoadingProvider>
    </ThemeSwitcherProvider>
  </ApolloProvider>,
  document.getElementById("root"),
);
