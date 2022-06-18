import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Menu from "./components/Menu";
import "./App.css";
import MainPage from "./components/MainPage";
import Project from "./components/Project";
import { useState } from "react";
import { SecondMenu } from "./components/SecondMenu";

const client = new ApolloClient({
  uri: "http://localhost:1337/graphql",
  cache: new InMemoryCache(),
});

function App() {
  const [siteLanguage, setSiteLanguage] = useState("ru");

  return (
    <Router>
      <ApolloProvider client={client}>
        <div className='App'>
          <div className='main-container'>
            <div className='main-menu-container'>
              <Menu
                siteLanguage={siteLanguage}
                setSiteLanguage={setSiteLanguage}
              />
            </div>
            <div className='main-image-container'>
              <Routes>
                <Route exact path='/' element={<MainPage />} />
                <Route
                  path='/projects/:id'
                  element={<Project siteLanguage={siteLanguage} />}
                ></Route>
                <Route path='/info/:id'></Route>
              </Routes>
            </div>
            <div className='main-container-extra-bottom-menu'>
              <SecondMenu setSiteLanguage={setSiteLanguage} />
            </div>
          </div>
        </div>
      </ApolloProvider>
    </Router>
  );
}

export default App;
