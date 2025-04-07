import React, { useContext, useState } from 'react';
import noteContext from "../context/notes/noteContext";

const Addnote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const { showAlert } = props;

  const [note, setNote] = useState({ title: "", description: "", tag: "General" });

  const handleOnClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    showAlert("Note saved successfully!", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-4 p-4 rounded shadow-sm bg-light">
      <h3 className="mb-4 text-blue fw-bold">📝 Create a New Note</h3>
      <form onSubmit={handleOnClick}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label fw-semibold">
            Title
          </label>
          <input
            type="text"
            className="form-control form-control-lg"
            id="title"
            name="title"
            placeholder="Enter note title"
            value={note.title}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label fw-semibold">
            Description
          </label>
          <textarea
            className="form-control form-control-lg"
            id="description"
            name="description"
            rows="3"
            placeholder="Write your note here..."
            value={note.description}
            onChange={onChange}
            minLength={5}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="tag" className="form-label fw-semibold">
            Tag
          </label>
          <input
            type="text"
            className="form-control form-control-lg"
            id="tag"
            name="tag"
            placeholder="e.g. Personal, Work, Ideas"
            value={note.tag}
            onChange={onChange}
            minLength={3}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-success btn-lg w-100"
          disabled={note.title.length < 5 || note.description.length < 5}
        >
          ➕ Add Note
        </button>
      </form>
    </div>
  );
};

export default Addnote;
