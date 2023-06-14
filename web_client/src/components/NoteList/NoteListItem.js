import { useNotes } from "../../context/NotesContext";

const NoteListItem = ({ note }) => {
  const { setSelectedNoteID } = useNotes();

  return (
    <div onClick={() => setSelectedNoteID(note.id)} key={note.id}>
      <h2>{note.title}</h2>
    </div>
  );
};

export default NoteListItem;
