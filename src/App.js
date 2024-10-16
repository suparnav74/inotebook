import "./App.css";
import About from "./components/About";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";

function App() {
  return (
    <NoteState>
      <div className="App">
       
          <BrowserRouter>
            <NavBar />
            <Alert msg ="This is a amazing react course"/>
            <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/about" element={<About />}></Route>
            </Routes>
            </div>
          </BrowserRouter>
        
      </div>
    </NoteState>
  );
}

export default App;
