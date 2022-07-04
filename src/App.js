import { Routes, Route, useLocation } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import PageLayout from "./components/PageLayout";
import "./App.css";
import MainPage from "./components/MainPage";
import Project from "./components/Project";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

const client = new ApolloClient({
  uri: "https://nina-portfolio-backend-app-97rbk.ondigitalocean.app/graphql",
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
        <AnimatePresence exitBeforeEnter>
          <Routes key={location.pathname} location={location}>
            <Route
              path='/'
              element={
                <PageLayout
                  siteLanguage={siteLanguage}
                  setSiteLanguage={setSiteLanguage}
                />
              }
            >
              <Route path='/' element={<MainPage />} />
              <Route
                path='/projects/:id'
                element={<Project siteLanguage={siteLanguage} />}
              />
              {/* <Route path='/info/:id' /> */}
            </Route>
          </Routes>
        </AnimatePresence>
      </div>
    </ApolloProvider>
  );
}

export default App;
