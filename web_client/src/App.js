import React from "react";
import NoteList from "./components/NoteList/NoteList";
import Note from "./components/Note";
import { useNotes } from "./context/NotesContext";

import "./css/App.css";
import "./css/chat_component.css";
import "./css/form_component.css";

function App() {
  const { notes, selectedNote } = useNotes();

  // const [notes, setNotes] = useState(null);
  // const [title, setTitle] = useState("");
  // const [content, setContent] = useState("");
  // const [tags, setTags] = useState([]);

  // useEffect(() => {
  //   // TODO: Replace with your API endpoint
  //   axios
  //     .get(apiUrls.note())
  //     .then((res) => setNotes(res.data))
  //     .catch((err) => console.error(err));
  // }, []);

  // const handleCreateNote = () => {
  //   axios
  //     .post(apiUrls.note(), {
  //       title,
  //       content,
  //       tags: tags.map((tag) => tag.id),
  //       owner: 1,
  //     })
  //     .then((res) => {
  //       setNotes([...notes, res.data]);
  //       setTitle("");
  //       setContent("");
  //       setTags([]);
  //     })
  //     .catch((err) => console.error(err));
  // };

  // const handleDeleteNote = (id) => {
  //   // TODO: Replace with your API endpoint
  //   axios
  //     .delete(apiUrls.note(id))
  //     .then((res) => setNotes(notes.filter((note) => note.id !== id)))
  //     .catch((err) => console.error(err));
  // };

  // const handleUpdateNote = (note) => {
  //   // TODO: Replace with your API endpoint
  //   axios
  //     .patch("apiUrls.note(selectNote.id)", {
  //       title,
  //       content,
  //       tags,
  //     })
  //     .then((res) => {
  //       setNotes(
  //         notes.map((note) => (note.id === selectedNoteID.id ? res.data : note))
  //       );
  //       setSelectedNoteID(null);
  //       setTitle("");
  //       setContent("");
  //       setTags([]);
  //     })
  //     .catch((err) => console.error(err));
  // };

  // const handleSelectNote = (note) => {
  //   setSelectedNoteID(note);
  //   setTitle(note.title);
  //   setContent(note.content);
  //   setTags(note.tags);
  // };

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
