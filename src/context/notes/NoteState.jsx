import { useState } from "react";
import NoteContext from "./noteContext";
import Swal from "sweetalert2";
const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial =[]
  const [notes, setNotes] = useState(notesInitial);

  
  // GET ALL NOTES
  const getAllNotes = async() => {
    // API CALL
   const response = await fetch(`${host}/api/notes/fetchallnotes/`, {
   method: "GET",
   headers: {
     "Content-Type": "application/json",
     "auth-token":
     localStorage.getItem('token')
   }
  
 });
    const  json = await response.json();
      setNotes(json);
};



  // ADD A NOTE
      const addNote = async(title, description, tag) => {
          // API CALL
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token":
            localStorage.getItem('token')
          },

          body: JSON.stringify({title,description,tag}),
        });


        const note = await response.json();
        setNotes(notes.concat(note));
      };


  // DELETE A NOTE 
        const deleteNote = async(id) => {
          Swal.fire({
            title: 'Delete this note?',
            text: 'This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it',
            cancelButtonText: 'Cancel'
          }).then(async (result) => {
            if (result.isConfirmed) {
        // API CALL 
          const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "auth-token":
                localStorage.getItem('token')
            }
          });
          const newNote = notes.filter((note) => {
            return note._id !== id;
          });
          setNotes(newNote); 
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
          
          props.showAlert("Successfully deleted the note.", "success");
        };
      })
    }

  // Edit a Note
        const editNote = async (id, title, description, tag) => {
          // API CALL
          const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "auth-token":
                localStorage.getItem('token')
            },

            body: JSON.stringify({title,description,tag}),
          });
          const json = await response.json();
          console.log(json)
          
          let newNotes = JSON.parse(JSON.stringify(notes));
          // Logic to edit in client side
          for (let i = 0; i < newNotes.length; i++) {
            const element = newNotes[i];
            if (element._id === id) {
              newNotes[i].title = title;
              newNotes[i].description = description;
              newNotes[i].tag = tag;
              break;
            }
          }
          setNotes(newNotes);
        };
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getAllNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
