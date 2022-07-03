import { Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import PageLayout from "./components/PageLayout";
import "./App.css";
import MainPage from "./components/MainPage";
import Project from "./components/Project";
import { useState } from "react";

const client = new ApolloClient({
  uri: "https://nina-portfolio-backend-app-97rbk.ondigitalocean.app/graphql",
  cache: new InMemoryCache(),
});

///http://localhost:1337
///Separate later

function App() {
  const [siteLanguage, setSiteLanguage] = useState("ru");

  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <Routes>
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
      </div>
    </ApolloProvider>
  );
}

export default App;
