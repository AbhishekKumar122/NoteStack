import React, { useContext } from 'react';
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote} = props;

  return (
    <div className="col-md-3">
      <div className="card my-3 shadow-sm border-1 rounded-4" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start">
            <h5 className="card-title fw-bold ">{note.title}</h5>
            <div>
              <i
                className="fa-regular fa-pen-to-square mx-2 text-success"
                style={{ cursor: 'pointer' }}
                onClick={() => updateNote(note)}
                title="Edit Note"
              ></i>
              <i
                className="fa-solid fa-trash-can mx-2 text-danger"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  deleteNote(note._id);
                }}
                title="Delete Note"
              ></i>
            </div>
          </div>
          <p className="card-text mt-2">{note.description}</p>
          <span className="text-black mt-2">#{note.tag}</span>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
