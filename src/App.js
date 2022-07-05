import { Routes, Route, useLocation } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Menu from "./components/Menu";
import "./App.css";
import MainPage from "./components/MainPage";
import Project from "./components/Project";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { BottomdMenu } from "./components/BottomdMenu";

const client = new ApolloClient({
  uri: "https://nina-photo-portfolio-backend-5dzlu.ondigitalocean.app/graphql",
  cache: new InMemoryCache(),
});

///http://localhost:1337
///Separate later

function App() {
  const [siteLanguage, setSiteLanguage] = useState("ru");
  const location = useLocation();

  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <Menu siteLanguage={siteLanguage} setSiteLanguage={setSiteLanguage} />
        <AnimatePresence exitBeforeEnter>
          <Routes key={location.pathname} location={location}>
            <Route path='/' element={<MainPage />} />
            <Route
              path='/projects/:id'
              element={<Project siteLanguage={siteLanguage} />}
            />
          </Routes>
        </AnimatePresence>
        <div className='app__bottom-menu_small-screens'>
          <BottomdMenu setSiteLanguage={setSiteLanguage} />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
