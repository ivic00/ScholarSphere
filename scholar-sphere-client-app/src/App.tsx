import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";
import PaperUploadForm from "./components/PaperUpload/PaperUploadForm";
import ScientificPaper from "./components/ScientificPaper/ScientificPaper";
import Feed from "./components/Feed/Feed";
import BottomNav from "./components/BottomNav/BottomNav";
import SignIn from "./components/LogInForm/SignIn";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import { IJwt } from "./interfaces/IJWT";
import axiosInstance from "./services/axiosInstance";
import Home from "./components/Home/Home";
import ForReview from "./components/ForReview/ForReview";
import UserPapersView from "./components/MyPapersView/MyPapersView";
import MyPapersView from "./components/MyPapersView/MyPapersView";
import PendingPapersView from "./components/PendingPapersView/PendingPapersView";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, []);

  return (
    <div className="App">
      <NavBar />
      <div className="centered-content">
        <div className="container">
          <BrowserRouter>
            <Routes>
              <Route path="/SignIn" element={<SignIn setAuthenticated={setAuthenticated} />} />
              <Route path="/Feed" Component={Feed} />
              <Route path="/" Component={Home} />
              <Route path="/Register" Component={RegisterForm} />
              <Route path="/PaperUpload" Component={PaperUploadForm} />
              <Route path="/ForReview" Component={ForReview}/>
              <Route path="/MyPapers" Component={MyPapersView}/>
              <Route path = "/PendingPapersView" Component={PendingPapersView} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default App;
