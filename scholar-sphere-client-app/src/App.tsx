import React from "react";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";
import PaperUploadForm from "./components/PaperUpload/PaperUploadForm";
import ScientificPaper from "./components/ScientificPaper/ScientificPaper";
import Feed from "./components/Feed/Feed";

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="centered-content">
        <Feed />
      </div>
    </div>
  );
}

export default App;
