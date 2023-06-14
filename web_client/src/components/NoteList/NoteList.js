import React, { useState } from "react";

import NoteListItem from "./NoteListItem";

const NoteList = ({
  notes,
  onCreateNote,
  onDeleteNote,
  onSelectNote,
  onUpdateNote,
}) => {
  const [selectedNoteID, setSelectedNoteID] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);

  return (
    <div className="note-list-container">
      {Array.isArray(notes) ? (
        notes.map((note) => <NoteListItem key={note.id} note={note} />)
      ) : (
        <p>Loading notes ...</p>
      )}
      {
        // Move these buttons somewhere else, to the note detail page?
      }
      {/* <div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
        />
        <button onClick={selectedNoteID ? updateNote : createNote}>
          {selectedNoteID ? "Update" : "Create"}
        </button>
      </div> */}
    </div>
  );
};

export default NoteList;
