import "./App.css";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from './components/Profile';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const showAlert = (message, type) => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    switch (type) {
      case 'success':
        toast.success(message);
        break;
      case 'error':
        toast.error(message);
        break;
      case 'info':
        toast.info(message);
        break;
      case 'warn':
        toast.warn(message);
        break;
      default:
        toast(message);
    }
  };

  return (
    <>
      <NoteState showAlert={showAlert}>
        <Router>
        <Navbar showAlert={showAlert} />
          <div className="container">
            <Routes>
              <Route path="/home" element={<Home showAlert={showAlert} />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login showAlert={showAlert} />} />
              <Route path="/signup" element={<Signup showAlert={showAlert} />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
          <ToastContainer position="top-center" theme="light" autoClose={2000} />
        </Router>
      </NoteState>
    </>
  );
}

export default App;
