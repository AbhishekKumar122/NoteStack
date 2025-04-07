import React,{ useContext } from "react"
import noteContext from "../context/notes/noteContext";
const About = () => {
  const a = useContext(noteContext);
  return (
    <div className="container mt-3 mb-2">
      <div className="card shadow-sm p-4 rounded-4">
        <h2 className=" mb-3">About NoteStack</h2>
        <p className="text-secondary">
          <strong>NoteStack</strong> is a simple and secure cloud-based note-taking app built with <strong>MERN Stack (MongoDB, Express, React, Node.js)</strong>. 
          It allows you to easily create, edit, delete, and organize your personal notes from anywhere, anytime.
        </p>

        <h4 className="mt-4 text-success">🔒 Your Notes, Your Privacy</h4>
        <p className="text-secondary">
          We respect your privacy. Your notes are private and only accessible to you. All actions require authentication with a unique token.
        </p>

        <h4 className="mt-4 text-warning">🚀 Features</h4>
        <ul className="text-secondary">
          <li>✅ Add, edit, and delete notes instantly</li>
          <li>✅ Organize notes with tags</li>
          <li>✅ Responsive and clean UI</li>
          <li>✅ Protected routes and user authentication</li>
        </ul>

        <h4 className="mt-4 text-info">👨‍💻 About the Developer</h4>
        <p className="text-secondary">
          Hi! I’m <strong>Abhishek Kumar</strong>, an aspiring full-stack developer. NoteStack is one of my full-stack projects showcasing the power of React with backend integration. 
          I'm constantly learning and improving. Feel free to connect or provide feedback!
        </p>
      </div>
    </div>
  );
}

export default About