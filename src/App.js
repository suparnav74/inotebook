import './App.css';
import About from './components/About';
import Home from './components/Home';
import NavBar from './components/NavBar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import NoteState from './context/notes/NoteState';


function App() {
  return (
    <NoteState>
    <div className="App">
        <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/about" element={<About/>}></Route>
        </Routes>
      </BrowserRouter>
      
     <h1>This is iNoteBook</h1>
    </div>
    </NoteState>
  );
}

export default App;
