import { useState, useEffect } from "react";

import axios from "axios";

import { apiUrls } from "../urls";

const useNotes = () => {
  const [notes, setNotes] = useState(null);
  const [selectedNoteID, setSelectedNoteID] = useState(null);
  const selectedNote =
    notes && selectedNoteID
      ? notes.find((note) => note.id === selectedNoteID)
      : null;

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = () => {
    axios
      .get(apiUrls.note())
      .then((res) => setNotes(res.data))
      .catch((err) => console.error(err));
  };

  const createNote = (noteData) => {
    return new Promise((resolve, reject) => {
      axios
        .post(apiUrls.note(), noteData)
        .then((res) => {
          setNotes((prevNotes) => [...prevNotes, res.data]);
          resolve(res.data);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  };

  const updateNote = (noteData) => {
    console.log("updateNote, noteData", noteData);
    console.log("selectedNoteID", selectedNoteID);
    return new Promise((resolve, reject) => {
      axios
        .patch(apiUrls.note(noteData.id), noteData)
        .then((res) => {
          console.log("res.data", res.data);
          setNotes((prevNotes) => {
            const updatedNotes = prevNotes.map((note) =>
              note.id === selectedNoteID ? res.data : note
            );
            console.log("updatedNotes", updatedNotes);
            return updatedNotes;
          });
          resolve(res.data);
        })
        .catch((err) => reject(err));
    });
  };

  const deleteNote = (id) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(apiUrls.note(id))
        .then((res) => {
          setNotes(notes.filter((note) => note.id !== id));
          resolve(res.data);
        })
        .catch((err) => reject(err));
    });
  };

  return {
    notes,
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
    selectedNoteID,
    selectedNote,
    setSelectedNoteID,
  };
};

export default useNotes;
