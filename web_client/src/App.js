import React from "react";
import NoteList from "./components/NoteList/NoteList";
import Note from "./components/Note";
import { useNotes } from "./context/NotesContext";

import "./css/App.css";
import "./css/chat_component.css";
import "./css/form_component.css";

function App() {
  const { notes, selectedNote } = useNotes();

  return (
    <div className="app-container">
      <div className="side-bar">
        <NoteList notes={notes} />
      </div>
      <div className="main-content-container">
        {selectedNote ? <Note note={selectedNote} /> : <div>Select a note</div>}
      </div>
    </div>
  );
}

export default App;
