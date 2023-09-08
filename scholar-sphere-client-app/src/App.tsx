import React from "react";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";
import PaperUploadForm from "./components/PaperUpload/PaperUploadForm";
function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="centered-content">
        <PaperUploadForm />
      </div>
    </div>
  );
}

export default App;
